import { useState, useEffect, RefObject } from 'react';
import { Tab, INITIAL_CODE } from '../types';
import { EditorHandle } from '../Editor';

export function usePlayback(
    editorRef: RefObject<EditorHandle | null>,
    tabsRef: RefObject<Tab[]>,
    activeTabIdxRef: RefObject<number>,
) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsPlaying(true);
        const handleStop = () => setIsPlaying(false);
        document.addEventListener('start-repl', handleStart);
        document.addEventListener('stop-repl', handleStop);

        const interval = setInterval(() => {
            setIsPlaying(editorRef.current?.isPlaying() ?? false);
            const currentCode = editorRef.current?.getCode() ?? '';
            const activeTab = tabsRef.current[activeTabIdxRef.current];
            setIsDirty(currentCode !== (activeTab?.savedCode ?? INITIAL_CODE));
            setBpm(Math.round((editorRef.current?.getCps() ?? 0.5) * 60));
        }, 100);

        return () => {
            document.removeEventListener('start-repl', handleStart);
            document.removeEventListener('stop-repl', handleStop);
            clearInterval(interval);
        };
    }, [editorRef, tabsRef, activeTabIdxRef]);

    return { isPlaying, bpm, isDirty };
}
