import { X } from 'lucide-react';
import { Snippet, BUILTIN_SNIPPETS } from '../types';

type SnippetsPanelProps = {
    userSnippets: Snippet[];
    savingSnippet: boolean;
    setSavingSnippet: (v: boolean) => void;
    snippetName: string;
    setSnippetName: (v: string) => void;
    snippetSearch: string;
    setSnippetSearch: (v: string) => void;
    remoteSnippets: Snippet[];
    loadingRemote: boolean;
    collapsedRemoteCategories: Set<string>;
    setCollapsedRemoteCategories: (fn: (prev: Set<string>) => Set<string>) => void;
    styleSnippets: Snippet[];
    loadingStyles: boolean;
    collapsedStyleCategories: Set<string>;
    setCollapsedStyleCategories: (fn: (prev: Set<string>) => Set<string>) => void;
    onStartSave: () => void;
    onConfirmSave: () => void;
    onDelete: (id: string) => void;
    onFetchRemote: () => void;
    onFetchStyles: () => void;
    onInsert: (code: string) => void;
};

const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', background: 'var(--bg-0)',
    border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 8px',
    fontSize: '11px', color: '#aaa', fontFamily: "'JetBrains Mono', monospace", outline: 'none',
};

function CategoryGroup({ title, snippets, collapsed, onToggle, onInsert, color = '#888' }: {
    title: string; snippets: Snippet[]; collapsed: boolean;
    onToggle: () => void; onInsert: (code: string) => void; color?: string;
}) {
    return (
        <div>
            <div
                onClick={onToggle}
                style={{ padding: '4px 12px 2px', fontSize: '10px', color: '#555', letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', userSelect: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
            >
                <span style={{ fontSize: '8px', opacity: 0.6 }}>{collapsed ? '▶' : '▼'}</span>
                {title}
                <span style={{ color: '#333', marginLeft: 'auto' }}>{snippets.length}</span>
            </div>
            {!collapsed && snippets.map((s) => (
                <div key={s.id} className="snippet-item" onClick={() => onInsert(s.code)}
                    style={{ padding: '4px 12px 4px 22px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                    <div style={{ fontSize: '11px', color, fontFamily: "'JetBrains Mono', monospace", marginBottom: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                    <div style={{ fontSize: '10px', color: '#333', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.code.split('\n')[0]}</div>
                </div>
            ))}
        </div>
    );
}

export function SnippetsPanel({
    userSnippets, savingSnippet, setSavingSnippet, snippetName, setSnippetName,
    snippetSearch, setSnippetSearch, remoteSnippets, loadingRemote,
    collapsedRemoteCategories, setCollapsedRemoteCategories,
    styleSnippets, loadingStyles, collapsedStyleCategories, setCollapsedStyleCategories,
    onStartSave, onConfirmSave, onDelete, onFetchRemote, onFetchStyles, onInsert,
}: SnippetsPanelProps) {
    const q = snippetSearch.toLowerCase();
    const matches = (s: Snippet) => !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);

    const filteredUser = userSnippets.filter(matches);
    const filteredBuiltin = BUILTIN_SNIPPETS.filter(matches);

    const byCategory = (snippets: Snippet[]) =>
        snippets.filter(matches).reduce((acc, s) => {
            const cat = s.category ?? 'Autres';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(s);
            return acc;
        }, {} as Record<string, Snippet[]>);

    const toggleSet = (setter: (fn: (prev: Set<string>) => Set<string>) => void, key: string) =>
        setter((prev) => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next; });

    return (
        <div style={{ overflow: 'auto', flex: 1, padding: '8px 0' }}>
            {/* Save selection */}
            <div style={{ padding: '0 8px 6px' }}>
                {!savingSnippet ? (
                    <button
                        onClick={onStartSave}
                        style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '5px 8px', color: '#555', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textAlign: 'left', transition: 'all 0.1s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-dim)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                        + Sauvegarder la sélection
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <input
                            autoFocus type="text" placeholder="Nom du snippet..." value={snippetName}
                            onChange={(e) => setSnippetName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') onConfirmSave(); if (e.key === 'Escape') setSavingSnippet(false); }}
                            style={{ ...inputStyle, border: '1px solid var(--accent-dim)' }}
                        />
                        <button onClick={onConfirmSave} style={{ background: 'var(--accent)', border: 'none', borderRadius: '4px', padding: '4px 8px', color: 'white', cursor: 'pointer', fontSize: '11px' }}>✓</button>
                        <button onClick={() => setSavingSnippet(false)} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 8px', color: '#555', cursor: 'pointer', fontSize: '11px' }}>✕</button>
                    </div>
                )}
            </div>

            {/* Search */}
            {(userSnippets.length > 0 || remoteSnippets.length > 0) && (
                <div style={{ padding: '0 8px 6px' }}>
                    <input type="text" placeholder="Rechercher..." value={snippetSearch} onChange={(e) => setSnippetSearch(e.target.value)} style={inputStyle} />
                </div>
            )}

            {/* User snippets */}
            {filteredUser.length > 0 && (
                <>
                    <div style={{ padding: '4px 12px 4px', fontSize: '9px', color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mes snippets</div>
                    {filteredUser.map((s) => (
                        <div key={s.id}
                            style={{ padding: '5px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '6px' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; const btn = e.currentTarget.querySelector('.snippet-del') as HTMLElement; if (btn) btn.style.opacity = '1'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; const btn = e.currentTarget.querySelector('.snippet-del') as HTMLElement; if (btn) btn.style.opacity = '0'; }}
                        >
                            <div style={{ flex: 1, minWidth: 0 }} onClick={() => onInsert(s.code)}>
                                <div style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '2px' }}>{s.name}</div>
                                <div style={{ fontSize: '10px', color: '#3a3a44', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.code.split('\n')[0]}</div>
                            </div>
                            <span className="snippet-del" onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} title="Supprimer"
                                style={{ opacity: 0, color: '#555', cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.1s', display: 'flex', alignItems: 'center' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                            ><X size={11} /></span>
                        </div>
                    ))}
                </>
            )}

            {/* Built-in snippets */}
            {filteredBuiltin.length > 0 && (
                <>
                    <div style={{ padding: '4px 12px 4px', fontSize: '9px', color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Exemples</div>
                    {filteredBuiltin.map((s) => (
                        <div key={s.id} onClick={() => onInsert(s.code)}
                            style={{ padding: '5px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                            <div style={{ fontSize: '11px', color: '#888', fontFamily: "'JetBrains Mono', monospace", marginBottom: '2px' }}>{s.name}</div>
                            <div style={{ fontSize: '10px', color: '#3a3a44', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.code.split('\n')[0]}</div>
                        </div>
                    ))}
                </>
            )}

            {/* Par style */}
            <div style={{ padding: '4px 12px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '9px', color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Par style</span>
                {styleSnippets.length > 0 && (
                    <button onClick={onFetchStyles} disabled={loadingStyles} title="Rafraîchir"
                        style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '12px', padding: '0 2px' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
                    >↻</button>
                )}
            </div>
            {styleSnippets.length === 0 && !loadingStyles && (
                <div style={{ padding: '0 8px 6px' }}>
                    <button onClick={onFetchStyles}
                        style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '5px 8px', color: '#555', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textAlign: 'left', transition: 'all 0.1s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#de7356'; e.currentTarget.style.borderColor = '#de735655'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >↓ Charger les patterns par style</button>
                </div>
            )}
            {loadingStyles && <div style={{ padding: '6px 12px', fontSize: '11px', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>Chargement...</div>}
            {Object.entries(byCategory(styleSnippets)).sort(([a], [b]) => a.localeCompare(b)).map(([cat, snips]) => (
                <CategoryGroup key={cat} title={cat} snippets={snips} collapsed={collapsedStyleCategories.has(cat)} onToggle={() => toggleSet(setCollapsedStyleCategories, cat)} onInsert={onInsert} color="#de7356" />
            ))}

            {/* Remote / officiel */}
            <div style={{ padding: '4px 12px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '9px', color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Strudel officiel</span>
                {remoteSnippets.length > 0 && (
                    <button onClick={onFetchRemote} disabled={loadingRemote} title="Rafraîchir"
                        style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '12px', padding: '0 2px', lineHeight: 1 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
                    >↻</button>
                )}
            </div>
            {remoteSnippets.length === 0 && !loadingRemote && (
                <div style={{ padding: '0 8px 8px' }}>
                    <button onClick={onFetchRemote}
                        style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '5px 8px', color: '#555', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textAlign: 'left', transition: 'all 0.1s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#27c93f'; e.currentTarget.style.borderColor = '#27c93f55'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >↓ Charger les exemples officiels</button>
                </div>
            )}
            {loadingRemote && <div style={{ padding: '6px 12px', fontSize: '11px', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>Chargement...</div>}
            {Object.entries(byCategory(remoteSnippets)).map(([cat, snips]) => (
                <CategoryGroup key={cat} title={cat} snippets={snips} collapsed={collapsedRemoteCategories.has(cat)} onToggle={() => toggleSet(setCollapsedRemoteCategories, cat)} onInsert={onInsert} color="#666" />
            ))}
        </div>
    );
}
