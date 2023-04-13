import TS from "./lib/typescript";

export interface IComponent{
    name: string;
    props?: {[name: string]: any};
    items?: IComponent[];
};
function parseMethodNode(node: TS.ClassDeclaration, funcName: string): TS.MethodDeclaration|undefined{
    for (let i = 0; i < node.members.length; i ++){
        let member = node.members[i];
        if (member.kind == TS.SyntaxKind.MethodDeclaration){
            let method: TS.MethodDeclaration = member as any;
            let name = method.name.getText();
            if (name == funcName)
                return method;
        };
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
            let renderNode = parseMethodNode(node as TS.ClassDeclaration, funcName);
            renderNode?.body?.statements?.forEach((node) => {
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
    if (component.items)
        result += component.items.map((item) => generateJsxScript(item, indent));
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
    let sourceFile = source.getSourceFile();
    let result = source.getFullText();
    let origLength = result.length;
    sourceFile.statements.forEach((node) => {
        if (node.kind == TS.SyntaxKind.ClassDeclaration){
            let renderNode = parseMethodNode(node as TS.ClassDeclaration, funcName);
            if (renderNode?.body){
                let script = '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '}';
                result = replaceScript(result, renderNode.body.pos, renderNode.body.end, script);
                sourceFile = sourceFile.update(result, {span: {start: renderNode.body.pos, length:renderNode.body.end - renderNode.body.pos}, newLength: script.length});
            }
            else{
                let script = '    ' + funcName + '()' + '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '};' + '\n}';
                result = replaceScript(result, node.end -1, node.end, script);
                sourceFile = sourceFile.update(result, {span: {start: 0, length: origLength}, newLength: result.length});
            };
            return;
        };
    });
    // sourceFile.statements.forEach((node) => {
    //     if (node.kind == TS.SyntaxKind.ClassDeclaration){
    //         let renderNode = parseMethodNode(node as TS.ClassDeclaration, 'renderDesktop');
    //         // console.dir(renderNode)
    //     };
    // });
    return result;
};