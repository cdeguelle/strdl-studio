import { useState, useCallback } from 'react';

export type EditorSettings = {
    fontSize: number;
    fontFamily: string;
    lineNumbers: boolean;
    lineWrapping: boolean;
    bracketMatching: boolean;
    bracketClosing: boolean;
    vimMode: boolean;
    tabIndentation: boolean;
};

export const DEFAULT_SETTINGS: EditorSettings = {
    fontSize: 14,
    fontFamily: 'JetBrains Mono',
    lineNumbers: true,
    lineWrapping: false,
    bracketMatching: false,
    bracketClosing: true,
    vimMode: false,
    tabIndentation: false,
};

const STORAGE_KEY = 'strdl-settings';

export function useSettings() {
    const [settings, setSettingsState] = useState<EditorSettings>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    const updateSetting = useCallback(
        <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
            setSettingsState((prev) => {
                const next = { ...prev, [key]: value };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                return next;
            });
        },
        [],
    );

    return { settings, updateSetting };
}
