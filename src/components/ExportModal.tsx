type ExportModalProps = {
    cps: number;
    exportCycles: number;
    setExportCycles: (n: number) => void;
    onExport: () => void;
    onClose: () => void;
};

export function ExportModal({ cps, exportCycles, setExportCycles, onExport, onClose }: ExportModalProps) {
    return (
        <div
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                <span style={{ color: '#aaa', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}>Durée de l'export</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[4, 8, 16, 32, 64].map((cycles) => {
                        const secs = (cycles / cps).toFixed(1);
                        const selected = exportCycles === cycles;
                        return (
                            <button
                                key={cycles}
                                onClick={() => setExportCycles(cycles)}
                                style={{
                                    background: selected ? 'var(--accent-bg)' : 'transparent',
                                    border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                                    borderRadius: '4px', padding: '8px 12px',
                                    color: selected ? 'var(--accent)' : '#666', cursor: 'pointer',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', transition: 'all 0.1s',
                                }}
                                onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = '#555'; }}
                                onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--border)'; }}
                            >
                                <span>{cycles} cycles</span>
                                <span style={{ color: '#444', fontSize: '11px' }}>{secs}s</span>
                            </button>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '7px 14px', color: '#555', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>Annuler</button>
                    <button onClick={onExport} style={{ background: 'var(--accent)', border: 'none', borderRadius: '4px', padding: '7px 14px', color: 'white', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>Exporter</button>
                </div>
            </div>
        </div>
    );
}
