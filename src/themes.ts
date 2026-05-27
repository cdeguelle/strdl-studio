export type Theme = {
    id: string;
    label: string;
    accent: string;
    strudelTheme: string;
    vars: Record<string, string>;
};

export const THEMES: Theme[] = [
    {
        id: 'void',
        label: 'Void',
        accent: '#c084fc',
        strudelTheme: 'aura',
        vars: {
            '--accent':        '#c084fc',
            '--accent-dim':    'rgba(192,132,252,0.33)',
            '--accent-bg':     'rgba(192,132,252,0.13)',
            '--bg-0':          '#0a0a12',
            '--bg-0a':         'rgba(10,10,18,0.82)',
            '--bg-1':          '#111116',
            '--bg-1a':         'rgba(17,17,22,0.92)',
            '--bg-2':          '#1a1a1f',
            '--bg-2a':         'rgba(10,10,18,0.88)',
            '--bg-hover':      '#1a1a22',
            '--border':        '#2a2a33',
            '--border-subtle': '#15151a',
            '--background':    '#0a0a12',
        },
    },
    {
        id: 'aqua',
        label: 'Aqua',
        accent: '#22d3ee',
        strudelTheme: 'tokyoNight',
        vars: {
            '--accent':        '#22d3ee',
            '--accent-dim':    'rgba(34,211,238,0.33)',
            '--accent-bg':     'rgba(34,211,238,0.13)',
            '--bg-0':          '#05121a',
            '--bg-0a':         'rgba(5,18,26,0.82)',
            '--bg-1':          '#0a1520',
            '--bg-1a':         'rgba(10,21,32,0.92)',
            '--bg-2':          '#0f1e28',
            '--bg-2a':         'rgba(5,18,26,0.88)',
            '--bg-hover':      '#132430',
            '--border':        '#1a3040',
            '--border-subtle': '#0d1c26',
            '--background':    '#05121a',
        },
    },
    {
        id: 'ember',
        label: 'Ember',
        accent: '#f59e0b',
        strudelTheme: 'gruvboxDark',
        vars: {
            '--accent':        '#f59e0b',
            '--accent-dim':    'rgba(245,158,11,0.33)',
            '--accent-bg':     'rgba(245,158,11,0.13)',
            '--bg-0':          '#100e06',
            '--bg-0a':         'rgba(16,14,6,0.82)',
            '--bg-1':          '#161208',
            '--bg-1a':         'rgba(22,18,8,0.92)',
            '--bg-2':          '#1e180a',
            '--bg-2a':         'rgba(16,14,6,0.88)',
            '--bg-hover':      '#221c0d',
            '--border':        '#302510',
            '--border-subtle': '#1c1508',
            '--background':    '#100e06',
        },
    },
    {
        id: 'jade',
        label: 'Jade',
        accent: '#34d399',
        strudelTheme: 'materialDark',
        vars: {
            '--accent':        '#34d399',
            '--accent-dim':    'rgba(52,211,153,0.33)',
            '--accent-bg':     'rgba(52,211,153,0.13)',
            '--bg-0':          '#05120e',
            '--bg-0a':         'rgba(5,18,14,0.82)',
            '--bg-1':          '#0a1512',
            '--bg-1a':         'rgba(10,21,18,0.92)',
            '--bg-2':          '#0f1e18',
            '--bg-2a':         'rgba(5,18,14,0.88)',
            '--bg-hover':      '#132420',
            '--border':        '#1a3028',
            '--border-subtle': '#0d1c18',
            '--background':    '#05120e',
        },
    },
    {
        id: 'sakura',
        label: 'Sakura',
        accent: '#f472b6',
        strudelTheme: 'dracula',
        vars: {
            '--accent':        '#f472b6',
            '--accent-dim':    'rgba(244,114,182,0.33)',
            '--accent-bg':     'rgba(244,114,182,0.13)',
            '--bg-0':          '#120810',
            '--bg-0a':         'rgba(18,8,16,0.82)',
            '--bg-1':          '#170b14',
            '--bg-1a':         'rgba(23,11,20,0.92)',
            '--bg-2':          '#20101c',
            '--bg-2a':         'rgba(18,8,16,0.88)',
            '--bg-hover':      '#241420',
            '--border':        '#341828',
            '--border-subtle': '#1e0e18',
            '--background':    '#120810',
        },
    },
];

export function applyTheme(theme: Theme): void {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.vars)) {
        // 'important' ensures our vars beat any !important stylesheet rules injected
        // by @strudel/codemirror's activateTheme (which sets --background etc. with !important)
        root.style.setProperty(key, value, 'important');
    }
}

export const DEFAULT_THEME = THEMES[0];
