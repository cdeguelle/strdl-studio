import { useState } from 'react';
import type { MidiState } from '../hooks/useMidi';

type IoPanelProps = {
    midi: MidiState;
    onInsert: (code: string) => void;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: "'JetBrains Mono', monospace" }}>
                {title}
            </p>
            {children}
        </div>
    );
}

function StatusDot({ ok }: { ok: boolean }) {
    return (
        <span
            style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: ok ? '#27c93f' : '#333',
                marginRight: 6,
                flexShrink: 0,
            }}
        />
    );
}

export function IoPanel({ midi, onInsert }: IoPanelProps) {
    const [oscStatus, setOscStatus] = useState<'idle' | 'ok' | 'error'>('idle');

    const checkOsc = () => {
        setOscStatus('idle');
        try {
            const ws = new WebSocket('ws://localhost:8080');
            const t = setTimeout(() => { setOscStatus('error'); ws.close(); }, 2000);
            ws.addEventListener('open', () => { clearTimeout(t); setOscStatus('ok'); ws.close(); });
            ws.addEventListener('error', () => { clearTimeout(t); setOscStatus('error'); });
        } catch {
            setOscStatus('error');
        }
    };

    const midiOk = midi.status === 'enabled';
    const outputSnippet = (name: string) => `note("c3 e3 g3").midi("${name}")`;
    const inputSnippet = (name: string) => `midin("${name}").note()`;

    return (
        <div
            style={{
                flex: 1,
                overflowY: 'auto',
                padding: '10px',
                fontSize: '11px',
                fontFamily: "'JetBrains Mono', monospace",
            }}
        >
            {/* MIDI */}
            <Section title="MIDI">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <StatusDot ok={midiOk} />
                    <span style={{ color: midiOk ? '#27c93f' : '#555', fontSize: '10px' }}>
                        {midi.status === 'idle' && 'initializing…'}
                        {midi.status === 'enabled' && 'enabled'}
                        {midi.status === 'error' && `error: ${midi.error}`}
                        {midi.status === 'unsupported' && 'not supported'}
                    </span>
                </div>

                {midiOk && (
                    <>
                        <p style={{ color: '#444', fontSize: '9px', margin: '0 0 4px' }}>OUTPUTS</p>
                        <div style={{ marginBottom: '8px' }}>
                            {midi.outputs.length === 0 ? (
                                <p style={{ color: '#333', fontSize: '10px', margin: 0, fontStyle: 'italic' }}>none connected</p>
                            ) : (
                                midi.outputs.map((name) => (
                                    <div
                                        key={name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '3px 6px',
                                            background: 'var(--bg-1)',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            marginBottom: '2px',
                                        }}
                                        title={`Insert snippet for "${name}"`}
                                        onClick={() => onInsert(outputSnippet(name))}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-1)')}
                                    >
                                        <span style={{ fontSize: '10px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {name}
                                        </span>
                                        <span style={{ fontSize: '9px', color: '#444', flexShrink: 0, marginLeft: 4 }}>insert</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <p style={{ color: '#444', fontSize: '9px', margin: '0 0 4px' }}>INPUTS</p>
                        <div>
                            {midi.inputs.length === 0 ? (
                                <p style={{ color: '#333', fontSize: '10px', margin: 0, fontStyle: 'italic' }}>none connected</p>
                            ) : (
                                midi.inputs.map((name) => (
                                    <div
                                        key={name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '3px 6px',
                                            background: 'var(--bg-1)',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            marginBottom: '2px',
                                        }}
                                        title={`Insert snippet for "${name}"`}
                                        onClick={() => onInsert(inputSnippet(name))}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-1)')}
                                    >
                                        <span style={{ fontSize: '10px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {name}
                                        </span>
                                        <span style={{ fontSize: '9px', color: '#444', flexShrink: 0, marginLeft: 4 }}>insert</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </Section>

            {/* OSC */}
            <Section title="OSC → SuperCollider">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <StatusDot ok={oscStatus === 'ok'} />
                    <span style={{ color: oscStatus === 'ok' ? '#27c93f' : oscStatus === 'error' ? '#ef4444' : '#555', fontSize: '10px', flex: 1 }}>
                        {oscStatus === 'idle' && 'ws://localhost:8080'}
                        {oscStatus === 'ok' && 'bridge connected'}
                        {oscStatus === 'error' && 'bridge not running'}
                    </span>
                    <button
                        onClick={checkOsc}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            borderRadius: '3px',
                            padding: '2px 6px',
                            color: '#555',
                            cursor: 'pointer',
                            fontSize: '9px',
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                    >
                        ping
                    </button>
                </div>
                <div
                    style={{
                        background: 'var(--bg-1)',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        fontSize: '10px',
                        color: '#444',
                        lineHeight: 1.6,
                    }}
                >
                    <span style={{ color: '#555' }}>Start bridge:</span>
                    <br />
                    <span style={{ color: 'var(--accent)', userSelect: 'all' }}>
                        node node_modules/@strudel/osc/server.js
                    </span>
                    <br />
                    <span style={{ color: '#333' }}>Then use </span>
                    <span style={{ color: '#888' }}>{'note("c3").osc()'}</span>
                    <span style={{ color: '#333' }}> in your pattern.</span>
                </div>
            </Section>

            {/* MQTT */}
            <Section title="MQTT">
                <div
                    style={{
                        background: 'var(--bg-1)',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        fontSize: '10px',
                        color: '#444',
                        lineHeight: 1.6,
                    }}
                >
                    <span style={{ color: '#888' }}>{'note("c3").mqtt(user, pass, "topic")'}</span>
                    <br />
                    <span style={{ color: '#333' }}>Connects to MQTT broker over WSS.</span>
                    <br />
                    <span style={{ color: '#333' }}>Default host: </span>
                    <span style={{ color: '#555' }}>wss://localhost:8883/</span>
                </div>
            </Section>
        </div>
    );
}
