import { useState, useRef, useCallback, useEffect, RefObject } from 'react';
import { initHydra, clearHydra } from '@strudel/hydra';
import { toast } from 'sonner';
import { HydraTemplate } from '../HydraEditor';
import { EditorHandle } from '../Editor';

export function useHydra(
    editorRef: RefObject<EditorHandle | null>,
    editorAreaRef: RefObject<HTMLDivElement | null>,
) {
    const [hydraOpen, setHydraOpen] = useState(false);
    const [hydraWidth, setHydraWidth] = useState(340);
    const [hydraRunning, setHydraRunning] = useState(false);
    const [hydraTemplates, setHydraTemplates] = useState<HydraTemplate[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('strdl-hydra-templates') ?? '[]');
        } catch {
            return [];
        }
    });
    const hydraInitialized = useRef(false);
    const isResizingHydra = useRef(false);
    const hydraRafRef = useRef<number | null>(null);
    const hydraOffscreen = useRef<HTMLCanvasElement | null>(null);

    const savedOpacity = parseFloat(localStorage.getItem('strdl-hydra-opacity') ?? '0.75');
    const [hydraOpacity, setHydraOpacityState] = useState(savedOpacity);
    const hydraOpacityRef = useRef(savedOpacity);
    const [detectAudio, setDetectAudioState] = useState(false);
    const detectAudioRef = useRef(false);

    const startHydraSync = useCallback(() => {
        if (!hydraOffscreen.current) {
            hydraOffscreen.current = document.createElement('canvas');
            hydraOffscreen.current.width = 16;
            hydraOffscreen.current.height = 4;
        }
        const offCtx = hydraOffscreen.current.getContext('2d');
        if (!(window as any).a) {
            (window as any).a = {
                fft: [0, 0, 0, 0],
                vol: 0,
                setSmooth: () => {},
                setCutoff: () => {},
                setScale: () => {},
                setBins: () => {},
            };
        }
        const loop = () => {
            (window as any).speed = editorRef.current?.getCps() ?? 0.5;
            const src = document.getElementById('test-canvas') as HTMLCanvasElement | null;
            if (src && offCtx && src.width > 0) {
                try {
                    offCtx.drawImage(src, 0, 0, 16, 4);
                    const px = offCtx.getImageData(0, 0, 16, 4).data;
                    const fft: number[] = [];
                    for (let b = 0; b < 4; b++) {
                        let max = 0;
                        for (let col = b * 4; col < (b + 1) * 4; col++) {
                            for (let row = 0; row < 4; row++) {
                                const i = (row * 16 + col) * 4;
                                const v = (px[i] + px[i + 1] + px[i + 2]) / 765;
                                if (v > max) max = v;
                            }
                        }
                        fft.push(max);
                    }
                    const a = (window as any).a;
                    a.fft = fft;
                    a.vol = fft.reduce((s: number, v: number) => s + v, 0) / 4;
                } catch {}
            }
            hydraRafRef.current = requestAnimationFrame(loop);
        };
        hydraRafRef.current = requestAnimationFrame(loop);
    }, [editorRef]);

    const stopHydraSync = useCallback(() => {
        if (hydraRafRef.current !== null) {
            cancelAnimationFrame(hydraRafRef.current);
            hydraRafRef.current = null;
        }
    }, []);

    const setHydraOpacity = useCallback((val: number) => {
        hydraOpacityRef.current = val;
        setHydraOpacityState(val);
        localStorage.setItem('strdl-hydra-opacity', String(val));
        const canvas = document.getElementById('hydra-canvas') as HTMLCanvasElement | null;
        if (canvas) canvas.style.opacity = String(val);
    }, []);

    const toggleDetectAudio = useCallback(() => {
        const newVal = !detectAudioRef.current;
        detectAudioRef.current = newVal;
        setDetectAudioState(newVal);
        if (hydraInitialized.current) {
            stopHydraSync();
            clearHydra();
            hydraInitialized.current = false;
            setHydraRunning(false);
        }
    }, [stopHydraSync]);

    const runHydra = useCallback(
        async (code: string) => {
            if (!hydraInitialized.current) {
                try {
                    await initHydra({ feedStrudel: true, detectAudio: detectAudioRef.current });
                    const canvas = document.getElementById(
                        'hydra-canvas',
                    ) as HTMLCanvasElement | null;
                    if (canvas && editorAreaRef.current) {
                        editorAreaRef.current.appendChild(canvas);
                        canvas.style.cssText = `position:absolute;inset:0;z-index:2;pointer-events:none;width:100%;height:100%;mix-blend-mode:screen;opacity:${hydraOpacityRef.current}`;
                    }
                    hydraInitialized.current = true;
                    setHydraRunning(true);
                    if (!detectAudioRef.current) {
                        startHydraSync();
                    }
                } catch (err) {
                    toast.error('Impossible de charger Hydra (connexion requise)');
                    console.error('[hydra init]', err);
                    return;
                }
            }
            try {
                // eslint-disable-next-line no-new-func
                new Function(code)();
            } catch (err) {
                toast.error('Erreur Hydra : ' + (err as Error).message);
            }
        },
        [editorAreaRef, startHydraSync],
    );

    const stopHydra = useCallback(() => {
        stopHydraSync();
        clearHydra();
        const tc = document.getElementById('test-canvas') as HTMLCanvasElement | null;
        if (tc) tc.style.removeProperty('display');
        hydraInitialized.current = false;
        setHydraRunning(false);
    }, [stopHydraSync]);

    const closeHydraPanel = useCallback(() => {
        stopHydra();
        setHydraOpen(false);
    }, [stopHydra]);

    const handleHydraResizeStart = useCallback(
        (e: React.MouseEvent) => {
            isResizingHydra.current = true;
            const startX = e.clientX;
            const startWidth = hydraWidth;
            const onMouseMove = (ev: MouseEvent) => {
                if (!isResizingHydra.current) return;
                setHydraWidth(Math.max(200, Math.min(700, startWidth - (ev.clientX - startX))));
            };
            const onMouseUp = () => {
                isResizingHydra.current = false;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        },
        [hydraWidth],
    );

    const saveHydraTemplate = useCallback(
        (name: string, code: string) => {
            const t: HydraTemplate = { id: Date.now().toString(), name, code };
            const next = [...hydraTemplates, t];
            setHydraTemplates(next);
            localStorage.setItem('strdl-hydra-templates', JSON.stringify(next));
            toast.success('Template Hydra sauvegardé !');
        },
        [hydraTemplates],
    );

    const deleteHydraTemplate = useCallback(
        (id: string) => {
            const next = hydraTemplates.filter((t) => t.id !== id);
            setHydraTemplates(next);
            localStorage.setItem('strdl-hydra-templates', JSON.stringify(next));
        },
        [hydraTemplates],
    );

    useEffect(() => {
        return () => {
            stopHydraSync();
            if (hydraInitialized.current) clearHydra();
        };
    }, [stopHydraSync]);

    return {
        hydraOpen,
        setHydraOpen,
        hydraWidth,
        hydraRunning,
        hydraTemplates,
        hydraOpacity,
        setHydraOpacity,
        detectAudio,
        toggleDetectAudio,
        runHydra,
        stopHydra,
        closeHydraPanel,
        handleHydraResizeStart,
        saveHydraTemplate,
        deleteHydraTemplate,
        stopHydraSync,
    };
}
