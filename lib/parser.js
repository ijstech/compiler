"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderUI = exports.parseUI = exports.locateMethod = exports.addEventHandler = exports.addComponentProp = exports.addComponentImports = exports.renameProperty = exports.renameMethod = exports.findComponentPropertyNodeIfNotExists = exports.findComponentImports = exports.findComponentImportNodeIfNotExists = exports.findModuleClassNode = exports.findPropertyNode = exports.findMethodNode = void 0;
const typescript_1 = __importDefault(require("./lib/typescript"));
;
function findMethodNode(source, funcName) {
    let node;
    if (typescript_1.default.isSourceFile(source))
        node = findModuleClassNode(source);
    else if (typescript_1.default.isClassDeclaration(source))
        node = source;
    if (node) {
        let propertyNode;
        let methodNode;
        for (let i = 0; i < node.members.length; i++) {
            let member = node.members[i];
            if (member.kind == typescript_1.default.SyntaxKind.MethodDeclaration) {
                if (!methodNode)
                    methodNode = member;
                let method = member;
                let name = method.name.getText();
                if (funcName == name) {
                    return {
                        node: method
                    };
                }
            }
            else if (member.kind == typescript_1.default.SyntaxKind.PropertyDeclaration) {
                propertyNode = member;
            }
        }
        ;
        if (methodNode)
            return {
                newPos: methodNode.pos
            };
        else if (propertyNode)
            return {
                newPos: propertyNode.end
            };
        else
            return {
                newPos: node.members.end
            };
    }
    ;
}
exports.findMethodNode = findMethodNode;
;
function findPropertyNode(node, name) {
    let result = node.members.find((member) => {
        if (member.kind == typescript_1.default.SyntaxKind.PropertyDeclaration) {
            let method = member;
            let name = method.name.getText();
            if (name == name) {
                return true;
            }
        }
        ;
    });
    return result;
}
exports.findPropertyNode = findPropertyNode;
;
function findModuleClassNode(source) {
    let result = source.statements.find((node) => {
        var _a;
        if (node.kind == typescript_1.default.SyntaxKind.ClassDeclaration) {
            let classNode = node;
            if (classNode.heritageClauses) {
                let heritageClause = classNode.heritageClauses[0];
                if (((_a = heritageClause.types[0]) === null || _a === void 0 ? void 0 : _a.expression.getText()) == 'Module') {
                    return true;
                }
                ;
            }
            ;
        }
        ;
    });
    return result;
}
exports.findModuleClassNode = findModuleClassNode;
;
function findComponentImportNodeIfNotExists(source, className) {
    var _a;
    let result;
    for (let i = 0; i < source.statements.length; i++) {
        let node = source.statements[i];
        if (node.kind == typescript_1.default.SyntaxKind.ImportDeclaration) {
            let importNode = node;
            let text = importNode.moduleSpecifier.getText();
            if (text == "'@ijstech/components'" || text == '"@ijstech/components"') {
                let namedImports = (_a = importNode.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
                if (namedImports) {
                    for (let j = 0; j < namedImports.elements.length; j++) {
                        let node = namedImports.elements[j];
                        if (node.kind == typescript_1.default.SyntaxKind.ImportSpecifier) {
                            node = node;
                            if (!result)
                                result = node.pos;
                            if (node.getText() == className)
                                return;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
        }
        else if (node.kind == typescript_1.default.SyntaxKind.ClassDeclaration)
            break;
    }
    ;
    return result;
}
exports.findComponentImportNodeIfNotExists = findComponentImportNodeIfNotExists;
;
function findComponentImports(source, classNames) {
    var _a;
    let result = {
        classNames: classNames,
        newPos: 0
    };
    for (let i = 0; i < source.statements.length; i++) {
        let node = source.statements[i];
        if (node.kind == typescript_1.default.SyntaxKind.ImportDeclaration) {
            let importNode = node;
            let text = importNode.moduleSpecifier.getText();
            if (text == "'@ijstech/components'" || text == '"@ijstech/components"') {
                let namedImports = (_a = importNode.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
                if (namedImports) {
                    for (let j = 0; j < namedImports.elements.length; j++) {
                        let node = namedImports.elements[j];
                        if (node.kind == typescript_1.default.SyntaxKind.ImportSpecifier) {
                            node = node;
                            if (!result.newPos)
                                result.newPos = node.pos;
                            let className = node.getText();
                            if (result.classNames.indexOf(className) >= 0)
                                result.classNames.splice(result.classNames.indexOf(className), 1);
                            if (result.classNames.length == 0)
                                return result;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
        }
        else if (node.kind == typescript_1.default.SyntaxKind.ClassDeclaration)
            break;
    }
    ;
    return result;
}
exports.findComponentImports = findComponentImports;
;
function findComponentPropertyNodeIfNotExists(classNode, id) {
    let result;
    if (classNode) {
        for (let i = 0; i < classNode.members.length; i++) {
            let node = classNode.members[i];
            if (!result)
                result = node.pos;
            if (node.kind == typescript_1.default.SyntaxKind.PropertyDeclaration) {
                let property = node;
                if (property.name.getText() == id)
                    return;
            }
            ;
        }
    }
    ;
    return result;
}
exports.findComponentPropertyNodeIfNotExists = findComponentPropertyNodeIfNotExists;
;
function insertTextAt(value, pos, text) {
    return value.substring(0, pos) + text + value.substring(pos);
}
;
function replaceTextAt(value, pos, fromText, toText) {
    return value.substring(0, pos) + toText + value.substring(pos + fromText.length);
}
;
function renameMethod(source, oldFunc, newFunc) {
    let result = source.text;
    let classNode = findModuleClassNode(source);
    if (classNode) {
        let methodNode = findMethodNode(classNode, oldFunc);
        if (methodNode === null || methodNode === void 0 ? void 0 : methodNode.node) {
            let start = methodNode.node.getStart();
            return replaceTextAt(result, start, oldFunc, newFunc);
        }
        ;
    }
    ;
    return result;
}
exports.renameMethod = renameMethod;
;
function renameProperty(source, className, oldName, newName) {
    let result = source.text;
    let classNode = findModuleClassNode(source);
    if (classNode) {
        if (!oldName) {
            return addComponentProp(source, className, newName);
        }
        else {
            let node = findPropertyNode(classNode, oldName);
            if (node) {
                let start = node.getStart();
                return replaceTextAt(result, start, oldName, newName);
            }
            ;
        }
    }
    ;
    return result;
}
exports.renameProperty = renameProperty;
;
function addComponentImports(source, classNames) {
    var _a;
    let result = findComponentImports(source, classNames);
    if (result.newPos && ((_a = result.classNames) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        let code = source.getFullText();
        result.classNames.forEach(className => {
            code = insertTextAt(code, result.newPos, className + ', ');
        });
        return code;
    }
    ;
}
exports.addComponentImports = addComponentImports;
;
function addComponentProp(source, className, id) {
    let result = source.getFullText();
    let classNode = findModuleClassNode(source);
    let importPos = findComponentImportNodeIfNotExists(source, className);
    if (classNode) {
        let propPos = findComponentPropertyNodeIfNotExists(classNode, id);
        if (propPos) {
            result = insertTextAt(result, propPos, `\n    ` + id + ': ' + className + ';');
        }
        ;
    }
    ;
    if (importPos) {
        result = insertTextAt(result, importPos, className + ', ');
    }
    ;
    return result;
}
exports.addComponentProp = addComponentProp;
;
function addEventHandler(source, classNames, funcName, params) {
    var _a;
    let result = source.getFullText();
    let classNode = findModuleClassNode(source);
    let imports = findComponentImports(source, classNames);
    let line = 0;
    if (classNode) {
        let node = findMethodNode(classNode, funcName);
        if (node === null || node === void 0 ? void 0 : node.newPos) {
            let pos = node.newPos;
            params = params || `target: ${classNames[0]}`;
            result = insertTextAt(result, pos, `\n    ${funcName}(${params}){\n        \n    };`);
            let p = source.getLineAndCharacterOfPosition(pos);
            line = p.line + 3;
        }
        else if (node === null || node === void 0 ? void 0 : node.node) {
            let pos = node.node.getStart();
            let p = source.getLineAndCharacterOfPosition(pos);
            line = p.line + 2;
        }
    }
    ;
    if (imports.newPos && ((_a = imports.classNames) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        imports.classNames.forEach(className => {
            result = insertTextAt(result, imports.newPos, className + ', ');
        });
    }
    ;
    return {
        lineNumber: line,
        columnNumber: 9,
        code: result
    };
}
exports.addEventHandler = addEventHandler;
;
function locateMethod(source, funcName) {
    let lineNumber = 0;
    let classNode = findModuleClassNode(source);
    if (classNode) {
        let node = findMethodNode(classNode, funcName);
        if (node === null || node === void 0 ? void 0 : node.node) {
            let pos = node.node.getStart();
            let p = source.getLineAndCharacterOfPosition(pos);
            lineNumber = p.line + 2;
        }
    }
    ;
    return {
        lineNumber: lineNumber,
        columnNumber: 9
    };
}
exports.locateMethod = locateMethod;
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
            let renderNode = findMethodNode(node, funcName);
            if (renderNode === null || renderNode === void 0 ? void 0 : renderNode.node) {
                (_b = (_a = renderNode.node.body) === null || _a === void 0 ? void 0 : _a.statements) === null || _b === void 0 ? void 0 : _b.forEach((node) => {
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
            }
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
    if (component.items) {
        for (let i = 0; i < component.items.length; i++) {
            let item = component.items[i];
            result += generateJsxScript(item, indent);
        }
    }
    ;
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
    var _a;
    let result = source.getFullText();
    let origLength = result.length;
    let node = findModuleClassNode(source);
    if (node) {
        let renderNode = findMethodNode(node, funcName);
        if ((_a = renderNode === null || renderNode === void 0 ? void 0 : renderNode.node) === null || _a === void 0 ? void 0 : _a.body) {
            let script = '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '}';
            result = replaceScript(result, renderNode.node.body.pos, renderNode.node.body.end, script);
        }
        else {
            let script = '    ' + funcName + '()' + '{\n' + '    '.repeat(2) + 'return ' + generateJsxScript(component) + '    ' + '};' + '\n}';
            result = replaceScript(result, node.end - 1, node.end, script);
        }
        ;
    }
    return result;
}
exports.renderUI = renderUI;
;
