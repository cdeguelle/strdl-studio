import { Play, Square } from 'lucide-react';

type SamplesPanelProps = {
    loadedSamples: Record<string, string[]>;
    sampleSearch: string;
    setSampleSearch: (s: string) => void;
    collapsedFolders: Set<string>;
    setCollapsedFolders: (fn: (prev: Set<string>) => Set<string>) => void;
    playingPreview: string | null;
    onPreview: (filePath: string) => void;
    onInsert: (code: string) => void;
};

const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', background: 'var(--bg-0)',
    border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 8px',
    fontSize: '11px', color: '#aaa', fontFamily: "'JetBrains Mono', monospace", outline: 'none',
};

export function SamplesPanel({ loadedSamples, sampleSearch, setSampleSearch, collapsedFolders, setCollapsedFolders, playingPreview, onPreview, onInsert }: SamplesPanelProps) {
    const toggleFolder = (folder: string) =>
        setCollapsedFolders((prev) => { const next = new Set(prev); next.has(folder) ? next.delete(folder) : next.add(folder); return next; });

    return (
        <div style={{ overflow: 'auto', flex: 1, padding: '8px 0' }}>
            {Object.keys(loadedSamples).length > 0 && (
                <div style={{ padding: '0 8px 6px' }}>
                    <input type="text" placeholder="Rechercher..." value={sampleSearch} onChange={(e) => setSampleSearch(e.target.value)} style={inputStyle} />
                </div>
            )}
            {Object.keys(loadedSamples).length === 0 && (
                <div style={{ padding: '8px 12px', fontSize: '11px', color: '#333', fontStyle: 'italic', fontFamily: "'JetBrains Mono', monospace" }}>
                    Aucun sample chargé
                </div>
            )}
            {Object.entries(loadedSamples)
                .filter(([folder, files]) => {
                    if (!sampleSearch) return true;
                    const q = sampleSearch.toLowerCase();
                    return folder.toLowerCase().includes(q) || files.some((f) => (f.split('%2F').pop() ?? '').toLowerCase().includes(q));
                })
                .map(([folder, files]) => {
                    const collapsed = collapsedFolders.has(folder);
                    const visibleFiles = sampleSearch
                        ? files.filter((f) => {
                              const name = (f.split('%2F').pop() ?? '').toLowerCase();
                              return name.includes(sampleSearch.toLowerCase()) || folder.toLowerCase().includes(sampleSearch.toLowerCase());
                          })
                        : files;
                    return (
                        <div key={folder}>
                            <div
                                onClick={() => toggleFolder(folder)}
                                style={{ padding: '5px 12px 3px', fontSize: '10px', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', userSelect: 'none' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                            >
                                <span style={{ fontSize: '8px', opacity: 0.6 }}>{collapsed ? '▶' : '▼'}</span>
                                {folder}
                                <span style={{ color: '#333', marginLeft: 'auto' }}>{files.length}</span>
                            </div>
                            {!collapsed && visibleFiles.map((filePath) => {
                                const originalIdx = files.indexOf(filePath);
                                const fileName = filePath.split('%2F').pop()?.replace(/\.[^.]+$/, '') ?? `${folder}_${originalIdx}`;
                                const isPreviewing = playingPreview === filePath;
                                return (
                                    <div
                                        key={filePath}
                                        style={{ padding: '3px 8px 3px 20px', fontSize: '11px', color: isPreviewing ? '#27c93f' : '#555', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: '4px' }}
                                        onMouseEnter={(e) => { if (!isPreviewing) e.currentTarget.style.color = 'var(--accent)'; const btn = e.currentTarget.querySelector('.preview-btn') as HTMLElement; if (btn) btn.style.opacity = '1'; }}
                                        onMouseLeave={(e) => { if (!isPreviewing) e.currentTarget.style.color = '#555'; const btn = e.currentTarget.querySelector('.preview-btn') as HTMLElement; if (btn) btn.style.opacity = '0'; }}
                                    >
                                        <span onClick={() => onInsert(`sound("${folder}:${originalIdx}")`)} style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={`Insérer sound("${folder}:${originalIdx}")`}>
                                            {fileName}
                                        </span>
                                        <span
                                            className="preview-btn"
                                            onClick={(e) => { e.stopPropagation(); onPreview(filePath); }}
                                            style={{ opacity: isPreviewing ? 1 : 0, fontSize: '11px', color: isPreviewing ? '#27c93f' : '#aaa', flexShrink: 0, lineHeight: 1, transition: 'opacity 0.1s' }}
                                            title={isPreviewing ? 'Stop preview' : 'Preview'}
                                        >
                                            {isPreviewing ? <Square size={11} /> : <Play size={11} />}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
        </div>
    );
}
