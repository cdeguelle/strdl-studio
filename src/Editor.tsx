import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '@strudel/repl';

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
        }, 100);

        return () => {
            el.nextSibling?.remove();
            el.remove();
        };
    }, []);

    return <div ref={containerRef} style={{ height: '100%', width: '100%', overflow: 'hidden' }} />;
});
