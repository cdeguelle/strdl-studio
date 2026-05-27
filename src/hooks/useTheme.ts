import { useState, useEffect } from 'react';
import { Theme, THEMES, DEFAULT_THEME, applyTheme } from '../themes';

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem('strdl-theme');
        return THEMES.find((t) => t.id === saved) ?? DEFAULT_THEME;
    });

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const setTheme = (id: string) => {
        const next = THEMES.find((t) => t.id === id) ?? DEFAULT_THEME;
        localStorage.setItem('strdl-theme', next.id);
        setThemeState(next);
    };

    return { theme, setTheme, themes: THEMES };
}
