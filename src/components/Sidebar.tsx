import { ResizeHandle } from './ResizeHandle';
import { SamplesPanel } from './SamplesPanel';
import { SnippetsPanel } from './SnippetsPanel';
import { useSamples } from '../hooks/useSamples';
import { useSnippets } from '../hooks/useSnippets';
import { RefObject } from 'react';
import { EditorHandle } from '../Editor';

type SidebarProps = {
    open: boolean;
    width: number;
    onResizeStart: (e: React.MouseEvent) => void;
    tab: 'samples' | 'snippets';
    onTabChange: (t: 'samples' | 'snippets') => void;
    samples: ReturnType<typeof useSamples>;
    snippets: ReturnType<typeof useSnippets>;
    editorRef: RefObject<EditorHandle | null>;
};

export function Sidebar({ open, width, onResizeStart, tab, onTabChange, samples, snippets, editorRef }: SidebarProps) {
    return (
        <>
            <div
                style={{
                    width: open ? width : 0, background: 'var(--bg-0)',
                    borderRight: open ? '1px solid var(--border)' : 'none',
                    overflow: 'hidden', flexShrink: 0, transition: 'width 0.2s ease',
                }}
            >
                <div style={{ width, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                        {(['samples', 'snippets'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => onTabChange(t)}
                                style={{
                                    flex: 1, background: 'transparent', border: 'none',
                                    borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
                                    padding: '6px 0', color: tab === t ? 'var(--accent)' : '#444',
                                    fontSize: '9px', fontFamily: "'JetBrains Mono', monospace",
                                    letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.1s',
                                }}
                                onMouseEnter={(e) => { if (tab !== t) e.currentTarget.style.color = '#888'; }}
                                onMouseLeave={(e) => { if (tab !== t) e.currentTarget.style.color = '#444'; }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {tab === 'samples' && (
                        <SamplesPanel
                            loadedSamples={samples.loadedSamples}
                            sampleSearch={samples.sampleSearch}
                            setSampleSearch={samples.setSampleSearch}
                            collapsedFolders={samples.collapsedFolders}
                            setCollapsedFolders={samples.setCollapsedFolders}
                            playingPreview={samples.playingPreview}
                            onPreview={samples.playPreview}
                            onInsert={(code) => editorRef.current?.insertAtCursor(code)}
                        />
                    )}

                    {tab === 'snippets' && (
                        <SnippetsPanel
                            userSnippets={snippets.userSnippets}
                            savingSnippet={snippets.savingSnippet}
                            setSavingSnippet={snippets.setSavingSnippet}
                            snippetName={snippets.snippetName}
                            setSnippetName={snippets.setSnippetName}
                            snippetSearch={snippets.snippetSearch}
                            setSnippetSearch={snippets.setSnippetSearch}
                            remoteSnippets={snippets.remoteSnippets}
                            loadingRemote={snippets.loadingRemote}
                            collapsedRemoteCategories={snippets.collapsedRemoteCategories}
                            setCollapsedRemoteCategories={snippets.setCollapsedRemoteCategories}
                            styleSnippets={snippets.styleSnippets}
                            loadingStyles={snippets.loadingStyles}
                            collapsedStyleCategories={snippets.collapsedStyleCategories}
                            setCollapsedStyleCategories={snippets.setCollapsedStyleCategories}
                            onStartSave={snippets.startSaveSnippet}
                            onConfirmSave={snippets.confirmSaveSnippet}
                            onDelete={snippets.deleteSnippet}
                            onFetchRemote={snippets.fetchRemoteSnippets}
                            onFetchStyles={snippets.fetchStyleSnippets}
                            onInsert={(code) => editorRef.current?.insertAtCursor(code)}
                        />
                    )}
                </div>
            </div>
            {open && <ResizeHandle onMouseDown={onResizeStart} />}
        </>
    );
}
