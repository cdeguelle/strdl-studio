declare module '@strudel/webaudio';
declare module '@strudel/core';
declare module '@strudel/hydra';
declare module '@strudel/repl';
declare module '@strudel/transpiler';
declare module '@strudel/codemirror';
declare module '@strudel/midi';
declare module '@strudel/osc';
declare module '@strudel/mqtt';
declare module 'superdough' {
    import type { MapStore } from 'nanostores';
    export const soundMap: MapStore<Record<string, any>>;
    export function registerSound(key: string, onTrigger: any, data?: any): void;
}
declare module 'superdough/superdoughoutput.mjs' {
    export class SuperdoughAudioController {
        constructor(audioContext: BaseAudioContext);
        reset(): void;
    }
}
