import { useState, useRef, useEffect, useCallback, type RefObject } from 'react';
import type { EditorHandle } from '../Editor';

type SearchBarProps = {
    editorRef: RefObject<EditorHandle | null>;
    onClose: () => void;
};

export function SearchBar({ editorRef, onClose }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    // Track anchor position for directional search
    const anchorRef = useRef<{ from: number; to: number } | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);

    const findNext = useCallback(
        (q: string) => {
            if (!q) return;
            const from = anchorRef.current ? anchorRef.current.to : 0;
            const match = editorRef.current?.searchNext(q, from);
            if (match) {
                anchorRef.current = match;
                editorRef.current?.selectRange(match.from, match.to);
            }
        },
        [editorRef],
    );

    const findPrev = useCallback(
        (q: string) => {
            if (!q) return;
            const from = anchorRef.current ? anchorRef.current.from : undefined;
            const match = editorRef.current?.searchPrev(q, from);
            if (match) {
                anchorRef.current = match;
                editorRef.current?.selectRange(match.from, match.to);
            }
        },
        [editorRef],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) {
                findPrev(query);
            } else {
                findNext(query);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setQuery(q);
        anchorRef.current = null;
        // Jump to first match immediately as user types
        if (q) {
            const match = editorRef.current?.searchNext(q, 0);
            if (match) {
                anchorRef.current = match;
                editorRef.current?.selectRange(match.from, match.to);
            }
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderTop: 'none',
                borderRight: 'none',
                borderRadius: '0 0 0 6px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
            }}
        >
            <input
                ref={inputRef}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search…"
                spellCheck={false}
                style={{
                    background: 'var(--bg-0)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: '#ccc',
                    padding: '3px 8px',
                    fontFamily: 'inherit',
                    fontSize: '12px',
                    outline: 'none',
                    width: '180px',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <NavBtn title="Previous (Shift+Enter)" onClick={() => findPrev(query)}>↑</NavBtn>
            <NavBtn title="Next (Enter)" onClick={() => findNext(query)}>↓</NavBtn>
            <NavBtn title="Close (Esc)" onClick={onClose}>×</NavBtn>
        </div>
    );
}

function NavBtn({
    children,
    onClick,
    title,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title: string;
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: 'none',
                border: 'none',
                color: '#555',
                cursor: 'pointer',
                fontSize: '14px',
                lineHeight: 1,
                padding: '2px 4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ccc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
        >
            {children}
        </button>
    );
}
