import { useState, useRef, useCallback, RefObject } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke, convertFileSrc } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { EditorHandle } from '../Editor';

export function useSamples(editorRef: RefObject<EditorHandle | null>) {
    const [loadedSamples, setLoadedSamples] = useState<Record<string, string[]>>({});
    const [sampleSearch, setSampleSearch] = useState('');
    const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set());
    const [playingPreview, setPlayingPreview] = useState<string | null>(null);
    const previewAudio = useRef<HTMLAudioElement | null>(null);

    const handleLoadSamples = useCallback(async () => {
        const selected = await open({ directory: true });
        if (selected) {
            const path = Array.isArray(selected) ? selected[0] : selected;
            const files: string[] = await invoke('scan_samples', { path });
            const samplesObj: Record<string, string[]> = {};
            for (const file of files) {
                const parts = file.replace(path + '/', '').split('/');
                const name = parts.length > 1
                    ? parts[0].replace(/-/g, '_')
                    : parts[0].replace(/\.[^.]+$/, '').replace(/-/g, '_');
                if (!samplesObj[name]) samplesObj[name] = [];
                samplesObj[name].push(convertFileSrc(file));
            }
            (window as any).__strudelSamples = samplesObj;
            await editorRef.current?.evalRaw('await samples(window.__strudelSamples)');
            setLoadedSamples((prev) => ({ ...prev, ...samplesObj }));
            toast.success(`${files.length} samples loaded successfully!`);
        }
    }, [editorRef]);

    const playPreview = useCallback((filePath: string) => {
        if (playingPreview === filePath) {
            previewAudio.current?.pause();
            previewAudio.current = null;
            setPlayingPreview(null);
            return;
        }
        previewAudio.current?.pause();
        const audio = new Audio(filePath);
        audio.volume = 0.8;
        audio.play().catch(() => {});
        audio.onended = () => setPlayingPreview(null);
        previewAudio.current = audio;
        setPlayingPreview(filePath);
    }, [playingPreview]);

    return { loadedSamples, sampleSearch, setSampleSearch, collapsedFolders, setCollapsedFolders, playingPreview, playPreview, handleLoadSamples };
}
