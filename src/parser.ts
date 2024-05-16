import TS from "./lib/typescript";

export interface IComponent{
    name: string;
    props?: {[name: string]: any};
    items?: IComponent[];
};
export interface IMethodNode{
    node?: TS.MethodDeclaration;
    newPos?: number;
}
// export function findMethodNode(source: TS.ClassDeclaration | TS.SourceFile, funcName: string): TS.MethodDeclaration|undefined{
//     let node: TS.ClassDeclaration | undefined;
//     if (TS.isSourceFile(source))
//         node = findModuleClassNode(source)
//     else if (TS.isClassDeclaration(source))
//         node = source;
//     if (node){
//         let result = node.members.find((member: TS.ClassElement) => {
//             if (member.kind == TS.SyntaxKind.MethodDeclaration){
//                 let method: TS.MethodDeclaration = member as any;
//                 let name = method.name.getText();
//                 if (funcName == name){
//                     return true;
//                 }
//             };
//         });
//         return result as TS.MethodDeclaration;
//     };
// };
export function findMethodNode(source: TS.ClassDeclaration | TS.SourceFile, funcName: string): IMethodNode | undefined{
    let node: TS.ClassDeclaration | undefined;
    if (TS.isSourceFile(source))
        node = findModuleClassNode(source)
    else if (TS.isClassDeclaration(source))
        node = source;
    if (node){
        let propertyNode: TS.PropertyDeclaration|undefined;
    let methodNode: TS.MethodDeclaration|undefined;
    for (let i=0; i<node.members.length; i++){
        let member = node.members[i];
        if (member.kind == TS.SyntaxKind.MethodDeclaration){
            if (!methodNode)
                methodNode = member as TS.MethodDeclaration;
            let method: TS.MethodDeclaration = member as any;
            let name = method.name.getText();
            if (funcName == name){
                return {
                    node: method
                }
            }
        }
        else if (member.kind == TS.SyntaxKind.PropertyDeclaration){
            propertyNode = member as TS.PropertyDeclaration;
        }
    };
    if (methodNode)
        return {
            newPos: methodNode.pos
        }
    else if (propertyNode)
        return {
            newPos: propertyNode.end
        }
    else
        return {
            newPos: node.members.end
        }
    };
};
export function findPropertyNode(node: TS.ClassDeclaration, name: string): TS.MethodDeclaration|undefined{
    let result = node.members.find((member: TS.ClassElement) => {
        if (member.kind == TS.SyntaxKind.PropertyDeclaration){
            let method: TS.MethodDeclaration = member as any;
            let name = method.name.getText();
            if (name == name){
                return true;
            }
        };
    });
    return result as TS.MethodDeclaration;
};
export function findModuleClassNode(source: TS.SourceFile): TS.ClassDeclaration|undefined{
    let result = source.statements.find((node) => {
        if (node.kind == TS.SyntaxKind.ClassDeclaration){
            let classNode: TS.ClassDeclaration = node as any;
            if (classNode.heritageClauses){
                let heritageClause = classNode.heritageClauses[0] as TS.HeritageClause;
                if (heritageClause.types[0]?.expression.getText() == 'Module'){
                    return true;
                };
            };
        };
    });
    return result as TS.ClassDeclaration;
};
export function findComponentImportNodeIfNotExists(source: TS.SourceFile, className: string): number|undefined{
    let result: number|undefined;
    for (let i=0; i<source.statements.length; i++){
        let node = source.statements[i];
        if (node.kind == TS.SyntaxKind.ImportDeclaration){
            let importNode = node as TS.ImportDeclaration;
            let text = importNode.moduleSpecifier.getText();
            if (!className.startsWith('Scom') && (text == "'@ijstech/components'" || text == '"@ijstech/components"')){
                let namedImports = importNode.importClause?.namedBindings as TS.NamedImports;
                if (namedImports){
                    for (let j=0; j<namedImports.elements.length; j++){
                        let node = namedImports.elements[j];
                        if (node.kind == TS.SyntaxKind.ImportSpecifier){
                            node = node as TS.ImportSpecifier;
                            if (!result)
                                result = node.pos;
                            if (node.getText() == className)
                                return;
                        };
                    };
                };   
            } else {
                const nodeText = node.getText();
                if (nodeText.includes(className)){
                    return;
                }
            }
        }
        else if (node.kind == TS.SyntaxKind.ClassDeclaration) {
            if (!result) result = node.pos;
            break;
        }
    };
    return result;
};
export function findComponentImports(source: TS.SourceFile, classNames: string[]): {classNames: string[], newPos: number}{
    let result ={
        classNames: classNames,
        newPos: 0
    };
    for (let i=0; i<source.statements.length; i++){
        let node = source.statements[i];
        if (node.kind == TS.SyntaxKind.ImportDeclaration){
            let importNode = node as TS.ImportDeclaration;
            let text = importNode.moduleSpecifier.getText();
            if (text == "'@ijstech/components'" || text == '"@ijstech/components"'){
                let namedImports = importNode.importClause?.namedBindings as TS.NamedImports;
                if (namedImports){
                    for (let j=0; j<namedImports.elements.length; j++){
                        let node = namedImports.elements[j];
                        if (node.kind == TS.SyntaxKind.ImportSpecifier){
                            node = node as TS.ImportSpecifier;
                            if (!result.newPos)
                                result.newPos = node.pos;
                            let className = node.getText();
                            if (result.classNames.indexOf(className) >= 0)
                                result.classNames.splice(result.classNames.indexOf(className), 1);
                            if (result.classNames.length == 0)
                                return result;
                        };
                    };
                };   
            };
        }
        else if (node.kind == TS.SyntaxKind.ClassDeclaration)
            break;
    };
    return result;
};
export function findComponentPropertyNodeIfNotExists(classNode: TS.ClassDeclaration, id: string): number|undefined{
    let result: number|undefined;
    if (classNode){
        for (let i=0; i<classNode.members.length; i++){
            let node = classNode.members[i];
            if (!result)
                result = node.pos;
            if (node.kind == TS.SyntaxKind.PropertyDeclaration){
                let property = node as TS.PropertyDeclaration;                            
                if (property.name.getText() == id)
                    return;
            };
        }
    };
    return result;
};
function insertTextAt(value: string, pos: number, text: string): string{
    return value.substring(0, pos) + text + value.substring(pos);
};
function replaceTextAt(value: string, pos: number, fromText: string, toText: string): string{
    return value.substring(0, pos) + toText + value.substring(pos + fromText.length);
};
export function renameMethod(source: TS.SourceFile, oldFunc: string, newFunc: string): string{
    let result = source.text;
    let classNode = findModuleClassNode(source);
    if (classNode){
        let methodNode = findMethodNode(classNode, oldFunc);
        if (methodNode?.node){
            let start = methodNode.node.getStart();
            return replaceTextAt(result, start, oldFunc, newFunc);
        };
    };
    return result;
};
export function renameProperty(source: TS.SourceFile, className: string, oldName: string, newName: string): string | undefined{
    if (!newName) return;
    let result = source.text;
    let classNode = findModuleClassNode(source);
    if (classNode){
        if (!oldName){
            return addComponentProp(source, className, newName)
        }
        else{
            let node = findPropertyNode(classNode, oldName);
            if (node){
                let start = node.getStart();                
                return replaceTextAt(result, start, oldName, newName);
            };
        }
    };
    return result;
};
export function addComponentImports(source: TS.SourceFile, classNames: string[]): string | undefined{
    let result = findComponentImports(source, classNames);
    if (result.newPos && result.classNames?.length > 0){ 
        let code = source.getFullText();       
        result.classNames.forEach(className => {
            code = insertTextAt(code, result.newPos, className + ', ');
        });
        return code;
    };
};
export function addComponentProp(source: TS.SourceFile, className: string, id: string): string | undefined{
    let result = source.getFullText();
    let classNode = findModuleClassNode(source);
    let importPos = findComponentImportNodeIfNotExists(source, className);
    if (classNode){
        let propPos = findComponentPropertyNodeIfNotExists(classNode, id);
        if (propPos){
            result = insertTextAt(result, propPos, `\n    ` + id + ': ' + className + ';');
        };
    };
    if (importPos){
        if (className.startsWith('Scom')) {
            const packageName = '@scom/scom' + className.substring(4).replace(/([A-Z])/g, '-$1').toLowerCase();
            result = insertTextAt(result, importPos, `\nimport ${className} from '${packageName}';`);
        } else {
            result = insertTextAt(result, importPos, className + ', ');
        }
    };
    return result;
};
export function addEventHandler(source: TS.SourceFile, classNames: string[], funcName: string, params?: string): {
    lineNumber?: number,
    columnNumber?: number,
    code?: string
}{
    let result = source.getFullText();
    let classNode = findModuleClassNode(source);
    const controls = [];
    const widgets = [];
    for (let className of classNames){
        if (className.startsWith('Scom')) {
            widgets.push(className);
        } else {
            controls.push(className);
        }
    }
    let imports = findComponentImports(source, controls);
    let line = 0;
    if (classNode){
        let node = findMethodNode(classNode, funcName);
        if (node?.newPos){
            let pos = node.newPos;
            // params = params || `target: ${classNames[0]}`;
            result = insertTextAt(result, pos, `\n    ${funcName}(${params}){\n        \n    };`);
            let p = source.getLineAndCharacterOfPosition(pos);
            line = p.line + 3;
        }
        else if (node?.node){
            let pos = node.node.getStart();
            let p = source.getLineAndCharacterOfPosition(pos);
            line = p.line + 2;
        }
    };
    let controlLength = 0;
    if (imports.newPos && imports.classNames?.length > 0){
        imports.classNames.forEach(className => {
            controlLength += className.length + 2;
            result = insertTextAt(result, imports.newPos, className + ', ');
        });
    };
    let widgetLength = 0;
    if (widgets.length > 0){
        for (let i=0; i<widgets.length; i++){
            let className = widgets[i];
            let importPos = findComponentImportNodeIfNotExists(source, className);
            if (importPos) {
                const packageName = '@scom/scom' + className.substring(4).replace(/([A-Z])/g, '-$1').toLowerCase();
                const importText = `\nimport ${className} from '${packageName}';`;
                result = insertTextAt(result, importPos + controlLength + widgetLength, importText);
                widgetLength += importText.length;
            }
        }
    }
    return {
        lineNumber: line,
        columnNumber: 9,
        code: result
    };
};
export function locateMethod(source: TS.SourceFile, funcName: string): {
    lineNumber?: number,
    columnNumber?: number
}{
    let lineNumber = 0;
    let classNode = findModuleClassNode(source);
    if (classNode){
        let node = findMethodNode(classNode, funcName);
        if (node?.node){
            let pos = node.node.getStart();
            let p = source.getLineAndCharacterOfPosition(pos);
            lineNumber = p.line + 2;
        }
    };
    return {
        lineNumber: lineNumber,
        columnNumber: 9
    };
};
function getJSXElementProps(node: TS.JsxOpeningElement): {[name: string]: any}{
    let result: {[name: string]: any} = {};
    node.forEachChild((node) => {
        if (node.kind == TS.SyntaxKind.JsxAttributes){
            node.forEachChild((node) => {
                if (node.kind == TS.SyntaxKind.JsxAttribute){
                    let attribute = node as TS.JsxAttribute;
                    let name = attribute.name.getText();
                    let value = attribute.initializer;
                    if (value){
                        let text = value.getText();
                        if (text == 'true'){
                            result[name] = true;
                        } else if (text == 'false'){
                            result[name] = false;
                        } else {
                            result[name] = text;
                        };
                    } else {
                        result[name] = true;
                    };
                };
            });
        };
    });
    return result;
};
function getJsxElement(node: TS.JsxElement): IComponent{
    let openingElement = node.openingElement;
    let tagName = openingElement.tagName.getText();
    let props: {[name: string]: any} = getJSXElementProps(openingElement);
    let items: IComponent[] = [];
    node.forEachChild((child) => {
        if (child.kind == TS.SyntaxKind.JsxElement){
            items.push(getJsxElement(child as TS.JsxElement));
        };
    });
    return {
        name: tagName,
        props: props,
        items: items.length>0?items:undefined,
    };
};
export function parseUI(source: TS.SourceFile, funcName: string): IComponent | undefined{
    let sourceFile = source.getSourceFile();
    let result: IComponent | undefined;
    sourceFile.statements.forEach((node) => {
        if (node.kind == TS.SyntaxKind.ClassDeclaration){
            let renderNode = findMethodNode(node as TS.ClassDeclaration, funcName);
            if (renderNode?.node){
                renderNode.node.body?.statements?.forEach((node) => {
                    if (node.kind == TS.SyntaxKind.ReturnStatement){
                        node.forEachChild((node) => {
                            if (node.kind == TS.SyntaxKind.ParenthesizedExpression){
                                node.forEachChild((node) => {
                                    if (node.kind == TS.SyntaxKind.JsxElement){
                                        result = getJsxElement(node as TS.JsxElement);
                                        return;
                                    };
                                })
                            }
                            else if (node.kind == TS.SyntaxKind.JsxElement){
                                result = getJsxElement(node as TS.JsxElement);
                                return;
                            };
                        });
                        if (result != undefined)
                            return;
                    };
                });
            }            
            if (result != undefined)
                return;
        };
    });
    return result;
};
function generateJsxScript(component?: IComponent, indent?: number): string{
    component = component || {
        name: 'i-panel'
    };
    let indentStr = '';
    let result = '';
    let first = false;
    if (!indent){
        first = true;        
        indent = 1;
    };
    indent += 1;
    indentStr = '    '.repeat(indent);
    if (first)
        result = '<' + component.name;
    else
        result += indentStr + '<' + component.name;
    let firstProp = true;
    for (let name in component.props){
        if (firstProp)
            result += '\n';
        firstProp = false;
        let value = component.props[name];
        if (value === true){
            result += '    ' + indentStr + name + '\n';;
        } else {
            result += '    ' + indentStr + name + '=' + value + '\n';
        };
    };
    if (first)
        result += '>\n';
    else
        result += indentStr + '>\n';
    if (component.items){
        for (let i = 0; i < component.items.length; i ++){
            let item = component.items[i];
            result += generateJsxScript(item, indent);
        }
    };
    result += indentStr + `</${component.name}>\n`;
    return result;
};
function replaceScript(script: string, fromPos: number, toPos: number, value: string): string{
    let result = '';
    if (fromPos > 0)
        result += script.substring(0, fromPos);
    result += value;
    if (toPos < script.length)
        result += script.substring(toPos);
    return result;
};
export function renderUI(source: TS.SourceFile, funcName: string, component?: IComponent): string{    
    // let sourceFile = source.getSourceFile();
    let result = source.getFullText();
    let origLength = result.length;
    let node = findModuleClassNode(source);
    if (node){
        let renderNode = findMethodNode(node, funcName);
        if (renderNode?.node?.body){
            let script = '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '}';
            result = replaceScript(result, renderNode.node.body.pos, renderNode.node.body.end, script);
            // sourceFile = sourceFile.update(result, {span: {start: renderNode.body.pos, length:renderNode.body.end - renderNode.body.pos}, newLength: script.length});
        }
        else{
            let script = '    ' + funcName + '()' + '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '};' + '\n}';
            result = replaceScript(result, node.end -1, node.end, script);
            // sourceFile = sourceFile.update(result, {span: {start: 0, length: origLength}, newLength: result.length});
        };
    }
    return result;
};