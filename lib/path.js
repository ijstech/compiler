"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SLASH = 47;
const DOT = 46;
function normalizeStringPosix(path, allowAboveRoot) {
    let res = '';
    let lastSlash = -1;
    let dots = 0;
    let code = void 0;
    let isAboveRoot = false;
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
            code = path.charCodeAt(i);
        }
        else if (code === SLASH) {
            break;
        }
        else {
            code = SLASH;
        }
        if (code === SLASH) {
            if (lastSlash === i - 1 || dots === 1) {
            }
            else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || !isAboveRoot ||
                    res.charCodeAt(res.length - 1) !== DOT ||
                    res.charCodeAt(res.length - 2) !== DOT) {
                    if (res.length > 2) {
                        const start = res.length - 1;
                        let j = start;
                        for (; j >= 0; --j) {
                            if (res.charCodeAt(j) === SLASH) {
                                break;
                            }
                        }
                        if (j !== start) {
                            res = (j === -1) ? '' : res.slice(0, j);
                            lastSlash = i;
                            dots = 0;
                            isAboveRoot = false;
                            continue;
                        }
                    }
                    else if (res.length === 2 || res.length === 1) {
                        res = '';
                        lastSlash = i;
                        dots = 0;
                        isAboveRoot = false;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) {
                        res += '/..';
                    }
                    else {
                        res = '..';
                    }
                    isAboveRoot = true;
                }
            }
            else {
                const slice = path.slice(lastSlash + 1, i);
                if (res.length > 0) {
                    res += '/' + slice;
                }
                else {
                    res = slice;
                }
                isAboveRoot = false;
            }
            lastSlash = i;
            dots = 0;
        }
        else if (code === DOT && dots !== -1) {
            ++dots;
        }
        else {
            dots = -1;
        }
    }
    return res;
}
;
function basename(path, ext) {
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path)
            return '';
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === SLASH) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    }
                    else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        if (start === end)
            end = firstNonSlashEnd;
        else if (end === -1)
            end = path.length;
        return path.slice(start, end);
    }
    else {
        for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === SLASH) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        ;
        if (end === -1)
            return '';
        return path.slice(start, end);
    }
    ;
}
;
function dirname(path) {
    if (!path)
        return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === SLASH;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
        code = path.charCodeAt(i);
        if (code === SLASH) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        }
        else {
            matchedSlash = false;
        }
    }
    if (end === -1)
        return hasRoot ? '/' : '.';
    if (hasRoot && end === 1)
        return '//';
    return path.slice(0, end);
}
;
function join(...paths) {
    if (arguments.length === 0)
        return '.';
    var joined;
    for (var i = 0; i < paths.length; ++i) {
        var arg = arguments[i];
        if (arg.length > 0) {
            if (joined === undefined)
                joined = arg;
            else
                joined += '/' + arg;
        }
    }
    if (joined === undefined)
        return '.';
    joined = joined.replaceAll('//', '/');
    return joined;
}
;
function relative(from, to) {
    if (from === to)
        return '';
    from = resolve(from);
    to = resolve(to);
    if (from === to)
        return '';
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47)
            break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47)
            break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                }
                else if (i === 0) {
                    return to.slice(toStart + i);
                }
            }
            else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                }
                else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
            break;
        else if (fromCode === 47)
            lastCommonSep = i;
    }
    var out = '';
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
                out += '..';
            else
                out += '/..';
        }
    }
    if (out.length > 0)
        return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47)
            ++toStart;
        return to.slice(toStart);
    }
}
;
function resolve(...paths) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for (let i = paths.length - 1; i >= 0 && !resolvedAbsolute; i--) {
        let path = paths[i];
        if (path.length === 0) {
            continue;
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = path.charCodeAt(0) === SLASH;
    }
    ;
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedPath.startsWith("."))
        return '';
    else if (resolvedAbsolute)
        return "/" + resolvedPath;
    else if (resolvedPath.length > 0)
        return resolvedPath;
    else
        return '';
}
;
exports.default = {
    basename,
    dirname,
    join,
    relative,
    resolve
};
