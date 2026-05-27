import { useState } from 'react';
import { FolderOpen, Save, Square, Music, PanelLeft, Play, Download, Layers, Palette } from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';
import type { Theme } from '../themes';

type ToolbarProps = {
    isPlaying: boolean;
    bpm: number;
    filename: string;
    isDirty: boolean;
    onToggleSidebar: () => void;
    hydraOpen: boolean;
    onToggleHydra: () => void;
    recentSessions: string[];
    recentMenuOpen: boolean;
    setRecentMenuOpen: (v: boolean) => void;
    onLoadSession: (content: string, path: string) => Promise<void>;
    onPlay: () => void;
    onStop: () => void;
    onOpen: () => void;
    onSave: () => void;
    onLoadSamples: () => void;
    onExport: () => void;
    theme: Theme;
    themes: Theme[];
    onSetTheme: (id: string) => void;
};

export function Toolbar({
    isPlaying, bpm, filename, isDirty,
    onToggleSidebar,
    hydraOpen, onToggleHydra,
    recentSessions, recentMenuOpen, setRecentMenuOpen, onLoadSession,
    onPlay, onStop, onOpen, onSave, onLoadSamples, onExport,
    theme, themes, onSetTheme,
}: ToolbarProps) {
    const [themeOpen, setThemeOpen] = useState(false);

    const iconBtn = (style?: React.CSSProperties) => ({
        background: 'transparent', border: 'none', borderRadius: '4px',
        padding: '6px 8px', color: '#555', cursor: 'pointer',
        display: 'flex', alignItems: 'center', transition: 'color 0.15s',
        ...style,
    });

    return (
        <div
            style={{
                height: '40px', background: 'var(--bg-1)', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 12px', flexShrink: 0,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={onToggleSidebar}
                    title="Toggle Sidebar"
                    style={iconBtn()}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                >
                    <PanelLeft size={15} />
                </button>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: isPlaying ? '#27c93f' : '#333', transition: 'background 0.2s', animation: isPlaying ? 'pulse 1s infinite' : 'none' }} />
                <span
                    title="Tempo global (utilisez setcps() pour le modifier)"
                    style={{ fontSize: '11px', color: isPlaying ? '#27c93f' : '#333', fontFamily: "'JetBrains Mono', monospace", cursor: 'default' }}
                >
                    {bpm} BPM
                </span>
                <span style={{ color: '#444' }}> | </span>
                <div style={{ position: 'relative' }}>
                    <span
                        onClick={(e) => { e.stopPropagation(); setRecentMenuOpen(!recentMenuOpen); }}
                        style={{ fontSize: '13px', color: '#DE7356', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em', cursor: 'pointer' }}
                    >
                        {filename}
                    </span>
                    {isDirty && <span style={{ color: 'var(--accent)', fontSize: '16px', marginLeft: '4px' }}>*</span>}
                    {recentMenuOpen && recentSessions.length > 0 && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '6px', minWidth: '280px', zIndex: 100, overflow: 'hidden' }}>
                            {recentSessions.map((path) => (
                                <div
                                    key={path}
                                    onClick={async () => {
                                        const content = await invoke<string>('read_session', { path });
                                        await onLoadSession(content, path);
                                        setRecentMenuOpen(false);
                                    }}
                                    style={{ padding: '8px 12px', fontSize: '12px', color: '#666', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
                                >
                                    {path.split('/').pop()}
                                    <span style={{ color: '#333', fontSize: '10px', marginLeft: '8px' }}>{path.split('/').slice(-3, -1).join('/')}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                {/* Theme picker */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); setThemeOpen((o) => !o); }}
                        title="Changer de thème"
                        style={{
                            background: themeOpen ? 'var(--accent-bg)' : 'transparent',
                            border: `1px solid ${themeOpen ? 'var(--accent)' : 'transparent'}`,
                            borderRadius: '4px', padding: '5px 8px',
                            color: themeOpen ? 'var(--accent)' : '#555',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => { if (!themeOpen) e.currentTarget.style.color = '#aaa'; }}
                        onMouseLeave={(e) => { if (!themeOpen) e.currentTarget.style.color = '#555'; }}
                    >
                        <Palette size={15} />
                    </button>
                    {themeOpen && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'absolute', top: '100%', right: 0, marginTop: '6px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '120px' }}
                        >
                            {themes.map((t) => {
                                const active = t.id === theme.id;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => { onSetTheme(t.id); setThemeOpen(false); }}
                                        style={{
                                            background: active ? 'var(--accent-bg)' : 'transparent',
                                            border: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
                                            borderRadius: '4px', padding: '5px 8px',
                                            color: active ? 'var(--accent)' : '#666',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                            fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', transition: 'all 0.1s',
                                            textAlign: 'left',
                                        }}
                                        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.background = 'var(--bg-hover)'; } }}
                                        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = '#666'; e.currentTarget.style.background = 'transparent'; } }}
                                    >
                                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent, flexShrink: 0, display: 'inline-block' }} />
                                        {t.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                <button
                    onClick={onToggleHydra}
                    title="Éditeur Hydra (visuels)"
                    style={{
                        background: hydraOpen ? 'var(--accent-bg)' : 'transparent',
                        border: `1px solid ${hydraOpen ? 'var(--accent-dim)' : 'transparent'}`,
                        borderRadius: '4px', padding: '5px 8px',
                        color: hydraOpen ? 'var(--accent)' : '#555',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { if (!hydraOpen) e.currentTarget.style.color = '#aaa'; }}
                    onMouseLeave={(e) => { if (!hydraOpen) e.currentTarget.style.color = '#555'; }}
                >
                    <Layers size={15} />
                </button>
                <button
                    onClick={isPlaying ? onStop : onPlay}
                    title={isPlaying ? 'Stop' : 'Play (Ctrl+Enter)'}
                    style={{ background: isPlaying ? '#ef4444' : 'var(--accent)', border: 'none', borderRadius: '4px', padding: '5px 12px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', transition: 'background 0.15s' }}
                >
                    {isPlaying ? <Square size={13} /> : <Play size={13} />}
                </button>
                {([
                    { icon: <FolderOpen size={15} />, onClick: onOpen, title: 'Open (Cmd+O)' },
                    { icon: <Save size={15} />, onClick: onSave, title: 'Save (Cmd+S)' },
                    { icon: <Music size={15} />, onClick: onLoadSamples, title: 'Load Samples' },
                    { icon: <Download size={15} />, onClick: onExport, title: 'Export Audio' },
                ] as const).map(({ icon, onClick, title }) => (
                    <button
                        key={title}
                        onClick={onClick}
                        title={title}
                        style={iconBtn()}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                    >
                        {icon}
                    </button>
                ))}
            </div>
        </div>
    );
}
