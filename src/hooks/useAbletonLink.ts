import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import { invoke } from '@tauri-apps/api/core';
import type { EditorHandle } from '../Editor';

type LinkInfo = {
    enabled: boolean;
    bpm: number;
    peers: number;
};

export function useAbletonLink(editorRef: RefObject<EditorHandle | null>) {
    const [state, setState] = useState<LinkInfo>({ enabled: false, bpm: 120, peers: 0 });
    const lastBpmRef = useRef<number>(120);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopPolling = () => {
        if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }
    };

    const startPolling = useCallback(() => {
        stopPolling();
        pollRef.current = setInterval(async () => {
            try {
                const s = await invoke<LinkInfo>('link_get_state');
                setState(s);
                // Sync Link BPM → Strudel when it drifts by more than 0.5 BPM
                if (s.enabled && Math.abs(s.bpm - lastBpmRef.current) > 0.5) {
                    lastBpmRef.current = s.bpm;
                    const cps = s.bpm / 240;
                    editorRef.current?.evalRaw(`setcps(${cps.toFixed(5)})`);
                }
            } catch (e) {
                console.warn('[Link] poll error:', e);
            }
        }, 100);
    }, [editorRef]);

    const enable = useCallback(
        async (initialBpm: number) => {
            try {
                await invoke('link_enable', { bpm: initialBpm });
                lastBpmRef.current = initialBpm;
                startPolling();
            } catch (e) {
                console.error('[Link] enable error:', e);
            }
        },
        [startPolling],
    );

    const disable = useCallback(async () => {
        try {
            await invoke('link_disable');
            stopPolling();
            setState((s) => ({ ...s, enabled: false, peers: 0 }));
        } catch (e) {
            console.error('[Link] disable error:', e);
        }
    }, []);

    const setBpm = useCallback(async (bpm: number) => {
        try {
            await invoke('link_set_bpm', { bpm });
            lastBpmRef.current = bpm;
        } catch (e) {
            console.error('[Link] setBpm error:', e);
        }
    }, []);

    useEffect(() => () => stopPolling(), []);

    return { ...state, enable, disable, setBpm };
}
