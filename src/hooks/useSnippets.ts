import { useState, useCallback, RefObject } from 'react';
import { toast } from 'sonner';
import { Snippet } from '../types';
import { parseStrudelTunes, parseStrudelMdx } from '../utils/snippets';
import { EditorHandle } from '../Editor';

export function useSnippets(editorRef: RefObject<EditorHandle | null>) {
    const [userSnippets, setUserSnippets] = useState<Snippet[]>(() => {
        try { return JSON.parse(localStorage.getItem('strdl-snippets') ?? '[]'); }
        catch { return []; }
    });
    const [savingSnippet, setSavingSnippet] = useState(false);
    const [snippetName, setSnippetName] = useState('');
    const [pendingSnippetCode, setPendingSnippetCode] = useState('');
    const [snippetSearch, setSnippetSearch] = useState('');
    const [remoteSnippets, setRemoteSnippets] = useState<Snippet[]>(() => {
        try {
            const cached = localStorage.getItem('strdl-remote-snippets');
            if (cached) {
                const { snippets, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < 86400000) return snippets;
            }
        } catch {}
        return [];
    });
    const [loadingRemote, setLoadingRemote] = useState(false);
    const [collapsedRemoteCategories, setCollapsedRemoteCategories] = useState<Set<string>>(new Set());
    const [styleSnippets, setStyleSnippets] = useState<Snippet[]>(() => {
        try {
            const cached = localStorage.getItem('strdl-style-snippets');
            if (cached) {
                const { snippets, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < 86400000) return snippets;
            }
        } catch {}
        return [];
    });
    const [loadingStyles, setLoadingStyles] = useState(false);
    const [collapsedStyleCategories, setCollapsedStyleCategories] = useState<Set<string>>(new Set());

    const startSaveSnippet = useCallback(() => {
        const sel = editorRef.current?.getSelection() ?? '';
        if (!sel.trim()) {
            toast.error("Sélectionne du code dans l'éditeur d'abord");
            return;
        }
        setPendingSnippetCode(sel);
        setSnippetName('');
        setSavingSnippet(true);
    }, [editorRef]);

    const confirmSaveSnippet = useCallback(() => {
        if (!snippetName.trim() || !pendingSnippetCode.trim()) return;
        const snippet: Snippet = { id: Date.now().toString(), name: snippetName.trim(), code: pendingSnippetCode };
        const next = [...userSnippets, snippet];
        setUserSnippets(next);
        localStorage.setItem('strdl-snippets', JSON.stringify(next));
        setSavingSnippet(false);
        setSnippetName('');
        setPendingSnippetCode('');
        toast.success('Snippet sauvegardé !');
    }, [snippetName, pendingSnippetCode, userSnippets]);

    const deleteSnippet = useCallback((id: string) => {
        const next = userSnippets.filter((s) => s.id !== id);
        setUserSnippets(next);
        localStorage.setItem('strdl-snippets', JSON.stringify(next));
    }, [userSnippets]);

    const fetchStyleSnippets = useCallback(async () => {
        setLoadingStyles(true);
        try {
            const base = 'https://codeberg.org/api/v1/repos/uzu/strudel/contents/website/src/repl';
            const tunesData = await fetch(`${base}/tunes.mjs`).then((r) => r.json());
            const tunesText = atob(tunesData.content.replace(/\n/g, ''));
            const snippets = parseStrudelTunes(tunesText);
            setStyleSnippets(snippets);
            setCollapsedStyleCategories(new Set());
            localStorage.setItem('strdl-style-snippets', JSON.stringify({ snippets, timestamp: Date.now() }));
            toast.success(`${snippets.length} patterns chargés !`);
        } catch (err) {
            toast.error('Impossible de charger les patterns par style');
            console.error('[styles]', err);
        } finally {
            setLoadingStyles(false);
        }
    }, []);

    const fetchRemoteSnippets = useCallback(async () => {
        setLoadingRemote(true);
        try {
            const base = 'https://codeberg.org';
            const listRes = await fetch(`${base}/api/v1/repos/uzu/strudel/contents/website/src/pages/learn`);
            if (!listRes.ok) throw new Error(`API ${listRes.status}`);
            const files: { name: string }[] = await listRes.json();
            const mdxFiles = files.filter((f) => f.name.endsWith('.mdx'));
            const contents = await Promise.all(
                mdxFiles.map((f) =>
                    fetch(`${base}/api/v1/repos/uzu/strudel/contents/website/src/pages/learn/${f.name}`)
                        .then((r) => r.json())
                        .then((data) => ({ name: f.name, text: atob(data.content.replace(/\n/g, '')) }))
                        .catch(() => null),
                ),
            );
            const snippets: Snippet[] = [];
            for (const result of contents) {
                if (!result) continue;
                snippets.push(...parseStrudelMdx(result.name, result.text));
            }
            setRemoteSnippets(snippets);
            setCollapsedRemoteCategories(new Set());
            localStorage.setItem('strdl-remote-snippets', JSON.stringify({ snippets, timestamp: Date.now() }));
            toast.success(`${snippets.length} snippets Strudel chargés !`);
        } catch (err) {
            toast.error('Impossible de charger les snippets Strudel');
            console.error('[remote snippets]', err);
        } finally {
            setLoadingRemote(false);
        }
    }, []);

    return {
        userSnippets,
        savingSnippet, setSavingSnippet,
        snippetName, setSnippetName,
        snippetSearch, setSnippetSearch,
        remoteSnippets,
        loadingRemote,
        collapsedRemoteCategories, setCollapsedRemoteCategories,
        styleSnippets,
        loadingStyles,
        collapsedStyleCategories, setCollapsedStyleCategories,
        startSaveSnippet, confirmSaveSnippet, deleteSnippet,
        fetchStyleSnippets, fetchRemoteSnippets,
    };
}
