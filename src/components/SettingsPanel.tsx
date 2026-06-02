import type { ReactNode } from 'react';
import type { EditorSettings } from '../hooks/useSettings';

type SettingsPanelProps = {
    settings: EditorSettings;
    onUpdate: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
    onClose: () => void;
};

const FONT_FAMILIES = [
    'JetBrains Mono',
    'Fira Code',
    'Source Code Pro',
    'Courier New',
    'monospace',
];

export function SettingsPanel({ settings, onUpdate, onClose }: SettingsPanelProps) {
    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.55)',
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '20px 24px',
                    width: '360px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    color: '#aaa',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <span style={{ fontSize: '13px', color: '#ccc' }}>Editor Settings</span>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: 0 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                    >
                        ×
                    </button>
                </div>

                <Row label="Font Size">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="range" min={10} max={24} value={settings.fontSize}
                            onChange={(e) => onUpdate('fontSize', parseInt(e.target.value))}
                            style={{ flex: 1, accentColor: 'var(--accent)' }}
                        />
                        <span style={{ width: 32, textAlign: 'right', color: 'var(--accent)' }}>
                            {settings.fontSize}px
                        </span>
                    </div>
                </Row>

                <Row label="Font Family">
                    <select
                        value={settings.fontFamily}
                        onChange={(e) => onUpdate('fontFamily', e.target.value)}
                        style={{
                            background: 'var(--bg-0)', border: '1px solid var(--border)',
                            borderRadius: '4px', color: '#aaa',
                            padding: '4px 6px', fontFamily: 'inherit', fontSize: '11px', width: '100%',
                        }}
                    >
                        {FONT_FAMILIES.map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </Row>

                <Toggle label="Line Numbers" value={settings.lineNumbers} onToggle={(v) => onUpdate('lineNumbers', v)} />
                <Toggle label="Line Wrapping" value={settings.lineWrapping} onToggle={(v) => onUpdate('lineWrapping', v)} />
                <Toggle label="Bracket Matching" value={settings.bracketMatching} onToggle={(v) => onUpdate('bracketMatching', v)} />
                <Toggle label="Bracket Closing" value={settings.bracketClosing} onToggle={(v) => onUpdate('bracketClosing', v)} />
                <Toggle label="Tab Indentation" value={settings.tabIndentation} onToggle={(v) => onUpdate('tabIndentation', v)} />
                <Toggle label="Vim Mode" value={settings.vimMode} onToggle={(v) => onUpdate('vimMode', v)} />

                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', color: '#444', fontSize: '10px' }}>
                    Cmd+/ toggle comment · Cmd+F search · Cmd+↑/↓ eval history
                </div>
            </div>
        </div>
    );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '12px', gap: '12px',
        }}>
            <span style={{ color: '#666', whiteSpace: 'nowrap', flexShrink: 0, width: 120 }}>{label}</span>
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
}

function Toggle({ label, value, onToggle }: { label: string; value: boolean; onToggle: (v: boolean) => void }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '12px', gap: '12px',
        }}>
            <span style={{ color: '#666', whiteSpace: 'nowrap', flexShrink: 0, width: 120 }}>{label}</span>
            <button
                onClick={() => onToggle(!value)}
                style={{
                    flex: 1,
                    background: value ? 'var(--accent-bg)' : 'var(--bg-0)',
                    border: `1px solid ${value ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '4px',
                    padding: '4px 10px',
                    color: value ? 'var(--accent)' : '#555',
                    cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    transition: 'all 0.12s',
                    textAlign: 'center',
                }}
            >
                {value ? 'on' : 'off'}
            </button>
        </div>
    );
}
