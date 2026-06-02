import { useState, useEffect, useRef } from 'react';
import { Play, Square, Loader } from 'lucide-react';
import { useSoundCatalog, type SoundBank } from '../hooks/useSoundCatalog';

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

const CATEGORIES = ['all', 'dirt', 'drum-machines', 'vcsl', 'piano', 'mridangam', 'uzu', 'waveform', 'zzfx'];

type SubTab = 'local' | 'sounds';

export function SamplesPanel({ loadedSamples, sampleSearch, setSampleSearch, collapsedFolders, setCollapsedFolders, playingPreview, onPreview, onInsert }: SamplesPanelProps) {
    const [subTab, setSubTab] = useState<SubTab>('local');
    const catalog = useSoundCatalog();

    useEffect(() => {
        if (subTab === 'sounds') catalog.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subTab]);

    const toggleFolder = (folder: string) =>
        setCollapsedFolders((prev) => { const next = new Set(prev); next.has(folder) ? next.delete(folder) : next.add(folder); return next; });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                {(['local', 'sounds'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setSubTab(t)}
                        style={{
                            flex: 1, background: 'transparent', border: 'none',
                            borderBottom: `2px solid ${subTab === t ? 'var(--accent-dim)' : 'transparent'}`,
                            padding: '5px 0', color: subTab === t ? '#888' : '#333',
                            fontSize: '9px', fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                        }}
                        onMouseEnter={e => { if (subTab !== t) e.currentTarget.style.color = '#666'; }}
                        onMouseLeave={e => { if (subTab !== t) e.currentTarget.style.color = '#333'; }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {subTab === 'local' && (
                <LocalTab
                    loadedSamples={loadedSamples}
                    sampleSearch={sampleSearch}
                    setSampleSearch={setSampleSearch}
                    collapsedFolders={collapsedFolders}
                    toggleFolder={toggleFolder}
                    playingPreview={playingPreview}
                    onPreview={onPreview}
                    onInsert={onInsert}
                />
            )}

            {subTab === 'sounds' && (
                <SoundsTab catalog={catalog} onInsert={onInsert} />
            )}
        </div>
    );
}

function LocalTab({ loadedSamples, sampleSearch, setSampleSearch, collapsedFolders, toggleFolder, playingPreview, onPreview, onInsert }: {
    loadedSamples: Record<string, string[]>;
    sampleSearch: string;
    setSampleSearch: (s: string) => void;
    collapsedFolders: Set<string>;
    toggleFolder: (f: string) => void;
    playingPreview: string | null;
    onPreview: (f: string) => void;
    onInsert: (code: string) => void;
}) {
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

function SoundsTab({ catalog, onInsert }: { catalog: ReturnType<typeof useSoundCatalog>; onInsert: (code: string) => void }) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [playingBank, setPlayingBank] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const filtered = catalog.banks.filter(b => {
        if (activeCategory !== 'all' && b.category !== activeCategory) return false;
        if (search) return b.name.toLowerCase().includes(search.toLowerCase());
        return true;
    });

    const availableCategories = CATEGORIES.filter(
        c => c === 'all' || catalog.banks.some(b => b.category === c)
    );

    const handlePreview = (bank: SoundBank) => {
        if (playingBank === bank.name) {
            audioRef.current?.pause();
            audioRef.current = null;
            setPlayingBank(null);
            return;
        }
        if (!bank.firstUrl) return;
        audioRef.current?.pause();
        const audio = new Audio(bank.firstUrl);
        audio.volume = 0.8;
        audio.play().catch(() => {});
        audio.onended = () => setPlayingBank(null);
        audioRef.current = audio;
        setPlayingBank(bank.name);
    };

    if (catalog.loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Loader size={16} style={{ color: '#444', animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '10px', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>Chargement du catalogue...</span>
            </div>
        );
    }

    if (catalog.error && !catalog.loaded) {
        return (
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '10px', color: '#ef4444', fontFamily: "'JetBrains Mono', monospace" }}>Erreur de chargement</span>
                <button
                    onClick={catalog.load}
                    style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 8px', fontSize: '10px', color: '#666', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <div style={{ padding: '6px 8px 4px', flexShrink: 0 }}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={inputStyle}
                />
            </div>

            {/* Category filter */}
            <div style={{ padding: '4px 8px', display: 'flex', flexWrap: 'wrap', gap: '3px', flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
                {availableCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            background: activeCategory === cat ? 'var(--accent-bg)' : 'transparent',
                            border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: '3px',
                            padding: '2px 6px',
                            fontSize: '9px',
                            color: activeCategory === cat ? 'var(--accent)' : '#555',
                            cursor: 'pointer',
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ overflow: 'auto', flex: 1, padding: '4px 0' }}>
                {filtered.map(bank => {
                    const isPreviewing = playingBank === bank.name;
                    const canPreview = bank.firstUrl !== null;
                    return (
                        <div
                            key={`${bank.category}-${bank.name}`}
                            style={{
                                padding: '4px 8px 4px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: isPreviewing ? '#27c93f' : '#555',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => {
                                if (!isPreviewing) e.currentTarget.style.color = 'var(--accent)';
                                const btn = e.currentTarget.querySelector('.sound-preview-btn') as HTMLElement;
                                if (btn && canPreview) btn.style.opacity = '1';
                            }}
                            onMouseLeave={e => {
                                if (!isPreviewing) e.currentTarget.style.color = '#555';
                                const btn = e.currentTarget.querySelector('.sound-preview-btn') as HTMLElement;
                                if (btn && !isPreviewing) btn.style.opacity = '0';
                            }}
                        >
                            <span
                                onClick={() => onInsert(`s("${bank.name}")`)}
                                style={{ flex: 1, fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                title={`Insérer s("${bank.name}")`}
                            >
                                {bank.name}
                            </span>
                            {bank.count > 0 && (
                                <span style={{ fontSize: '9px', color: '#333', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                                    {bank.count}
                                </span>
                            )}
                            {canPreview && (
                                <span
                                    className="sound-preview-btn"
                                    onClick={e => { e.stopPropagation(); handlePreview(bank); }}
                                    style={{
                                        opacity: isPreviewing ? 1 : 0,
                                        color: isPreviewing ? '#27c93f' : '#aaa',
                                        flexShrink: 0,
                                        lineHeight: 1,
                                        transition: 'opacity 0.1s',
                                        cursor: 'pointer',
                                    }}
                                    title={isPreviewing ? 'Stop' : 'Preview'}
                                >
                                    {isPreviewing ? <Square size={11} /> : <Play size={11} />}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
