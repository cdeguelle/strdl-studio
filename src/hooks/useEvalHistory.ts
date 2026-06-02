import { useRef, useCallback } from 'react';
import type { RefObject } from 'react';
import type { EditorHandle } from '../Editor';

export function useEvalHistory(editorRef: RefObject<EditorHandle | null>) {
    const history = useRef<string[]>([]);
    const cursor = useRef<number>(0);

    const push = useCallback((code: string) => {
        if (history.current[history.current.length - 1] === code) return;
        history.current.push(code);
        cursor.current = history.current.length;
    }, []);

    const navigate = useCallback(
        (dir: 'up' | 'down') => {
            const len = history.current.length;
            if (len === 0) return;
            if (dir === 'up') {
                cursor.current = Math.max(0, cursor.current - 1);
            } else {
                cursor.current = Math.min(len, cursor.current + 1);
            }
            if (cursor.current < len) {
                editorRef.current?.setCode(history.current[cursor.current]);
            }
        },
        [editorRef],
    );

    return { push, navigate };
}
