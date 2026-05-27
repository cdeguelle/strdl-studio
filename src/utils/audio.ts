import {
    getAudioContext,
    setAudioContext,
    initAudio,
    setSuperdoughAudioController,
    resetGlobalEffects,
    superdough,
    registerSynthSounds,
    registerZZFXSounds,
} from '@strudel/webaudio';
import { SuperdoughAudioController } from 'superdough/superdoughoutput.mjs';

export function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    let samples: Float32Array;
    if (numChannels === 2) {
        const l = buffer.getChannelData(0);
        const r = buffer.getChannelData(1);
        samples = new Float32Array(l.length * 2);
        for (let i = 0; i < l.length; i++) {
            samples[i * 2] = l[i];
            samples[i * 2 + 1] = r[i];
        }
    } else {
        samples = buffer.getChannelData(0);
    }
    const dataLen = samples.length * bytesPerSample;
    const ab = new ArrayBuffer(44 + dataLen);
    const view = new DataView(ab);
    const ws = (off: number, s: string) =>
        s.split('').forEach((c, i) => view.setUint8(off + i, c.charCodeAt(0)));
    ws(0, 'RIFF');
    view.setUint32(4, 36 + dataLen, true);
    ws(8, 'WAVE');
    ws(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    ws(36, 'data');
    view.setUint32(40, dataLen, true);
    let off = 44;
    for (let i = 0; i < samples.length; i++, off += 2) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return ab;
}

export async function renderPatternAudioFixed(
    pattern: any,
    cps: number,
    begin: number,
    end: number,
    sampleRate: number,
    maxPolyphony: number,
    multiChannelOrbits: boolean,
    downloadName: string,
): Promise<void> {
    const existingCtx = getAudioContext();
    await existingCtx.close();

    const length = Math.ceil(((end - begin) / cps) * sampleRate);
    const offlineCtx = new OfflineAudioContext(2, length, sampleRate);

    // Fix 1: override currentTime to always return 0 during the scheduling phase.
    // superdough skips any event where t < ac.currentTime — on WebKit,
    // OfflineAudioContext.currentTime can be slightly > 0 before startRendering().
    try {
        Object.defineProperty(offlineCtx, 'currentTime', { get: () => 0, configurable: true });
    } catch {
        console.warn('[export] could not shadow currentTime on OfflineAudioContext');
    }

    // Fix 2: patch createBufferSource so AudioBuffers decoded by the live AudioContext
    // are cloned into the OfflineAudioContext before use.
    const origCreateBS = offlineCtx.createBufferSource.bind(offlineCtx);
    (offlineCtx as any).createBufferSource = (): AudioBufferSourceNode => {
        const src = origCreateBS();
        const nativeProp = Object.getOwnPropertyDescriptor(AudioBufferSourceNode.prototype, 'buffer');
        if (nativeProp?.set) {
            try {
                Object.defineProperty(src, 'buffer', {
                    configurable: true,
                    enumerable: false,
                    get() { return nativeProp.get ? nativeProp.get.call(src) : null; },
                    set(buf: AudioBuffer | null) {
                        if (buf) {
                            const newBuf = offlineCtx.createBuffer(buf.numberOfChannels, buf.length, buf.sampleRate);
                            for (let ch = 0; ch < buf.numberOfChannels; ch++) {
                                newBuf.copyToChannel(buf.getChannelData(ch), ch);
                            }
                            nativeProp.set!.call(src, newBuf);
                        } else {
                            nativeProp.set!.call(src, buf);
                        }
                    },
                });
            } catch {
                console.warn('[export] createBufferSource patch failed');
            }
        }
        return src;
    };

    setAudioContext(offlineCtx as unknown as AudioContext);
    setSuperdoughAudioController(new SuperdoughAudioController(offlineCtx as unknown as AudioContext));

    // Fix 3: disableWorklets:true so initAudio does not call loadWorklets() on the OfflineAudioContext
    await initAudio({ maxPolyphony, multiChannelOrbits, disableWorklets: true } as any);

    // Fix 4: populate OUR superdough module instance's soundMap with synth sounds
    registerSynthSounds();
    registerZZFXSounds();

    const haps = (pattern.queryArc(begin, end, { _cps: cps }) as any[]).sort(
        (a, b) => a.whole.begin.valueOf() - b.whole.begin.valueOf(),
    );
    const onsetHaps = haps.filter((h: any) => h.hasOnset());
    console.log(`[export] ${onsetHaps.length} onset haps over ${end - begin} cycles at cps=${cps}`);

    for (const hap of haps) {
        if (!hap.hasOnset()) continue;
        try {
            hap.ensureObjectValue();
            const t = Math.max(0, (hap.whole.begin.valueOf() - begin) / cps);
            await superdough(hap.value, t, hap.duration / cps, cps, hap.whole.begin.valueOf() - begin);
        } catch (err) {
            console.warn('[export] hap error:', err);
        }
    }

    const renderedBuffer = await offlineCtx.startRendering();

    let peak = 0;
    for (let ch = 0; ch < renderedBuffer.numberOfChannels; ch++) {
        const data = renderedBuffer.getChannelData(ch);
        for (let i = 0; i < data.length; i++) {
            const abs = Math.abs(data[i]);
            if (abs > peak) peak = abs;
        }
    }
    console.log(`[export] rendered peak amplitude: ${peak.toFixed(6)}`);
    if (peak === 0) {
        throw new Error('Le buffer rendu est silencieux (peak=0). Consulte la console DevTools pour le diagnostic.');
    }

    const wavBuffer = audioBufferToWav(renderedBuffer);
    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${downloadName}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setAudioContext(null as unknown as AudioContext);
    setSuperdoughAudioController(null as unknown as InstanceType<typeof SuperdoughAudioController>);
    resetGlobalEffects();
}
