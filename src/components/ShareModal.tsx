import { useState, useRef } from 'react';
import { buildShareUrl, extractCodeFromUrl } from '../utils/share';

type ShareModalProps = {
    code: string;
    onLoad: (code: string) => void;
    onClose: () => void;
};

export function ShareModal({ code, onLoad, onClose }: ShareModalProps) {
    const shareUrl = buildShareUrl(code);
    const [copied, setCopied] = useState(false);
    const [importUrl, setImportUrl] = useState('');
    const [importError, setImportError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            inputRef.current?.select();
        }
    };

    const handleImport = () => {
        const extracted = extractCodeFromUrl(importUrl.trim());
        if (extracted) {
            onLoad(extracted);
            onClose();
        } else {
            setImportError('URL invalide ou format non reconnu');
            setTimeout(() => setImportError(''), 3000);
        }
    };

    const label = (text: string) => (
        <p style={{ fontSize: '9px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: "'JetBrains Mono', monospace" }}>
            {text}
        </p>
    );

    const btn = (onClick: () => void, children: React.ReactNode, accent = false) => (
        <button
            onClick={onClick}
            style={{
                background: accent ? 'var(--accent)' : 'transparent',
                border: `1px solid ${accent ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                padding: '5px 10px',
                color: accent ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '11px',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.1s',
                flexShrink: 0,
            }}
            onMouseEnter={(e) => { if (!accent) e.currentTarget.style.color = '#aaa'; }}
            onMouseLeave={(e) => { if (!accent) e.currentTarget.style.color = '#666'; }}
        >
            {children}
        </button>
    );

    return (
        <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '20px',
                    width: '480px',
                    maxWidth: '90vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <p style={{ margin: 0, fontSize: '13px', color: '#aaa', fontFamily: "'JetBrains Mono', monospace" }}>
                    Partager le pattern
                </p>

                {/* Export section */}
                <div>
                    {label('URL strudel.cc')}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                            ref={inputRef}
                            readOnly
                            value={shareUrl}
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                            style={{
                                flex: 1,
                                background: 'var(--bg-0)',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                padding: '6px 8px',
                                fontSize: '10px',
                                color: '#666',
                                fontFamily: "'JetBrains Mono', monospace",
                                outline: 'none',
                                minWidth: 0,
                            }}
                        />
                        {btn(handleCopy, copied ? '✓ Copié' : 'Copier', copied)}
                    </div>
                    <p style={{ fontSize: '9px', color: '#333', margin: '4px 0 0', fontFamily: "'JetBrains Mono', monospace" }}>
                        Ouvre directement dans strudel.cc
                    </p>
                </div>

                {/* Import section */}
                <div>
                    {label('Importer depuis une URL')}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                            placeholder="https://strudel.cc/#?code=..."
                            value={importUrl}
                            onChange={(e) => { setImportUrl(e.target.value); setImportError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleImport()}
                            style={{
                                flex: 1,
                                background: 'var(--bg-0)',
                                border: `1px solid ${importError ? '#ef4444' : 'var(--border)'}`,
                                borderRadius: '4px',
                                padding: '6px 8px',
                                fontSize: '10px',
                                color: '#aaa',
                                fontFamily: "'JetBrains Mono', monospace",
                                outline: 'none',
                                minWidth: 0,
                            }}
                        />
                        {btn(handleImport, 'Charger', true)}
                    </div>
                    {importError && (
                        <p style={{ fontSize: '9px', color: '#ef4444', margin: '4px 0 0', fontFamily: "'JetBrains Mono', monospace" }}>
                            {importError}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {btn(onClose, 'Fermer')}
                </div>
            </div>
        </div>
    );
}
