declare function basename(path: string, ext?: string): string;
declare function dirname(path: string): string;
declare function join(...paths: string[]): any;
declare function relative(from: string, to: string): string;
declare function resolve(...paths: string[]): string;
declare const _default: {
    basename: typeof basename;
    dirname: typeof dirname;
    join: typeof join;
    relative: typeof relative;
    resolve: typeof resolve;
};
export default _default;
