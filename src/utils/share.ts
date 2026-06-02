import LZString from 'lz-string';

const STRUDEL_BASE = 'https://strudel.cc';

export function encodePattern(code: string): string {
    return LZString.compressToEncodedURIComponent(code);
}

export function decodePattern(encoded: string): string | null {
    return LZString.decompressFromEncodedURIComponent(encoded);
}

export function buildShareUrl(code: string): string {
    return `${STRUDEL_BASE}/#?code=${encodePattern(code)}`;
}

export function extractCodeFromUrl(url: string): string | null {
    try {
        // Accept full URLs or just the hash/query part
        const raw = url.includes('#') ? url.split('#')[1] ?? '' : url;
        const params = new URLSearchParams(raw.startsWith('?') ? raw : `?${raw}`);
        const encoded = params.get('code');
        if (!encoded) return null;
        return decodePattern(encoded);
    } catch {
        return null;
    }
}
