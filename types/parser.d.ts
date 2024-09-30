import TS from "./lib/typescript";
export interface IComponent {
    name: string;
    props?: {
        [name: string]: any;
    };
    items?: IComponent[];
}
export interface IMethodNode {
    node?: TS.MethodDeclaration;
    newPos?: number;
}
export declare function findMethodNode(source: TS.ClassDeclaration | TS.SourceFile, funcName: string): IMethodNode | undefined;
export declare function findPropertyNode(node: TS.ClassDeclaration, name: string): TS.MethodDeclaration | undefined;
export declare function findModuleClassNode(source: TS.SourceFile): TS.ClassDeclaration | undefined;
export declare function findComponentImportNodeIfNotExists(source: TS.SourceFile, className: string): number | undefined;
export declare function findComponentImports(source: TS.SourceFile, classNames: string[]): {
    classNames: string[];
    newPos: number;
};
export declare function findComponentPropertyNodeIfNotExists(classNode: TS.ClassDeclaration, id: string): number | undefined;
export declare function renameMethod(source: TS.SourceFile, oldFunc: string, newFunc: string): string;
export declare function renameProperty(source: TS.SourceFile, className: string, oldName: string, newName: string): string | undefined;
export declare function addComponentImports(source: TS.SourceFile, classNames: string[]): string | undefined;
export declare function addComponentProp(source: TS.SourceFile, className: string, id: string): string | undefined;
export declare function addEventHandler(source: TS.SourceFile, classNames: string[], funcName: string, params?: string): {
    lineNumber?: number;
    columnNumber?: number;
    code?: string;
};
export declare function locateMethod(source: TS.SourceFile, funcName: string): {
    lineNumber?: number;
    columnNumber?: number;
};
export declare function locateError(source: TS.SourceFile, pos: number): {
    lineNumber?: number;
    columnNumber?: number;
};
export declare function locateControl(source: TS.SourceFile, control: IComponent): {
    lineNumber?: number;
    columnNumber?: number;
};
export declare function parseUI(source: TS.SourceFile, funcName: string): IComponent | undefined;
export declare function renderUI(source: TS.SourceFile, funcName: string, component?: IComponent): string;
