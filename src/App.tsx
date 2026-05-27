import { useRef, useState, useEffect, useCallback } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Toaster, toast } from 'sonner';
import { Editor, EditorHandle } from './Editor';
import { HydraEditor, HydraEditorHandle } from './HydraEditor';
import { Toolbar } from './components/Toolbar';
import { TabBar } from './components/TabBar';
import { Sidebar } from './components/Sidebar';
import { ExportModal } from './components/ExportModal';
import { ResizeHandle } from './components/ResizeHandle';
import { useTabs } from './hooks/useTabs';
import { useSession } from './hooks/useSession';
import { usePlayback } from './hooks/usePlayback';
import { useVisualizer } from './hooks/useVisualizer';
import { useSamples } from './hooks/useSamples';
import { useSnippets } from './hooks/useSnippets';
import { useHydra } from './hooks/useHydra';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { useTheme } from './hooks/useTheme';
import { renderPatternAudioFixed } from './utils/audio';
import {
    setAudioContext,
    setSuperdoughAudioController,
    resetGlobalEffects,
} from '@strudel/webaudio';
import { SuperdoughAudioController } from 'superdough/superdoughoutput.mjs';
import './App.css';

function App() {
    const editorRef = useRef<EditorHandle>(null);
    const editorAreaRef = useRef<HTMLDivElement>(null);
    const hydraEditorRef = useRef<HydraEditorHandle>(null);

    const { tabs, activeTabIdx, tabsRef, activeTabIdxRef, applyTabs, switchTab, newTab, closeTab } =
        useTabs(editorRef);
    const {
        recentSessions,
        recentMenuOpen,
        setRecentMenuOpen,
        loadSession,
        handleOpen,
        handleSave,
    } = useSession(editorRef, tabsRef, activeTabIdxRef, applyTabs);
    const { isPlaying, bpm, isDirty } = usePlayback(editorRef, tabsRef, activeTabIdxRef);
    const { selectedVisualizer, setVisualizerMode } = useVisualizer(editorRef);
    const samples = useSamples(editorRef);
    const snippets = useSnippets(editorRef);
    const hydra = useHydra(editorRef, editorAreaRef);
    const { theme, setTheme, themes } = useTheme();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(200);
    const [sidebarTab, setSidebarTab] = useState<'samples' | 'snippets'>('samples');
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportCycles, setExportCycles] = useState(16);
    const isResizing = useRef(false);

    useCanvasSetup(editorAreaRef);

    const currentPath = tabs[activeTabIdx]?.path ?? null;
    const filename = currentPath ? currentPath.split('/').pop()! : 'session sans titre';

    // Keep Strudel editor syntax theme in sync with app theme
    useEffect(() => {
        editorRef.current?.setTheme(theme.strudelTheme);
    }, [theme]);

    // Window title
    useEffect(() => {
        const title = currentPath
            ? `strdl-studio — ${currentPath.split('/').pop()}${isDirty ? ' *' : ''}`
            : 'strdl-studio';
        getCurrentWindow().setTitle(title);
    }, [currentPath, isDirty]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const mod = e.metaKey || e.ctrlKey;
            if (mod && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
            if (mod && e.key === 'o') {
                e.preventDefault();
                handleOpen();
            }
            if (mod && e.key === 't') {
                e.preventDefault();
                newTab();
            }
            if (mod && e.key === 'w') {
                e.preventDefault();
                closeTab(activeTabIdxRef.current);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleOpen, handleSave, newTab, closeTab, activeTabIdxRef]);

    // Reload on audio device change
    useEffect(() => {
        const handleDeviceChange = async () => {
            if (editorRef.current?.isPlaying()) editorRef.current?.stop();
            window.location.reload();
        };
        navigator.mediaDevices?.addEventListener('devicechange', handleDeviceChange);
        return () =>
            navigator.mediaDevices?.removeEventListener('devicechange', handleDeviceChange);
    }, []);

    // Auto-run Hydra with Strudel play
    useEffect(() => {
        if (!hydra.hydraOpen) return;
        if (isPlaying) {
            hydra.runHydra(hydraEditorRef.current?.getCode() ?? '');
        } else {
            hydra.stopHydra();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, hydra.hydraOpen]);

    const handleSidebarResizeStart = (e: React.MouseEvent) => {
        isResizing.current = true;
        const startX = e.clientX;
        const startWidth = sidebarWidth;
        const onMouseMove = (ev: MouseEvent) => {
            if (!isResizing.current) return;
            setSidebarWidth(Math.max(120, Math.min(400, startWidth + ev.clientX - startX)));
        };
        const onMouseUp = () => {
            isResizing.current = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const handleExport = useCallback(async () => {
        const pattern = editorRef.current?.getPattern();
        const cps = editorRef.current?.getCps() ?? 0.5;
        if (!pattern) {
            toast.error("Aucun pattern à exporter — lance la lecture d'abord");
            return;
        }
        setShowExportModal(false);
        const wasPlaying = editorRef.current?.isPlaying() ?? false;
        if (wasPlaying) {
            editorRef.current?.stop();
            await new Promise((r) => setTimeout(r, 200));
        }
        toast.info('Export en cours...');
        const tab = tabsRef.current[activeTabIdxRef.current];
        const exportName = tab?.path?.split('/').pop()?.replace('.js', '') ?? 'export';
        try {
            await renderPatternAudioFixed(
                pattern,
                cps,
                0,
                exportCycles,
                44100,
                10,
                false,
                exportName,
            );
            toast.success('Export terminé !');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('silencieux')) {
                toast.error('Export silencieux — ouvre la console DevTools pour le diagnostic');
            } else {
                toast.error("Erreur lors de l'export");
            }
            console.error('[export]', err);
        } finally {
            setAudioContext(null as unknown as AudioContext);
            setSuperdoughAudioController(
                null as unknown as InstanceType<typeof SuperdoughAudioController>,
            );
            resetGlobalEffects();
            if (wasPlaying) setTimeout(() => editorRef.current?.play(), 300);
        }
    }, [exportCycles, tabsRef, activeTabIdxRef]);

    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'var(--bg-2)',
            }}
        >
            <Toolbar
                isPlaying={isPlaying}
                bpm={bpm}
                filename={filename}
                isDirty={isDirty}
                onToggleSidebar={() => setSidebarOpen((o) => !o)}
                hydraOpen={hydra.hydraOpen}
                onToggleHydra={() =>
                    hydra.hydraOpen ? hydra.closeHydraPanel() : hydra.setHydraOpen(true)
                }
                recentSessions={recentSessions}
                recentMenuOpen={recentMenuOpen}
                setRecentMenuOpen={setRecentMenuOpen}
                onLoadSession={loadSession}
                onPlay={() => editorRef.current?.play()}
                onStop={() => editorRef.current?.stop()}
                onOpen={handleOpen}
                onSave={handleSave}
                onLoadSamples={samples.handleLoadSamples}
                onExport={() => setShowExportModal(true)}
                theme={theme}
                themes={themes}
                onSetTheme={setTheme}
            />
            <TabBar
                tabs={tabs}
                activeTabIdx={activeTabIdx}
                isDirty={isDirty}
                onSwitch={switchTab}
                onClose={closeTab}
                onNew={newTab}
                selectedVisualizer={selectedVisualizer}
                onSetVisualizer={setVisualizerMode}
            />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
                <Sidebar
                    open={sidebarOpen}
                    width={sidebarWidth}
                    onResizeStart={handleSidebarResizeStart}
                    tab={sidebarTab}
                    onTabChange={setSidebarTab}
                    samples={samples}
                    snippets={snippets}
                    editorRef={editorRef}
                />
                <div
                    ref={editorAreaRef}
                    style={{
                        flex: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        minWidth: 0,
                        background: 'var(--bg-2)',
                    }}
                >
                    <Editor ref={editorRef} />
                </div>
                {hydra.hydraOpen && (
                    <>
                        <ResizeHandle onMouseDown={hydra.handleHydraResizeStart} />
                        <div
                            style={{
                                width: hydra.hydraWidth,
                                flexShrink: 0,
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <HydraEditor
                                ref={hydraEditorRef}
                                running={hydra.hydraRunning}
                                onEval={hydra.runHydra}
                                templates={hydra.hydraTemplates}
                                onSaveTemplate={hydra.saveHydraTemplate}
                                onDeleteTemplate={hydra.deleteHydraTemplate}
                            />
                        </div>
                    </>
                )}
            </div>
            <Toaster
                position="bottom-right"
                theme="dark"
                toastOptions={{
                    style: {
                        background: 'var(--bg-1)',
                        border: '1px solid var(--border)',
                        color: '#aaa',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12px',
                    },
                }}
            />
            {showExportModal && (
                <ExportModal
                    cps={editorRef.current?.getCps() ?? 0.5}
                    exportCycles={exportCycles}
                    setExportCycles={setExportCycles}
                    onExport={handleExport}
                    onClose={() => setShowExportModal(false)}
                />
            )}
        </main>
    );
}

export default App;
