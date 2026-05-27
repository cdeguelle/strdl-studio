type ResizeHandleProps = {
    onMouseDown: (e: React.MouseEvent) => void;
};

export function ResizeHandle({ onMouseDown }: ResizeHandleProps) {
    return (
        <div
            onMouseDown={onMouseDown}
            style={{ width: '4px', cursor: 'col-resize', background: 'var(--border)', flexShrink: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--border)')}
        />
    );
}
