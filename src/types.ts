export const INITIAL_CODE = '// Start coding...';
export const VIZ_SUFFIX_RE = /\s*\._(?:scope|spectrum|pianoroll|punchcard|spiral)\(\s*\)\s*$/;

export type VisualizerMode = 'none' | 'scope' | 'spectrum' | 'pianoroll' | 'punchcard' | 'spiral';

export type Tab = {
    id: string;
    path: string | null;
    code: string;
    savedCode: string;
};

export type Snippet = {
    id: string;
    name: string;
    code: string;
    category?: string;
};

export const BUILTIN_SNIPPETS: Snippet[] = [
    { id: 'b1', name: 'Basic beat', code: 's("bd ~ sd ~")' },
    { id: 'b2', name: 'Euclidean drums', code: 's("bd(3,8) sd(2,8) hh(7,8)")' },
    {
        id: 'b3',
        name: 'Stack (drums + synth)',
        code: 'stack(\n  s("bd ~ sd ~"),\n  note("c3 e3 g3 a3").s("sawtooth")\n)',
    },
    {
        id: 'b4',
        name: 'Chord progression',
        code: 'note("<[c3,e3,g3] [f3,a3,c4] [g3,b3,d4] [e3,g3,b3]>")\n  .s("sawtooth").cutoff(800)',
    },
    {
        id: 'b5',
        name: 'Slow filter sweep',
        code: 's("sd*4").cutoff(sine.range(200,4000).slow(8))',
    },
    { id: 'b6', name: 'Random melody', code: 'note(irand(12).add(48)).s("piano").fast(2)' },
];
