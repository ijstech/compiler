const SLASH: number = 47;
const DOT: number = 46;
function normalizeStringPosix(path: string, allowAboveRoot: boolean): string {
    let res = '';
    let lastSlash = -1;
    let dots = 0;
    let code: number | undefined = void 0;
    let isAboveRoot = false;
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
            code = path.charCodeAt(i);
        } else if (code === SLASH) {
            break;
        } else {
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
                    } else if (res.length === 2 || res.length === 1) {
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
                    } else {
                        res = '..';
                    }
                    isAboveRoot = true;
                }
            } else {
                const slice = path.slice(lastSlash + 1, i);
                if (res.length > 0) {
                    res += '/' + slice;
                } else {
                    res = slice;
                }
                isAboveRoot = false;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === DOT && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
};
function basename(path: string, ext?: string) {
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return '';
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    // We saw the first non-path separator, remember this index in case
                    // we need it if the extension ends up not matching
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    // Try to match the explicit extension
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            // We matched the extension, so mark this as the end of our path
                            // component
                            end = i;
                        }
                    } else {
                        // Extension does not match, so our result is the entire path
                        // component
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    };
                };
            };
        };
        if (start === end) 
            end = firstNonSlashEnd
        else if (end === -1) 
            end = path.length;
        return path.slice(start, end);
    } 
    else {
        for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        };
        if (end === -1) 
            return '';
        return path.slice(start, end);
    };
};
function dirname(path: string) {
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
};
function join(...paths: string[]) {
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
};
function relative(from: string, to: string) {
    if (from === to) return '';

    from = resolve(from);
    to = resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
};
function resolve(...paths: string[]): string {
    let resolvedPath: string = "";
    let resolvedAbsolute: boolean = false;

    for (let i = paths.length - 1; i >= 0 && !resolvedAbsolute; i--) {
        let path = paths[i];
        if (path.length === 0) {
            continue;
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = path.charCodeAt(0) === SLASH;
    };
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedPath.startsWith("."))
        return ''
    else if (resolvedAbsolute)
        return "/" + resolvedPath
    else if (resolvedPath.length > 0)
        return resolvedPath
    else
        return '';
};
export default {
    basename,
    dirname,
    join,
    relative,
    resolve
};