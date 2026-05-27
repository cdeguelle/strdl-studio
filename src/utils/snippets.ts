import { Snippet } from '../types';

export function inferGenre(varName: string, title: string): string {
    const h = (varName + ' ' + title).toLowerCase();
    const map: [string, string[]][] = [
        ['Game / Film', ['mario', 'zelda', 'swimming', 'overworld', 'koji']],
        ['Jazz', ['jazz', 'giant', 'barry', 'bebop', 'blippy', 'rhodes', 'swing', 'coltrane']],
        ['Ambient', ['ambient', 'drone', 'submarine', 'lounge', 'melting', 'sponge', 'pad']],
        ['Funk / Soul', ['funk', 'soul', 'groove', 'dinofunk', 'underground', 'cold', 'plumber']],
        ['House / Dance', ['house', 'disco', '4on', 'garage', 'dancefloor']],
        ['Electronic', ['techno', 'acid', 'rave', 'industrial', 'electro', 'cave']],
        ['D&B / Bass', ['dnb', 'amen', 'break', 'jungle', 'bass']],
    ];
    for (const [genre, kw] of map) {
        if (kw.some((k) => h.includes(k))) return genre;
    }
    return 'Experimental';
}

export function parseStrudelTunes(content: string): Snippet[] {
    const snippets: Snippet[] = [];
    const re = /export\s+const\s+(\w+)\s*=\s*`([\s\S]*?)`\s*;/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(content)) !== null) {
        const [, varName, raw] = m;
        const code = raw.trim();
        if (!code) continue;
        const titleMatch = code.split('\n')[0].match(/^\/\/\s*(.+)/);
        const rawTitle = titleMatch ? titleMatch[1].trim() : varName;
        const authorMatch = code.match(/\/\/\s*@by\s+(.+)/);
        const author = authorMatch ? authorMatch[1].trim() : '';
        snippets.push({
            id: `tune-${varName}`,
            name: author ? `${rawTitle} — ${author}` : rawTitle,
            code,
            category: inferGenre(varName, rawTitle),
        });
    }
    return snippets;
}

export function parseStrudelMdx(filename: string, content: string): Snippet[] {
    const category = filename.replace('.mdx', '');
    const snippets: Snippet[] = [];
    let currentHeading = category;
    const headingCounts: Record<string, number> = {};
    const tuneRegex = /tune=\{`([\s\S]*?)`\}/g;
    const lines = content.split('\n');
    const positions: { pos: number; heading: string }[] = [];
    let charPos = 0;
    for (const line of lines) {
        const h = line.match(/^#{1,3}\s+(.+)/);
        if (h) positions.push({ pos: charPos, heading: h[1].replace(/[*_`[\]]/g, '').trim() });
        charPos += line.length + 1;
    }
    let match: RegExpExecArray | null;
    while ((match = tuneRegex.exec(content)) !== null) {
        const code = match[1].trim();
        if (!code) continue;
        const matchPos = match.index;
        for (const p of positions) {
            if (p.pos <= matchPos) currentHeading = p.heading;
        }
        headingCounts[currentHeading] = (headingCounts[currentHeading] ?? 0) + 1;
        const n = headingCounts[currentHeading];
        snippets.push({
            id: `remote-${category}-${snippets.length}`,
            name: n > 1 ? `${currentHeading} #${n}` : currentHeading,
            code,
            category,
        });
    }
    return snippets;
}
