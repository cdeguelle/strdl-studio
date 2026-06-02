import { useState, useEffect } from 'react';
import { soundMap } from 'superdough';

export type SoundEntry = {
    name: string;
    type: string;
};

const getType = (name: string, data: any): string => {
    if (data?.data?.type) return data.data.type;
    if (['sine', 'square', 'triangle', 'sawtooth', 'tri', 'saw', 'pulse'].some(w => name.includes(w))) return 'synth';
    if (['piano', 'organ', 'guitar', 'bass', 'strings', 'pad', 'lead', 'brass', 'flute', 'violin', 'cello'].some(w => name.includes(w))) return 'synth';
    if (name.startsWith('_')) return 'internal';
    return 'synth';
};

export function useSoundMap() {
    const [sounds, setSounds] = useState<Record<string, any>>({});

    useEffect(() => {
        const update = (val: Record<string, any> | undefined) => {
            if (val) setSounds({ ...val });
        };
        update(soundMap.get());
        const unsub = soundMap.subscribe(update);
        return unsub;
    }, []);

    const entries: SoundEntry[] = Object.keys(sounds)
        .filter(k => !k.startsWith('_'))
        .sort()
        .map(name => ({ name, type: getType(name, sounds[name]) }));

    return entries;
}
