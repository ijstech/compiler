"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderUI = exports.parseUI = void 0;
const typescript_1 = __importDefault(require("./lib/typescript"));
;
function parseMethodNode(node, funcName) {
    for (let i = 0; i < node.members.length; i++) {
        let member = node.members[i];
        if (member.kind == typescript_1.default.SyntaxKind.MethodDeclaration) {
            let method = member;
            let name = method.name.getText();
            if (name == funcName)
                return method;
        }
        ;
    }
    ;
}
;
function getJSXElementProps(node) {
    let result = {};
    node.forEachChild((node) => {
        if (node.kind == typescript_1.default.SyntaxKind.JsxAttributes) {
            node.forEachChild((node) => {
                if (node.kind == typescript_1.default.SyntaxKind.JsxAttribute) {
                    let attribute = node;
                    let name = attribute.name.getText();
                    let value = attribute.initializer;
                    if (value) {
                        let text = value.getText();
                        if (text == 'true') {
                            result[name] = true;
                        }
                        else if (text == 'false') {
                            result[name] = false;
                        }
                        else {
                            result[name] = text;
                        }
                        ;
                    }
                    else {
                        result[name] = true;
                    }
                    ;
                }
                ;
            });
        }
        ;
    });
    return result;
}
;
function getJsxElement(node) {
    let openingElement = node.openingElement;
    let tagName = openingElement.tagName.getText();
    let props = getJSXElementProps(openingElement);
    let items = [];
    node.forEachChild((child) => {
        if (child.kind == typescript_1.default.SyntaxKind.JsxElement) {
            items.push(getJsxElement(child));
        }
        ;
    });
    return {
        name: tagName,
        props: props,
        items: items.length > 0 ? items : undefined,
    };
}
;
function parseUI(source, funcName) {
    let sourceFile = source.getSourceFile();
    let result;
    sourceFile.statements.forEach((node) => {
        var _a, _b;
        if (node.kind == typescript_1.default.SyntaxKind.ClassDeclaration) {
            let renderNode = parseMethodNode(node, funcName);
            (_b = (_a = renderNode === null || renderNode === void 0 ? void 0 : renderNode.body) === null || _a === void 0 ? void 0 : _a.statements) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
                if (node.kind == typescript_1.default.SyntaxKind.ReturnStatement) {
                    node.forEachChild((node) => {
                        if (node.kind == typescript_1.default.SyntaxKind.ParenthesizedExpression) {
                            node.forEachChild((node) => {
                                if (node.kind == typescript_1.default.SyntaxKind.JsxElement) {
                                    result = getJsxElement(node);
                                    return;
                                }
                                ;
                            });
                        }
                        else if (node.kind == typescript_1.default.SyntaxKind.JsxElement) {
                            result = getJsxElement(node);
                            return;
                        }
                        ;
                    });
                    if (result != undefined)
                        return;
                }
                ;
            });
            if (result != undefined)
                return;
        }
        ;
    });
    return result;
}
exports.parseUI = parseUI;
;
function generateJsxScript(component, indent) {
    component = component || {
        name: 'i-panel'
    };
    let indentStr = '';
    let result = '';
    let first = false;
    if (!indent) {
        first = true;
        indent = 1;
    }
    ;
    indent += 1;
    indentStr = '    '.repeat(indent);
    if (first)
        result = '<' + component.name;
    else
        result += indentStr + '<' + component.name;
    let firstProp = true;
    for (let name in component.props) {
        if (firstProp)
            result += '\n';
        firstProp = false;
        let value = component.props[name];
        if (value === true) {
            result += '    ' + indentStr + name + '\n';
            ;
        }
        else {
            result += '    ' + indentStr + name + '=' + value + '\n';
        }
        ;
    }
    ;
    if (first)
        result += '>\n';
    else
        result += indentStr + '>\n';
    if (component.items)
        result += component.items.map((item) => generateJsxScript(item, indent));
    result += indentStr + `</${component.name}>\n`;
    return result;
}
;
function replaceScript(script, fromPos, toPos, value) {
    let result = '';
    if (fromPos > 0)
        result += script.substring(0, fromPos);
    result += value;
    if (toPos < script.length)
        result += script.substring(toPos);
    return result;
}
;
function renderUI(source, funcName, component) {
    let sourceFile = source.getSourceFile();
    let result = source.getFullText();
    let origLength = result.length;
    sourceFile.statements.forEach((node) => {
        if (node.kind == typescript_1.default.SyntaxKind.ClassDeclaration) {
            let renderNode = parseMethodNode(node, funcName);
            if (renderNode === null || renderNode === void 0 ? void 0 : renderNode.body) {
                let script = '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '}';
                result = replaceScript(result, renderNode.body.pos, renderNode.body.end, script);
                sourceFile = sourceFile.update(result, { span: { start: renderNode.body.pos, length: renderNode.body.end - renderNode.body.pos }, newLength: script.length });
            }
            else {
                let script = '    ' + funcName + '()' + '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '};' + '\n}';
                result = replaceScript(result, node.end - 1, node.end, script);
                sourceFile = sourceFile.update(result, { span: { start: 0, length: origLength }, newLength: result.length });
            }
            ;
            return;
        }
        ;
    });
    return result;
}
exports.renderUI = renderUI;
;
