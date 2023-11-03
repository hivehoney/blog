
export function extractFilenames(text) {
    // 정규표현식을 사용하여 img 태그 안의 src 속성 값을 추출합니다.
    const imgSrcRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
    const matches = text.match(imgSrcRegex);

    // 추출된 파일명을 저장할 배열
    const filenames = [];

    if (matches) {
        matches.forEach(match => {
            // 정규표현식을 사용하여 파일명만 추출합니다.
            const filenameMatch = /\/([^\/]+\.PNG)/g.exec(match);
            if (filenameMatch) {
                const filename = filenameMatch[1];
                filenames.push(filename);
            }
        });
    }

    return filenames;
};

