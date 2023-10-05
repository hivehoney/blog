
export function extractFilenames(text) {
    const regex = /<img\s+src="[^"]+\\([^"]+\.PNG)">/g;
    const matches = [...text.matchAll(regex)];

    const srcValues = matches.map(match => match[1]);

    return srcValues;
};

