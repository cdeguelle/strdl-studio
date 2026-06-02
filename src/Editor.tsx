import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { toggleComment } from '@codemirror/commands';
import { SearchCursor } from '@codemirror/search';
import '@strudel/repl';
import type { EditorSettings } from './hooks/useSettings';

// Use changeSetting instead of updateSettings to avoid resetting the theme.
// updateSettings iterates all extensions (including 'theme') and resets anything
// not explicitly passed, which would overwrite the theme set by App.tsx.
function applySettings(ed: any, s: EditorSettings) {
    if (!ed) return;
    ed.changeSetting('fontSize', s.fontSize);
    ed.changeSetting('fontFamily', s.fontFamily);
    ed.changeSetting('isLineNumbersDisplayed', s.lineNumbers);
    ed.changeSetting('isLineWrappingEnabled', s.lineWrapping);
    ed.changeSetting('isBracketMatchingEnabled', s.bracketMatching);
    ed.changeSetting('isBracketClosingEnabled', s.bracketClosing);
    ed.changeSetting('keybindings', s.vimMode ? 'vim' : 'codemirror');
    ed.changeSetting('isTabIndentationEnabled', s.tabIndentation);
}

export type EditorHandle = {
    getCode: () => string;
    setCode: (code: string) => void;
    evalRaw: (code: string) => Promise<void>;
    isPlaying: () => boolean;
    play: () => void;
    stop: () => void;
    insertAtCursor: (text: string) => void;
    getCps: () => number;
    getPattern: () => any;
    getSelection: () => string;
    setTheme: (name: string) => void;
    updateSettings: (s: EditorSettings) => void;
    toggleComment: () => void;
    searchNext: (query: string, from?: number) => { from: number; to: number } | null;
    searchPrev: (query: string, from?: number) => { from: number; to: number } | null;
    selectRange: (from: number, to: number) => void;
    getDocLength: () => number;
};

interface EditorProps {
    onCodeChange?: () => void;
}

export const Editor = forwardRef<EditorHandle, EditorProps>(({ onCodeChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        getCode: () => elementRef.current?.editor?.code ?? '',
        setCode: (code: string) => elementRef.current?.editor?.setCode(code),
        evalRaw: async (code: string) => elementRef.current?.editor?.repl?.evaluate(code, false),
        isPlaying: () => {
            const el = elementRef.current as any;
            return el?.editor?.repl?.scheduler?.started ?? false;
        },
        play: () => {
            const ed = elementRef.current?.editor;
            if (!ed) return;
            // First evaluate starts the scheduler. A second evaluate 50ms later runs
            // in "hot-update" mode (scheduler already running) so draw()-based
            // animations like _scope() are set up without the scheduler restart
            // path that can cancel them via drawer.start() → invalidate() → queryArc().
            ed.evaluate().then(() => setTimeout(() => ed.evaluate(), 50));
        },
        stop: () => elementRef.current?.editor?.stop(),
        insertAtCursor: (text: string) => {
            const view = (elementRef.current?.editor as any)?.editor;
            if (!view) return;
            const { from } = view.state.selection.main;
            view.dispatch({
                changes: { from, insert: text },
                selection: { anchor: from + text.length },
            });
        },
        getCps: () => (elementRef.current?.editor as any)?.repl?.scheduler?.cps ?? 0.5,
        getPattern: () => (elementRef.current?.editor as any)?.repl?.scheduler?.pattern,
        getSelection: () => {
            const view = (elementRef.current?.editor as any)?.editor;
            if (!view) return '';
            const { from, to } = view.state.selection.main;
            return view.state.doc.sliceString(from, to);
        },
        setTheme: (name: string) => elementRef.current?.editor?.setTheme(name),
        updateSettings: (s: EditorSettings) => {
            applySettings(elementRef.current?.editor, s);
        },
        toggleComment: () => {
            const view = (elementRef.current?.editor as any)?.editor;
            if (view) toggleComment(view);
        },
        searchNext: (query: string, from = 0) => {
            const view = (elementRef.current?.editor as any)?.editor;
            if (!view || !query) return null;
            const cursor = new SearchCursor(view.state.doc, query, from);
            cursor.next();
            if (cursor.value.from === cursor.value.to) {
                // Wrap around from beginning
                const wrap = new SearchCursor(view.state.doc, query, 0);
                wrap.next();
                if (wrap.value.from === wrap.value.to) return null;
                return { from: wrap.value.from, to: wrap.value.to };
            }
            return { from: cursor.value.from, to: cursor.value.to };
        },
        searchPrev: (query: string, from?: number) => {
            const view = (elementRef.current?.editor as any)?.editor;
            if (!view || !query) return null;
            const docLen = view.state.doc.length;
            const start = from ?? docLen;
            const cursor = new SearchCursor(view.state.doc, query, 0, start);
            // Collect all matches before `start`, take the last one
            const matches: { from: number; to: number }[] = [];
            while (!cursor.next().done) {
                if (cursor.value.from < start) {
                    matches.push({ from: cursor.value.from, to: cursor.value.to });
                }
            }
            if (matches.length > 0) return matches[matches.length - 1];
            // Wrap: find last match in whole doc
            const all = new SearchCursor(view.state.doc, query, 0);
            const allMatches: { from: number; to: number }[] = [];
            while (!all.next().done) allMatches.push({ from: all.value.from, to: all.value.to });
            return allMatches.length > 0 ? allMatches[allMatches.length - 1] : null;
        },
        selectRange: (from: number, to: number) => {
            const view = (elementRef.current?.editor as any)?.editor;
            if (!view) return;
            view.dispatch({
                selection: { anchor: from, head: to },
                scrollIntoView: true,
            });
            view.focus();
        },
        getDocLength: () => {
            const view = (elementRef.current?.editor as any)?.editor;
            return view?.state.doc.length ?? 0;
        },
    }));

    useEffect(() => {
        if (!containerRef.current) return;
        const el = document.createElement('strudel-editor');
        el.addEventListener('strudel-code-change', onCodeChange ?? (() => {}));
        el.setAttribute('code', '// Start coding...');
        el.style.display = 'none';
        elementRef.current = el;
        containerRef.current.appendChild(el);

        // StrudelMirror insère son container juste après — on attend le prochain tick
        setTimeout(() => {
            const strudelContainer = el.nextSibling as HTMLElement;
            if (strudelContainer) {
                strudelContainer.style.height = '100%';
                const cmEditor = strudelContainer.querySelector('.cm-editor') as HTMLElement;
                const cmScroller = strudelContainer.querySelector('.cm-scroller') as HTMLElement;
                if (cmEditor) cmEditor.style.height = '100%';
                if (cmScroller) cmScroller.style.flex = '1';
            }
            // Active l'autocomplétion
            (el as any).editor?.setAutocompletionEnabled(true);
            // Apply saved settings (changeSetting only, to avoid resetting theme)
            const saved = localStorage.getItem('strdl-settings');
            if (saved) {
                try {
                    applySettings((el as any).editor, JSON.parse(saved));
                } catch { /* ignore */ }
            }
        }, 100);

        return () => {
            el.nextSibling?.remove();
            el.remove();
        };
    }, []);

    return <div ref={containerRef} style={{ height: '100%', width: '100%', overflow: 'hidden' }} />;
});
