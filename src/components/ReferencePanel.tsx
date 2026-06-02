import { useState, useMemo } from 'react';
import { STRUDEL_DOCS, type DocEntry } from '../data/strudelDocs';

const FILE_LABELS: Record<string, string> = {
    controls: 'controls',
    midi: 'midi',
    motion: 'motion',
    pattern: 'pattern',
    pianoroll: 'viz',
    pick: 'pick',
    pitchwheel: 'viz',
    repl: 'repl',
    scope: 'viz',
    signal: 'signal',
    slider: 'viz',
    spectrum: 'viz',
    spiral: 'viz',
    superdough: 'synth',
    tonal: 'tonal',
    voicings: 'voicings',
    wavetable: 'wavetable',
    codemirror: 'editor',
};

const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent ?? div.innerText ?? '';
};

type ReferencePanelProps = {
    onInsert: (code: string) => void;
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--bg-0)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '11px',
    color: '#aaa',
    fontFamily: "'JetBrains Mono', monospace",
    outline: 'none',
};

export function ReferencePanel({ onInsert }: ReferencePanelProps) {
    const [search, setSearch] = useState('');
    const [activeFile, setActiveFile] = useState<string | null>(null);
    const [selected, setSelected] = useState<DocEntry | null>(null);

    const files = useMemo(() => [...new Set(STRUDEL_DOCS.map(d => d.file))].sort(), []);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return STRUDEL_DOCS.filter(d => {
            if (activeFile && d.file !== activeFile) return false;
            if (!q) return true;
            return (
                d.name.toLowerCase().includes(q) ||
                d.synonyms.some(s => s.toLowerCase().includes(q)) ||
                stripHtml(d.description).toLowerCase().includes(q)
            );
        });
    }, [search, activeFile]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <div style={{ padding: '8px 8px 4px', flexShrink: 0 }}>
                <input
                    type="text"
                    placeholder="Rechercher une fonction..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={inputStyle}
                />
            </div>

            {/* Category filter */}
            <div style={{
                padding: '4px 8px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '3px',
                flexShrink: 0,
                borderBottom: '1px solid var(--border)',
            }}>
                <button
                    onClick={() => setActiveFile(null)}
                    style={{
                        background: activeFile === null ? 'var(--accent-bg)' : 'transparent',
                        border: `1px solid ${activeFile === null ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: '3px',
                        padding: '2px 6px',
                        fontSize: '9px',
                        color: activeFile === null ? 'var(--accent)' : '#555',
                        cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace",
                    }}
                >
                    all
                </button>
                {files.map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFile(activeFile === f ? null : f)}
                        style={{
                            background: activeFile === f ? 'var(--accent-bg)' : 'transparent',
                            border: `1px solid ${activeFile === f ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: '3px',
                            padding: '2px 6px',
                            fontSize: '9px',
                            color: activeFile === f ? 'var(--accent)' : '#555',
                            cursor: 'pointer',
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        {FILE_LABELS[f] ?? f}
                    </button>
                ))}
            </div>

            {selected ? (
                <DetailView doc={selected} onBack={() => setSelected(null)} onInsert={onInsert} />
            ) : (
                <div style={{ overflow: 'auto', flex: 1 }}>
                    <div style={{ padding: '4px 0', fontSize: '9px', color: '#333', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace" }}>
                        {filtered.length} fonctions
                    </div>
                    {filtered.map(doc => (
                        <div
                            key={doc.name}
                            onClick={() => setSelected(doc)}
                            style={{
                                padding: '4px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '6px',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace" }}>
                                {doc.name}
                            </span>
                            {doc.synonyms.length > 0 && (
                                <span style={{ fontSize: '9px', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>
                                    {doc.synonyms.join(', ')}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function DetailView({ doc, onBack, onInsert }: { doc: DocEntry; onBack: () => void; onInsert: (code: string) => void }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <div style={{
                padding: '6px 12px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
            }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#555',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontFamily: "'JetBrains Mono', monospace",
                        padding: '0',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#aaa')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                    ← retour
                </button>
            </div>
            <div style={{ overflow: 'auto', flex: 1, padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                    <span
                        onClick={() => onInsert(doc.name)}
                        style={{
                            fontSize: '13px',
                            color: 'var(--accent)',
                            fontFamily: "'JetBrains Mono', monospace",
                            cursor: 'pointer',
                        }}
                        title="Insérer dans l'éditeur"
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                    >
                        {doc.name}
                    </span>
                    {doc.synonyms.length > 0 && (
                        <span style={{ fontSize: '10px', color: '#555', fontFamily: "'JetBrains Mono', monospace" }}>
                            aka {doc.synonyms.map((s, i) => (
                                <span
                                    key={s}
                                    onClick={() => onInsert(s)}
                                    style={{ cursor: 'pointer', color: '#666' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                                >
                                    {s}{i < doc.synonyms.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </span>
                    )}
                </div>

                <div style={{ fontSize: '9px', color: '#444', fontFamily: "'JetBrains Mono', monospace", marginBottom: '8px' }}>
                    {FILE_LABELS[doc.file] ?? doc.file}
                    {doc.superdirtOnly && <span style={{ color: '#555', marginLeft: '6px' }}>· superdirt only</span>}
                </div>

                {doc.description && (
                    <p style={{
                        fontSize: '11px',
                        color: '#888',
                        fontFamily: "'JetBrains Mono', monospace",
                        lineHeight: 1.5,
                        margin: '0 0 10px',
                    }}>
                        {stripHtml(doc.description)}
                    </p>
                )}

                {doc.params.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '9px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px' }}>
                            params
                        </div>
                        {doc.params.map(p => (
                            <div key={p.name} style={{ padding: '2px 0', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>
                                <span style={{ color: 'var(--accent)' }}>{p.name}</span>
                                {p.type && <span style={{ color: '#444' }}> : {p.type}</span>}
                                {p.description && <span style={{ color: '#666' }}> — {stripHtml(p.description)}</span>}
                            </div>
                        ))}
                    </div>
                )}

                {doc.examples.length > 0 && (
                    <div>
                        <div style={{ fontSize: '9px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px' }}>
                            exemples
                        </div>
                        {doc.examples.map((ex, i) => (
                            <pre
                                key={i}
                                onClick={() => onInsert(ex)}
                                style={{
                                    background: 'var(--bg-0)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '4px',
                                    padding: '6px 8px',
                                    fontSize: '10px',
                                    color: '#777',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    margin: '0 0 6px',
                                    whiteSpace: 'pre-wrap',
                                    cursor: 'pointer',
                                    lineHeight: 1.4,
                                }}
                                title="Insérer dans l'éditeur"
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-dim)';
                                    (e.currentTarget as HTMLElement).style.color = '#aaa';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                                    (e.currentTarget as HTMLElement).style.color = '#777';
                                }}
                            >
                                {ex}
                            </pre>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
