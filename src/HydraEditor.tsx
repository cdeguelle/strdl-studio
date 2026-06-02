import { useState, useRef, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export const DEFAULT_HYDRA_CODE = `osc(60, 0.1, 1.4)
  .rotate(0.5, 0.1)
  .color(1.2, 0.8, 0.9)
  .out()`;

export type HydraTemplate = { id: string; name: string; code: string };

export const BUILTIN_HYDRA: HydraTemplate[] = [
    { id: 'bh1', name: 'Oscillator', code: `osc(60, 0.1, 1.4)\n  .rotate(0.5, 0.1)\n  .color(1.2, 0.8, 0.9)\n  .out()` },
    { id: 'bh2', name: 'Kaleidoscope', code: `osc(10, 0.1, 1)\n  .kaleid(5)\n  .rotate(0, 0.05)\n  .color(0.9, 0.7, 1)\n  .out()` },
    { id: 'bh3', name: 'Voronoi', code: `voronoi(5, 0.3, 0.3)\n  .colorama(0.1)\n  .rotate(0, 0.02)\n  .out()` },
    { id: 'bh4', name: 'Noise gradient', code: `noise(3, 0.2)\n  .colorama(0.5)\n  .out()` },
    { id: 'bh5', name: 'Feedback loop', code: `src(o0).rotate(0.01, 0.001).scale(0.99).out(o0)\nnoise(3).blend(o0, 0.9).out()` },
    { id: 'bh6', name: 'Gradient pulse', code: `gradient(0.02)\n  .mult(osc(20, 0.05, 0.9))\n  .out()` },
    { id: 'bh7', name: 'Audio reactive (scope)', code: `// Active le scope dans Strudel pour alimenter s0 et a.fft\nosc(() => a.fft[0] * 20 + 5, 0.1, 1)\n  .kaleid(() => Math.floor(a.fft[2] * 8) + 3)\n  .color(() => a.fft[1] + 0.5, 0.5, () => a.fft[3] + 0.5)\n  .rotate(() => time * 0.2)\n  .out()` },
    { id: 'bh8', name: 'Scope → Hydra (s0)', code: `// Active le scope dans Strudel d'abord\nsrc(s0)\n  .kaleid(6)\n  .rotate(() => time * 0.05)\n  .out()` },
    { id: 'bh9', name: 'Pattern H (Strudel → Hydra)', code: `// H(pattern) renvoie une fn animée au tempo Strudel\n// Les valeurs cyclent en sync avec le scheduler\nosc(H("30 60 90"), 0.1, 1)\n  .rotate(H("0 0.5 1"))\n  .color(H("0.9 0.4 0.7"), H("0.3 0.8 0.5"), 0.8)\n  .out()` },
];

// Custom theme overrides on top of oneDark
const hydraTheme = EditorView.theme({
    '&': {
        background: 'var(--bg-0a)',
        height: '100%',
    },
    '&.cm-focused': { outline: 'none' },
    '.cm-scroller': {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        lineHeight: '1.7',
        overflow: 'auto',
    },
    '.cm-content': { padding: '14px', caretColor: 'var(--accent)' },
    '.cm-cursor': { borderLeftColor: 'var(--accent)' },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        background: 'var(--accent-dim) !important',
    },
    '.cm-activeLine': { backgroundColor: 'var(--accent-bg)' },
    '.cm-gutters': { display: 'none' },
    '.cm-panels': { background: 'transparent' },
}, { dark: true });

type HydraEditorProps = {
    running: boolean;
    onEval: (code: string) => void;
    templates: HydraTemplate[];
    onSaveTemplate: (name: string, code: string) => void;
    onDeleteTemplate: (id: string) => void;
    hydraOpacity: number;
    onOpacityChange: (v: number) => void;
    detectAudio: boolean;
    onToggleDetectAudio: () => void;
};

export type HydraEditorHandle = {
    getCode: () => string;
    setCode: (code: string) => void;
};

export const HydraEditor = forwardRef<HydraEditorHandle, HydraEditorProps>(
    ({ running, onEval, templates, onSaveTemplate, onDeleteTemplate, hydraOpacity, onOpacityChange, detectAudio, onToggleDetectAudio }, ref) => {
        const [savingTemplate, setSavingTemplate] = useState(false);
        const [templateName, setTemplateName] = useState('');
        const containerRef = useRef<HTMLDivElement>(null);
        const viewRef = useRef<EditorView | null>(null);
        // Keep a ref to onEval to avoid stale closures inside the CM6 keymap
        const onEvalRef = useRef(onEval);
        useEffect(() => { onEvalRef.current = onEval; }, [onEval]);

        useImperativeHandle(ref, () => ({
            getCode: () => viewRef.current?.state.doc.toString() ?? '',
            setCode: (c) => {
                const view = viewRef.current;
                if (!view) return;
                view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: c } });
            },
        }));

        useEffect(() => {
            if (!containerRef.current) return;
            const view = new EditorView({
                state: EditorState.create({
                    doc: DEFAULT_HYDRA_CODE,
                    extensions: [
                        oneDark,
                        hydraTheme,
                        javascript(),
                        keymap.of([
                            {
                                key: 'Tab',
                                run: (v) => { v.dispatch(v.state.replaceSelection('  ')); return true; },
                            },
                            {
                                key: 'Mod-Enter',
                                run: (v) => { onEvalRef.current(v.state.doc.toString()); return true; },
                            },
                        ]),
                    ],
                }),
                parent: containerRef.current,
            });
            viewRef.current = view;
            return () => { view.destroy(); viewRef.current = null; };
        }, []);

        const confirmSave = useCallback(() => {
            if (!templateName.trim()) return;
            const code = viewRef.current?.state.doc.toString() ?? '';
            onSaveTemplate(templateName.trim(), code);
            setSavingTemplate(false);
            setTemplateName('');
        }, [templateName, onSaveTemplate]);

        const allTemplates = [...BUILTIN_HYDRA, ...templates];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid var(--border)' }}>
                {/* Toolbar */}
                <div
                    style={{
                        height: '32px', background: 'var(--bg-1a)', borderBottom: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: running ? 'var(--accent)' : '#333',
                            transition: 'background 0.3s',
                            animation: running ? 'pulse 1s infinite' : 'none',
                            flexShrink: 0,
                        }}
                    />
                    <span style={{ fontSize: '9px', color: running ? 'var(--accent)' : '#444', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.2s' }}>
                        Hydra
                    </span>
                    {running && (
                        <span style={{ fontSize: '9px', color: '#555', fontFamily: "'JetBrains Mono', monospace" }}>
                            Cmd+↵ pour mettre à jour
                        </span>
                    )}
                    <div style={{ flex: 1 }} />
                    {/* Opacity slider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                            type="range"
                            min={0} max={1} step={0.05}
                            value={hydraOpacity}
                            onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
                            title={`Opacité Hydra: ${Math.round(hydraOpacity * 100)}%`}
                            style={{ width: '56px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                        />
                        <span style={{ fontSize: '9px', color: '#444', fontFamily: "'JetBrains Mono', monospace", width: '26px', textAlign: 'right', flexShrink: 0 }}>
                            {Math.round(hydraOpacity * 100)}%
                        </span>
                    </div>
                    {/* Audio mode toggle */}
                    <button
                        onClick={onToggleDetectAudio}
                        title={detectAudio ? 'Audio: Web Audio API (live) — cliquer pour basculer en FFT canvas' : 'Audio: FFT canvas (scope) — cliquer pour activer le microphone/Web Audio'}
                        style={{
                            background: detectAudio ? 'var(--accent-bg)' : 'transparent',
                            border: `1px solid ${detectAudio ? 'var(--accent-dim)' : 'transparent'}`,
                            borderRadius: '3px',
                            padding: '2px 5px',
                            color: detectAudio ? 'var(--accent)' : '#444',
                            cursor: 'pointer',
                            fontSize: '8px',
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => { if (!detectAudio) e.currentTarget.style.color = '#aaa'; }}
                        onMouseLeave={(e) => { if (!detectAudio) e.currentTarget.style.color = '#444'; }}
                    >
                        {detectAudio ? 'live' : 'fft'}
                    </button>
                    {!savingTemplate ? (
                        <button
                            onClick={() => setSavingTemplate(true)}
                            title="Sauvegarder comme template"
                            style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '3px', padding: '3px 6px', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.1s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-dim)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                            <Save size={11} />
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <input
                                autoFocus type="text" placeholder="Nom..." value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') confirmSave(); if (e.key === 'Escape') setSavingTemplate(false); }}
                                style={{ background: 'var(--bg-0)', border: '1px solid var(--accent-dim)', borderRadius: '3px', padding: '2px 6px', fontSize: '10px', color: '#aaa', fontFamily: "'JetBrains Mono', monospace", outline: 'none', width: '100px' }}
                            />
                            <button onClick={confirmSave} style={{ background: 'var(--accent)', border: 'none', borderRadius: '3px', padding: '3px 6px', color: 'white', cursor: 'pointer', fontSize: '10px' }}>✓</button>
                            <button onClick={() => setSavingTemplate(false)} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '3px', padding: '3px 6px', color: '#555', cursor: 'pointer', fontSize: '10px' }}>✕</button>
                        </div>
                    )}
                </div>

                {/* CodeMirror editor */}
                <div ref={containerRef} style={{ flex: 1, minHeight: 0, overflow: 'hidden' }} />

                {/* Templates */}
                <div style={{ maxHeight: '200px', overflowY: 'auto', borderTop: '1px solid var(--border)', background: 'var(--bg-2a)', flexShrink: 0 }}>
                    <div style={{ padding: '5px 12px 3px', fontSize: '9px', color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Templates
                    </div>
                    {allTemplates.map((t) => {
                        const isBuiltin = t.id.startsWith('bh');
                        return (
                            <div
                                key={t.id}
                                style={{ padding: '4px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '6px' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; const btn = e.currentTarget.querySelector('.tmpl-del') as HTMLElement; if (btn) btn.style.opacity = '1'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; const btn = e.currentTarget.querySelector('.tmpl-del') as HTMLElement; if (btn) btn.style.opacity = '0'; }}
                            >
                                <div
                                    style={{ flex: 1, minWidth: 0 }}
                                    onClick={() => {
                                        const view = viewRef.current;
                                        if (!view) return;
                                        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: t.code } });
                                    }}
                                >
                                    <div style={{ fontSize: '11px', color: isBuiltin ? '#888' : 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {t.name}
                                    </div>
                                </div>
                                {!isBuiltin && (
                                    <span
                                        className="tmpl-del"
                                        onClick={(e) => { e.stopPropagation(); onDeleteTemplate(t.id); }}
                                        style={{ opacity: 0, color: '#555', cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.1s', display: 'flex', alignItems: 'center' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                                    >
                                        <X size={11} />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
);
