import { useState, useEffect } from 'react';
import * as midiPkg from '@strudel/midi';

const { enableWebMidi, WebMidi } = midiPkg as any;

export type MidiState = {
    status: 'idle' | 'enabled' | 'error' | 'unsupported';
    error: string | null;
    outputs: string[];
    inputs: string[];
};

export function useMidi() {
    const [state, setState] = useState<MidiState>({
        status: 'idle',
        error: null,
        outputs: [],
        inputs: [],
    });

    useEffect(() => {
        const refresh = () =>
            setState({
                status: 'enabled',
                error: null,
                outputs: WebMidi.outputs?.map((o: any) => o.name) ?? [],
                inputs: WebMidi.inputs?.map((i: any) => i.name) ?? [],
            });

        WebMidi.addListener?.('connected', refresh);
        WebMidi.addListener?.('disconnected', refresh);

        if (WebMidi.enabled) {
            refresh();
        } else {
            try {
                const p: Promise<any> | undefined = enableWebMidi();
                p?.then(refresh).catch((err: unknown) => {
                    const msg = err instanceof Error ? err.message : String(err);
                    setState({ status: 'error', error: msg, outputs: [], inputs: [] });
                });
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                setState({
                    status: msg.toLowerCase().includes('not support') ? 'unsupported' : 'error',
                    error: msg,
                    outputs: [],
                    inputs: [],
                });
            }
        }

        return () => {
            WebMidi.removeListener?.('connected', refresh);
            WebMidi.removeListener?.('disconnected', refresh);
        };
    }, []);

    return state;
}
