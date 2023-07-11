export const posterConstructor = (path: string, size: number) => {
    return `https://image.tmdb.org/t/p/w${size}${path}`;
}