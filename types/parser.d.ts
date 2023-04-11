import TS from "./lib/typescript";
export interface IComponent {
    name: string;
    props?: {
        [name: string]: any;
    };
    items?: IComponent[];
}
export declare function parseUI(source: TS.SourceFile, funcName: string): IComponent | undefined;
export declare function renderUI(source: TS.SourceFile, funcName: string, component?: IComponent): string;
