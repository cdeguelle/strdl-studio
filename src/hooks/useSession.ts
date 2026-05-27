import { useState, useCallback, useEffect, RefObject } from 'react';
import { open, save } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { Tab } from '../types';
import { EditorHandle } from '../Editor';

export function useSession(
    editorRef: RefObject<EditorHandle | null>,
    tabsRef: RefObject<Tab[]>,
    activeTabIdxRef: RefObject<number>,
    applyTabs: (next: Tab[]) => void,
) {
    const [recentSessions, setRecentSessions] = useState<string[]>([]);
    const [recentMenuOpen, setRecentMenuOpen] = useState(false);

    useEffect(() => {
        invoke<string[]>('get_recent_sessions').then(setRecentSessions);
    }, []);

    useEffect(() => {
        const close = () => setRecentMenuOpen(false);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const loadSession = useCallback(async (content: string, path: string) => {
        const idx = activeTabIdxRef.current;
        editorRef.current?.setCode(content);
        applyTabs(tabsRef.current.map((t, i) =>
            i === idx ? { ...t, path, code: content, savedCode: content } : t,
        ));
        await invoke('add_recent_session', { path });
        setRecentSessions((prev) => [path, ...prev.filter((p) => p !== path)].slice(0, 10));
    }, [editorRef, tabsRef, activeTabIdxRef, applyTabs]);

    const handleOpen = useCallback(async () => {
        const selected = await open({
            multiple: false,
            filters: [{ name: 'Strudel Session', extensions: ['js'] }],
        });
        if (selected) {
            const path = Array.isArray(selected) ? selected[0] : selected;
            const content = await invoke<string>('read_session', { path });
            await loadSession(content, path);
        }
    }, [loadSession]);

    const handleSave = useCallback(async () => {
        const content = editorRef.current?.getCode() ?? '';
        const idx = activeTabIdxRef.current;
        const tab = tabsRef.current[idx];
        const path = tab?.path ?? (await save({
            filters: [{ name: 'Strudel Session', extensions: ['js'] }],
        }));
        if (path) {
            await invoke('write_session', { path, content });
            await invoke('add_recent_session', { path });
            setRecentSessions((prev) => [path, ...prev.filter((p) => p !== path)].slice(0, 10));
            if (editorRef.current?.isPlaying()) editorRef.current?.play();
            applyTabs(tabsRef.current.map((t, i) =>
                i === idx ? { ...t, path, code: content, savedCode: content } : t,
            ));
        }
    }, [editorRef, tabsRef, activeTabIdxRef, applyTabs]);

    return { recentSessions, recentMenuOpen, setRecentMenuOpen, loadSession, handleOpen, handleSave };
}
