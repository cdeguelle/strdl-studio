import { useState, useCallback, RefObject } from 'react';
import { VIZ_SUFFIX_RE, VisualizerMode } from '../types';
import { EditorHandle } from '../Editor';

export function useVisualizer(editorRef: RefObject<EditorHandle | null>) {
    const [selectedVisualizer, setSelectedVisualizer] = useState<VisualizerMode>('none');

    const setVisualizerMode = useCallback((viz: VisualizerMode) => {
        const ed = editorRef.current;
        if (!ed) return;
        const stripped = ed.getCode().replace(VIZ_SUFFIX_RE, '');
        const newCode = viz === 'none' ? stripped : `${stripped}\n  ._${viz}()`;
        ed.setCode(newCode);
        setSelectedVisualizer(viz);
        if (ed.isPlaying()) ed.evalRaw(newCode);
    }, [editorRef]);

    return { selectedVisualizer, setVisualizerMode };
}
