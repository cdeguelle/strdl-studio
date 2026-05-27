import { useState, useRef, useCallback, useEffect, RefObject } from 'react';
import { confirm } from '@tauri-apps/plugin-dialog';
import { Tab, INITIAL_CODE } from '../types';
import { EditorHandle } from '../Editor';

export function useTabs(editorRef: RefObject<EditorHandle | null>) {
    const tabIdCounter = useRef(1);
    const [tabs, setTabs] = useState<Tab[]>([
        { id: '1', path: null, code: INITIAL_CODE, savedCode: INITIAL_CODE },
    ]);
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const tabsRef = useRef<Tab[]>([{ id: '1', path: null, code: INITIAL_CODE, savedCode: INITIAL_CODE }]);
    const activeTabIdxRef = useRef(0);

    const applyTabs = (next: Tab[]) => {
        tabsRef.current = next;
        setTabs(next);
    };

    // Sync initial editor code into tab state after mount
    useEffect(() => {
        const t = setTimeout(() => {
            const code = editorRef.current?.getCode() ?? INITIAL_CODE;
            applyTabs(tabsRef.current.map((tab, i) => i === 0 ? { ...tab, code, savedCode: code } : tab));
        }, 500);
        return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const switchTab = useCallback((idx: number) => {
        const currentIdx = activeTabIdxRef.current;
        if (idx === currentIdx) return;
        const currentCode = editorRef.current?.getCode() ?? '';
        const updated = tabsRef.current.map((t, i) => i === currentIdx ? { ...t, code: currentCode } : t);
        const target = updated[idx];
        if (!target) return;
        editorRef.current?.setCode(target.code || INITIAL_CODE);
        activeTabIdxRef.current = idx;
        applyTabs(updated);
        setActiveTabIdx(idx);
    }, [editorRef]);

    const newTab = useCallback(() => {
        const currentIdx = activeTabIdxRef.current;
        const currentCode = editorRef.current?.getCode() ?? '';
        const snapshotted = tabsRef.current.map((t, i) => i === currentIdx ? { ...t, code: currentCode } : t);
        const tab: Tab = { id: String(++tabIdCounter.current), path: null, code: INITIAL_CODE, savedCode: INITIAL_CODE };
        const next = [...snapshotted, tab];
        const newIdx = next.length - 1;
        activeTabIdxRef.current = newIdx;
        editorRef.current?.setCode(INITIAL_CODE);
        applyTabs(next);
        setActiveTabIdx(newIdx);
    }, [editorRef]);

    const closeTab = useCallback(async (idx: number) => {
        const tab = tabsRef.current[idx];
        if (!tab) return;
        const codeToCheck = idx === activeTabIdxRef.current
            ? (editorRef.current?.getCode() ?? tab.code)
            : tab.code;
        if (codeToCheck !== tab.savedCode) {
            const confirmed = await confirm(
                'Ce fichier a des modifications non sauvegardées. Fermer quand même ?',
                { title: "Fermer l'onglet", kind: 'warning' },
            );
            if (!confirmed) return;
        }
        const prev = tabsRef.current;
        if (prev.length === 1) {
            const fresh: Tab = { id: String(++tabIdCounter.current), path: null, code: INITIAL_CODE, savedCode: INITIAL_CODE };
            activeTabIdxRef.current = 0;
            editorRef.current?.setCode(INITIAL_CODE);
            applyTabs([fresh]);
            setActiveTabIdx(0);
            return;
        }
        const next = prev.filter((_, i) => i !== idx);
        let newActiveIdx = activeTabIdxRef.current;
        if (idx === activeTabIdxRef.current) {
            newActiveIdx = Math.min(idx, next.length - 1);
            editorRef.current?.setCode(next[newActiveIdx]?.code || INITIAL_CODE);
        } else if (idx < activeTabIdxRef.current) {
            newActiveIdx = activeTabIdxRef.current - 1;
        }
        activeTabIdxRef.current = newActiveIdx;
        applyTabs(next);
        setActiveTabIdx(newActiveIdx);
    }, [editorRef]);

    return { tabs, activeTabIdx, tabsRef, activeTabIdxRef, applyTabs, switchTab, newTab, closeTab };
}
