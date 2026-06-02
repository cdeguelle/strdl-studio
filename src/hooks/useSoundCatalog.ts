import { useState, useCallback } from 'react';

export type SoundBank = {
    name: string;
    count: number;
    firstUrl: string | null;
    category: string;
};

export type CatalogState = {
    banks: SoundBank[];
    loading: boolean;
    error: string | null;
    loaded: boolean;
};

const DS = 'https://raw.githubusercontent.com/felixroos/dough-samples/main';
const TC = 'https://raw.githubusercontent.com/tidalcycles/uzu-drumkit/main';

const CATALOGS: { url: string; category: string }[] = [
    { url: `${DS}/Dirt-Samples.json`, category: 'dirt' },
    { url: `${DS}/tidal-drum-machines.json`, category: 'drum-machines' },
    { url: `${DS}/vcsl.json`, category: 'vcsl' },
    { url: `${DS}/piano.json`, category: 'piano' },
    { url: `${DS}/mridangam.json`, category: 'mridangam' },
    { url: `${TC}/strudel.json`, category: 'uzu' },
];

const SYNTH_BANKS: SoundBank[] = [
    ...['sine', 'square', 'sawtooth', 'triangle', 'saw', 'sqr', 'tri', 'sin'].map(name => ({
        name, count: 0, firstUrl: null, category: 'waveform',
    })),
    ...['zzfx', 'z_sine', 'z_sawtooth', 'z_triangle', 'z_square', 'z_tan', 'z_noise'].map(name => ({
        name, count: 0, firstUrl: null, category: 'zzfx',
    })),
];

function resolveBase(raw: string, fallbackBase: string): string {
    if (!raw) return fallbackBase;
    if (raw.startsWith('http')) return raw;
    if (raw.startsWith('github:')) {
        const path = raw.slice('github:'.length);
        const parts = path.split('/');
        const user = parts[0];
        const repo = parts[1] ?? 'samples';
        const branch = parts[2] ?? 'main';
        const subpath = parts.slice(3).join('/');
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${subpath ? subpath + '/' : ''}`;
    }
    return fallbackBase;
}

async function fetchCatalog(url: string, category: string): Promise<SoundBank[]> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const fallbackBase = url.substring(0, url.lastIndexOf('/') + 1);
    const jsonBase = json._base ? resolveBase(json._base, fallbackBase) : fallbackBase;

    const banks: SoundBank[] = [];
    for (const [key, value] of Object.entries(json)) {
        if (key === '_base') continue;
        if (key.startsWith('_')) continue;

        let samples: string[] = [];
        let base = jsonBase;

        if (Array.isArray(value)) {
            samples = value as string[];
        } else if (value && typeof value === 'object') {
            const obj = value as Record<string, any>;
            if (obj._base) base = resolveBase(obj._base, jsonBase);
            // chromatic sampler: { C3: "file.wav", ... }
            samples = Object.values(obj)
                .filter(v => typeof v === 'string' || Array.isArray(v))
                .flatMap(v => (Array.isArray(v) ? v : [v])) as string[];
        }

        if (samples.length === 0) continue;

        const firstRelative = samples[0];
        const firstUrl = firstRelative.startsWith('http') ? firstRelative : base + firstRelative;

        banks.push({ name: key, count: samples.length, firstUrl, category });
    }
    return banks.sort((a, b) => a.name.localeCompare(b.name));
}

export function useSoundCatalog() {
    const [state, setState] = useState<CatalogState>({
        banks: [],
        loading: false,
        error: null,
        loaded: false,
    });

    const load = useCallback(async () => {
        if (state.loaded || state.loading) return;
        setState(s => ({ ...s, loading: true, error: null }));
        try {
            const results = await Promise.allSettled(
                CATALOGS.map(({ url, category }) => fetchCatalog(url, category))
            );
            const banks: SoundBank[] = [...SYNTH_BANKS];
            for (const r of results) {
                if (r.status === 'fulfilled') banks.push(...r.value);
            }
            setState({ banks, loading: false, error: null, loaded: true });
        } catch (err) {
            setState(s => ({ ...s, loading: false, error: String(err), loaded: false }));
        }
    }, [state.loaded, state.loading]);

    return { ...state, load };
}
