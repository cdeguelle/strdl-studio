import { Plus, X, Activity, BarChart2, AlignJustify, Disc3, Grip } from 'lucide-react';
import { Tab, VisualizerMode } from '../types';

type TabBarProps = {
    tabs: Tab[];
    activeTabIdx: number;
    isDirty: boolean;
    onSwitch: (idx: number) => void;
    onClose: (idx: number) => void;
    onNew: () => void;
    selectedVisualizer: VisualizerMode;
    onSetVisualizer: (v: VisualizerMode) => void;
};

const VISUALIZER_BUTTONS: { key: VisualizerMode; content: React.ReactNode; title: string }[] = [
    { key: 'none', content: <span style={{ fontSize: '10px', lineHeight: 1 }}>—</span>, title: 'Pas de visualiseur' },
    { key: 'scope', content: <Activity size={12} />, title: 'Scope (oscilloscope)' },
    { key: 'spectrum', content: <BarChart2 size={12} />, title: 'Spectrum (fréquences)' },
    { key: 'pianoroll', content: <AlignJustify size={12} />, title: 'Piano roll' },
    { key: 'punchcard', content: <Grip size={12} />, title: 'Punch card (grille)' },
    { key: 'spiral', content: <Disc3 size={12} />, title: 'Spiral' },
];

export function TabBar({ tabs, activeTabIdx, isDirty, onSwitch, onClose, onNew, selectedVisualizer, onSetVisualizer }: TabBarProps) {
    return (
        <div
            style={{
                height: '32px', background: 'var(--bg-1)', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'stretch', flexShrink: 0, overflowX: 'auto',
            }}
        >
            {tabs.map((tab, idx) => {
                const isActive = idx === activeTabIdx;
                const tabName = tab.path ? tab.path.split('/').pop()! : 'sans titre';
                const tabDirty = idx === activeTabIdx ? isDirty : tab.code !== tab.savedCode;
                return (
                    <div
                        key={tab.id}
                        className={`tab-item${isActive ? ' tab-active' : ''}`}
                        onClick={() => onSwitch(idx)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '0 8px 0 14px', borderRight: '1px solid var(--border)',
                            background: isActive ? 'var(--bg-2)' : 'transparent',
                            borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                            color: isActive ? '#ccc' : '#555', cursor: 'pointer',
                            fontSize: '12px', fontFamily: "'JetBrains Mono', monospace",
                            whiteSpace: 'nowrap', userSelect: 'none', transition: 'color 0.1s', minWidth: 0,
                        }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#999'; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#555'; }}
                    >
                        <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {tabName}
                        </span>
                        {tabDirty && <span style={{ color: 'var(--accent)', fontSize: '14px', lineHeight: 1 }}>•</span>}
                        <span
                            className="tab-close"
                            onClick={(e) => { e.stopPropagation(); onClose(idx); }}
                            title="Fermer (Cmd+W)"
                            style={{ color: '#666', cursor: 'pointer', padding: '2px', borderRadius: '2px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                        >
                            <X size={11} />
                        </span>
                    </div>
                );
            })}
            <button
                onClick={onNew}
                title="Nouvel onglet (Cmd+T)"
                style={{ background: 'transparent', border: 'none', padding: '0 10px', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
            >
                <Plus size={13} />
            </button>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px', padding: '0 8px', borderLeft: '1px solid var(--border)', flexShrink: 0 }}>
                {VISUALIZER_BUTTONS.map(({ key, content, title }) => {
                    const active = selectedVisualizer === key;
                    return (
                        <button
                            key={key}
                            onClick={() => onSetVisualizer(key)}
                            title={title}
                            style={{
                                background: active ? 'var(--accent-bg)' : 'transparent',
                                border: `1px solid ${active ? 'var(--accent-dim)' : 'transparent'}`,
                                borderRadius: '3px', padding: '3px 6px', height: '22px',
                                color: active ? 'var(--accent)' : '#444', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', transition: 'all 0.1s',
                            }}
                            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#888'; }}
                            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#444'; }}
                        >
                            {content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
