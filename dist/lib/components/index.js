/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(5a1b4999493d49c857497ad481d73a737439f305)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 * Please make sure to make edits in the .ts file at https://github.com/microsoft/vscode-loader/
 *---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------*/
var $JSX = function(...params){
  this.$render.apply(this, params);
};
var _amdLoaderGlobal = this;
var _currentDefineModule;
var _defined = {};
var _commonjsGlobal = typeof global === 'object' ? global : {};
var AMDLoader;
(function (AMDLoader) {
    AMDLoader.global = _amdLoaderGlobal;
    var Environment = /** @class */ (function () {
        function Environment() {
            this._detected = false;
            this._isWindows = false;
            this._isNode = false;
            this._isElectronRenderer = false;
            this._isWebWorker = false;
            this._isElectronNodeIntegrationWebWorker = false;
        }
        Object.defineProperty(Environment.prototype, "isWindows", {
            get: function () {
                this._detect();
                return this._isWindows;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Environment.prototype, "isNode", {
            get: function () {
                this._detect();
                return this._isNode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Environment.prototype, "isElectronRenderer", {
            get: function () {
                this._detect();
                return this._isElectronRenderer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Environment.prototype, "isWebWorker", {
            get: function () {
                this._detect();
                return this._isWebWorker;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Environment.prototype, "isElectronNodeIntegrationWebWorker", {
            get: function () {
                this._detect();
                return this._isElectronNodeIntegrationWebWorker;
            },
            enumerable: false,
            configurable: true
        });
        Environment.prototype._detect = function () {
            if (this._detected) {
                return;
            }
            this._detected = true;
            this._isWindows = Environment._isWindows();
            this._isNode = (typeof module !== 'undefined' && !!module.exports);
            this._isElectronRenderer = (typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.electron !== 'undefined' && process.type === 'renderer');
            this._isWebWorker = (typeof AMDLoader.global.importScripts === 'function');
            this._isElectronNodeIntegrationWebWorker = this._isWebWorker && (typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.electron !== 'undefined' && process.type === 'worker');
        };
        Environment._isWindows = function () {
            if (typeof navigator !== 'undefined') {
                if (navigator.userAgent && navigator.userAgent.indexOf('Windows') >= 0) {
                    return true;
                }
            }
            if (typeof process !== 'undefined') {
                return (process.platform === 'win32');
            }
            return false;
        };
        return Environment;
    }());
    AMDLoader.Environment = Environment;
})(AMDLoader || (AMDLoader = {}));
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var AMDLoader;
(function (AMDLoader) {
    var LoaderEvent = /** @class */ (function () {
        function LoaderEvent(type, detail, timestamp) {
            this.type = type;
            this.detail = detail;
            this.timestamp = timestamp;
        }
        return LoaderEvent;
    }());
    AMDLoader.LoaderEvent = LoaderEvent;
    var LoaderEventRecorder = /** @class */ (function () {
        function LoaderEventRecorder(loaderAvailableTimestamp) {
            this._events = [new LoaderEvent(1 /* LoaderAvailable */, '', loaderAvailableTimestamp)];
        }
        LoaderEventRecorder.prototype.record = function (type, detail) {
            this._events.push(new LoaderEvent(type, detail, AMDLoader.Utilities.getHighPerformanceTimestamp()));
        };
        LoaderEventRecorder.prototype.getEvents = function () {
            return this._events;
        };
        return LoaderEventRecorder;
    }());
    AMDLoader.LoaderEventRecorder = LoaderEventRecorder;
    var NullLoaderEventRecorder = /** @class */ (function () {
        function NullLoaderEventRecorder() {
        }
        NullLoaderEventRecorder.prototype.record = function (type, detail) {
            // Nothing to do
        };
        NullLoaderEventRecorder.prototype.getEvents = function () {
            return [];
        };
        NullLoaderEventRecorder.INSTANCE = new NullLoaderEventRecorder();
        return NullLoaderEventRecorder;
    }());
    AMDLoader.NullLoaderEventRecorder = NullLoaderEventRecorder;
})(AMDLoader || (AMDLoader = {}));
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var AMDLoader;
(function (AMDLoader) {
    var Utilities = /** @class */ (function () {
        function Utilities() {
        }
        /**
         * This method does not take care of / vs \
         */
        Utilities.fileUriToFilePath = function (isWindows, uri) {
            uri = decodeURI(uri).replace(/%23/g, '#');
            if (isWindows) {
                if (/^file:\/\/\//.test(uri)) {
                    // This is a URI without a hostname => return only the path segment
                    return uri.substr(8);
                }
                if (/^file:\/\//.test(uri)) {
                    return uri.substr(5);
                }
            }
            else {
                if (/^file:\/\//.test(uri)) {
                    return uri.substr(7);
                }
            }
            // Not sure...
            return uri;
        };
        Utilities.startsWith = function (haystack, needle) {
            return haystack.length >= needle.length && haystack.substr(0, needle.length) === needle;
        };
        Utilities.endsWith = function (haystack, needle) {
            return haystack.length >= needle.length && haystack.substr(haystack.length - needle.length) === needle;
        };
        // only check for "?" before "#" to ensure that there is a real Query-String
        Utilities.containsQueryString = function (url) {
            return /^[^\#]*\?/gi.test(url);
        };
        /**
         * Does `url` start with http:// or https:// or file:// or / ?
         */
        Utilities.isAbsolutePath = function (url) {
            return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(url);
        };
        Utilities.forEachProperty = function (obj, callback) {
            if (obj) {
                var key = void 0;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        callback(key, obj[key]);
                    }
                }
            }
        };
        Utilities.isEmpty = function (obj) {
            var isEmpty = true;
            Utilities.forEachProperty(obj, function () {
                isEmpty = false;
            });
            return isEmpty;
        };
        Utilities.recursiveClone = function (obj) {
            if (!obj || typeof obj !== 'object' || obj instanceof RegExp) {
                return obj;
            }
            if (!Array.isArray(obj) && Object.getPrototypeOf(obj) !== Object.prototype) {
                // only clone "simple" objects
                return obj;
            }
            var result = Array.isArray(obj) ? [] : {};
            Utilities.forEachProperty(obj, function (key, value) {
                if (value && typeof value === 'object') {
                    result[key] = Utilities.recursiveClone(value);
                }
                else {
                    result[key] = value;
                }
            });
            return result;
        };
        Utilities.generateAnonymousModule = function () {
            return '===anonymous' + (Utilities.NEXT_ANONYMOUS_ID++) + '===';
        };
        Utilities.isAnonymousModule = function (id) {
            return Utilities.startsWith(id, '===anonymous');
        };
        Utilities.getHighPerformanceTimestamp = function () {
            if (!this.PERFORMANCE_NOW_PROBED) {
                this.PERFORMANCE_NOW_PROBED = true;
                this.HAS_PERFORMANCE_NOW = (AMDLoader.global.performance && typeof AMDLoader.global.performance.now === 'function');
            }
            return (this.HAS_PERFORMANCE_NOW ? AMDLoader.global.performance.now() : Date.now());
        };
        Utilities.NEXT_ANONYMOUS_ID = 1;
        Utilities.PERFORMANCE_NOW_PROBED = false;
        Utilities.HAS_PERFORMANCE_NOW = false;
        return Utilities;
    }());
    AMDLoader.Utilities = Utilities;
})(AMDLoader || (AMDLoader = {}));
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var AMDLoader;
(function (AMDLoader) {
    function ensureError(err) {
        if (err instanceof Error) {
            return err;
        }
        var result = new Error(err.message || String(err) || 'Unknown Error');
        if (err.stack) {
            result.stack = err.stack;
        }
        return result;
    }
    AMDLoader.ensureError = ensureError;
    ;
    var ConfigurationOptionsUtil = /** @class */ (function () {
        function ConfigurationOptionsUtil() {
        }
        /**
         * Ensure configuration options make sense
         */
        ConfigurationOptionsUtil.validateConfigurationOptions = function (options) {
            function defaultOnError(err) {
                if (err.phase === 'loading') {
                    console.error('Loading "' + err.moduleId + '" failed');
                    console.error(err);
                    console.error('Here are the modules that depend on it:');
                    console.error(err.neededBy);
                    return;
                }
                if (err.phase === 'factory') {
                    console.error('The factory method of "' + err.moduleId + '" has thrown an exception');
                    console.error(err);
                    return;
                }
            }
            options = options || {};
            if (typeof options.baseUrl !== 'string') {
                options.baseUrl = '';
            }
            if (typeof options.isBuild !== 'boolean') {
                options.isBuild = false;
            }
            if (typeof options.paths !== 'object') {
                options.paths = {};
            }
            if (typeof options.config !== 'object') {
                options.config = {};
            }
            if (typeof options.catchError === 'undefined') {
                options.catchError = false;
            }
            if (typeof options.recordStats === 'undefined') {
                options.recordStats = false;
            }
            if (typeof options.urlArgs !== 'string') {
                options.urlArgs = '';
            }
            if (typeof options.onError !== 'function') {
                options.onError = defaultOnError;
            }
            if (!Array.isArray(options.ignoreDuplicateModules)) {
                options.ignoreDuplicateModules = [];
            }
            if (options.baseUrl.length > 0) {
                if (!AMDLoader.Utilities.endsWith(options.baseUrl, '/')) {
                    options.baseUrl += '/';
                }
            }
            if (typeof options.cspNonce !== 'string') {
                options.cspNonce = '';
            }
            if (typeof options.preferScriptTags === 'undefined') {
                options.preferScriptTags = false;
            }
            if (!Array.isArray(options.nodeModules)) {
                options.nodeModules = [];
            }
            if (options.nodeCachedData && typeof options.nodeCachedData === 'object') {
                if (typeof options.nodeCachedData.seed !== 'string') {
                    options.nodeCachedData.seed = 'seed';
                }
                if (typeof options.nodeCachedData.writeDelay !== 'number' || options.nodeCachedData.writeDelay < 0) {
                    options.nodeCachedData.writeDelay = 1000 * 7;
                }
                if (!options.nodeCachedData.path || typeof options.nodeCachedData.path !== 'string') {
                    var err = ensureError(new Error('INVALID cached data configuration, \'path\' MUST be set'));
                    err.phase = 'configuration';
                    options.onError(err);
                    options.nodeCachedData = undefined;
                }
            }
            return options;
        };
        ConfigurationOptionsUtil.mergeConfigurationOptions = function (overwrite, base) {
            if (overwrite === void 0) { overwrite = null; }
            if (base === void 0) { base = null; }
            var result = AMDLoader.Utilities.recursiveClone(base || {});
            // Merge known properties and overwrite the unknown ones
            AMDLoader.Utilities.forEachProperty(overwrite, function (key, value) {
                if (key === 'ignoreDuplicateModules' && typeof result.ignoreDuplicateModules !== 'undefined') {
                    result.ignoreDuplicateModules = result.ignoreDuplicateModules.concat(value);
                }
                else if (key === 'paths' && typeof result.paths !== 'undefined') {
                    AMDLoader.Utilities.forEachProperty(value, function (key2, value2) { return result.paths[key2] = value2; });
                }
                else if (key === 'config' && typeof result.config !== 'undefined') {
                    AMDLoader.Utilities.forEachProperty(value, function (key2, value2) { return result.config[key2] = value2; });
                }
                else {
                    result[key] = AMDLoader.Utilities.recursiveClone(value);
                }
            });
            return ConfigurationOptionsUtil.validateConfigurationOptions(result);
        };
        return ConfigurationOptionsUtil;
    }());
    AMDLoader.ConfigurationOptionsUtil = ConfigurationOptionsUtil;
    var Configuration = /** @class */ (function () {
        function Configuration(env, options) {
            this._env = env;
            this.options = ConfigurationOptionsUtil.mergeConfigurationOptions(options);
            this._createIgnoreDuplicateModulesMap();
            this._createNodeModulesMap();
            this._createSortedPathsRules();
            if (this.options.baseUrl === '') {
                if (this.options.nodeRequire && this.options.nodeRequire.main && this.options.nodeRequire.main.filename && this._env.isNode) {
                    var nodeMain = this.options.nodeRequire.main.filename;
                    var dirnameIndex = Math.max(nodeMain.lastIndexOf('/'), nodeMain.lastIndexOf('\\'));
                    this.options.baseUrl = nodeMain.substring(0, dirnameIndex + 1);
                }
                if (this.options.nodeMain && this._env.isNode) {
                    var nodeMain = this.options.nodeMain;
                    var dirnameIndex = Math.max(nodeMain.lastIndexOf('/'), nodeMain.lastIndexOf('\\'));
                    this.options.baseUrl = nodeMain.substring(0, dirnameIndex + 1);
                }
            }
        }
        Configuration.prototype._createIgnoreDuplicateModulesMap = function () {
            // Build a map out of the ignoreDuplicateModules array
            this.ignoreDuplicateModulesMap = {};
            for (var i = 0; i < this.options.ignoreDuplicateModules.length; i++) {
                this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[i]] = true;
            }
        };
        Configuration.prototype._createNodeModulesMap = function () {
            // Build a map out of nodeModules array
            this.nodeModulesMap = Object.create(null);
            for (var _i = 0, _a = this.options.nodeModules; _i < _a.length; _i++) {
                var nodeModule = _a[_i];
                this.nodeModulesMap[nodeModule] = true;
            }
        };
        Configuration.prototype._createSortedPathsRules = function () {
            var _this = this;
            // Create an array our of the paths rules, sorted descending by length to
            // result in a more specific -> less specific order
            this.sortedPathsRules = [];
            AMDLoader.Utilities.forEachProperty(this.options.paths, function (from, to) {
                if (!Array.isArray(to)) {
                    _this.sortedPathsRules.push({
                        from: from,
                        to: [to]
                    });
                }
                else {
                    _this.sortedPathsRules.push({
                        from: from,
                        to: to
                    });
                }
            });
            this.sortedPathsRules.sort(function (a, b) {
                return b.from.length - a.from.length;
            });
        };
        /**
         * Clone current configuration and overwrite options selectively.
         * @param options The selective options to overwrite with.
         * @result A new configuration
         */
        Configuration.prototype.cloneAndMerge = function (options) {
            return new Configuration(this._env, ConfigurationOptionsUtil.mergeConfigurationOptions(options, this.options));
        };
        /**
         * Get current options bag. Useful for passing it forward to plugins.
         */
        Configuration.prototype.getOptionsLiteral = function () {
            return this.options;
        };
        Configuration.prototype._applyPaths = function (moduleId) {
            var pathRule;
            for (var i = 0, len = this.sortedPathsRules.length; i < len; i++) {
                pathRule = this.sortedPathsRules[i];
                if (AMDLoader.Utilities.startsWith(moduleId, pathRule.from)) {
                    var result = [];
                    for (var j = 0, lenJ = pathRule.to.length; j < lenJ; j++) {
                        result.push(pathRule.to[j] + moduleId.substr(pathRule.from.length));
                    }
                    return result;
                }
            }
            return [moduleId];
        };
        Configuration.prototype._addUrlArgsToUrl = function (url) {
            if (AMDLoader.Utilities.containsQueryString(url)) {
                return url + '&' + this.options.urlArgs;
            }
            else {
                return url + '?' + this.options.urlArgs;
            }
        };
        Configuration.prototype._addUrlArgsIfNecessaryToUrl = function (url) {
            if (this.options.urlArgs) {
                return this._addUrlArgsToUrl(url);
            }
            return url;
        };
        Configuration.prototype._addUrlArgsIfNecessaryToUrls = function (urls) {
            if (this.options.urlArgs) {
                for (var i = 0, len = urls.length; i < len; i++) {
                    urls[i] = this._addUrlArgsToUrl(urls[i]);
                }
            }
            return urls;
        };
        /**
         * Transform a module id to a location. Appends .js to module ids
         */
        Configuration.prototype.moduleIdToPaths = function (moduleId) {
            if (this._env.isNode) {
                var isNodeModule = ((this.nodeModulesMap[moduleId] === true)
                    || (this.options.amdModulesPattern instanceof RegExp && !this.options.amdModulesPattern.test(moduleId)));
                if (isNodeModule) {
                    // This is a node module...
                    if (this.isBuild()) {
                        // ...and we are at build time, drop it
                        return ['empty:'];
                    }
                    else {
                        // ...and at runtime we create a `shortcut`-path
                        return ['node|' + moduleId];
                    }
                }
            }
            var result = moduleId;
            var results;
            if (!AMDLoader.Utilities.endsWith(result, '.js') && !AMDLoader.Utilities.isAbsolutePath(result)) {
                results = this._applyPaths(result);
                for (var i = 0, len = results.length; i < len; i++) {
                    if (this.isBuild() && results[i] === 'empty:') {
                        continue;
                    }
                    if (!AMDLoader.Utilities.isAbsolutePath(results[i])) {
                        results[i] = this.options.baseUrl + results[i];
                    }
                    if (!AMDLoader.Utilities.endsWith(results[i], '.js') && !AMDLoader.Utilities.containsQueryString(results[i])) {
                        results[i] = results[i] + '.js';
                    }
                }
            }
            else {
                if (!AMDLoader.Utilities.endsWith(result, '.js') && !AMDLoader.Utilities.containsQueryString(result)) {
                    result = result + '.js';
                }
                results = [result];
            }
            return this._addUrlArgsIfNecessaryToUrls(results);
        };
        /**
         * Transform a module id or url to a location.
         */
        Configuration.prototype.requireToUrl = function (url) {
            var result = url;
            if (!AMDLoader.Utilities.isAbsolutePath(result)) {
                result = this._applyPaths(result)[0];
                if (!AMDLoader.Utilities.isAbsolutePath(result)) {
                    result = this.options.baseUrl + result;
                }
            }
            return this._addUrlArgsIfNecessaryToUrl(result);
        };
        /**
         * Flag to indicate if current execution is as part of a build.
         */
        Configuration.prototype.isBuild = function () {
            return this.options.isBuild;
        };
        /**
         * Test if module `moduleId` is expected to be defined multiple times
         */
        Configuration.prototype.isDuplicateMessageIgnoredFor = function (moduleId) {
            return this.ignoreDuplicateModulesMap.hasOwnProperty(moduleId);
        };
        /**
         * Get the configuration settings for the provided module id
         */
        Configuration.prototype.getConfigForModule = function (moduleId) {
            if (this.options.config) {
                return this.options.config[moduleId];
            }
        };
        /**
         * Should errors be caught when executing module factories?
         */
        Configuration.prototype.shouldCatchError = function () {
            return this.options.catchError;
        };
        /**
         * Should statistics be recorded?
         */
        Configuration.prototype.shouldRecordStats = function () {
            return this.options.recordStats;
        };
        /**
         * Forward an error to the error handler.
         */
        Configuration.prototype.onError = function (err) {
            this.options.onError(err);
        };
        return Configuration;
    }());
    AMDLoader.Configuration = Configuration;
})(AMDLoader || (AMDLoader = {}));
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var AMDLoader;
(function (AMDLoader) {
    /**
     * Load `scriptSrc` only once (avoid multiple <script> tags)
     */
    var OnlyOnceScriptLoader = /** @class */ (function () {
        function OnlyOnceScriptLoader(env) {
            this._env = env;
            this._scriptLoader = null;
            this._callbackMap = {};
        }
        OnlyOnceScriptLoader.prototype.load = function (moduleManager, scriptSrc, callback, errorback) {
            var _this = this;
            if (!this._scriptLoader) {
                if (this._env.isWebWorker) {
                    this._scriptLoader = new WorkerScriptLoader();
                }
                else if (this._env.isElectronRenderer) {
                    var preferScriptTags = moduleManager.getConfig().getOptionsLiteral().preferScriptTags;
                    if (preferScriptTags) {
                        this._scriptLoader = new BrowserScriptLoader();
                    }
                    else {
                        this._scriptLoader = new NodeScriptLoader(this._env);
                    }
                }
                else if (this._env.isNode) {
                    this._scriptLoader = new NodeScriptLoader(this._env);
                }
                else {
                    this._scriptLoader = new BrowserScriptLoader();
                }
            }
            var scriptCallbacks = {
                callback: callback,
                errorback: errorback
            };
            if (this._callbackMap.hasOwnProperty(scriptSrc)) {
                this._callbackMap[scriptSrc].push(scriptCallbacks);
                return;
            }
            this._callbackMap[scriptSrc] = [scriptCallbacks];
            this._scriptLoader.load(moduleManager, scriptSrc, function () { return _this.triggerCallback(scriptSrc); }, function (err) { return _this.triggerErrorback(scriptSrc, err); });
        };
        OnlyOnceScriptLoader.prototype.triggerCallback = function (scriptSrc) {
            var scriptCallbacks = this._callbackMap[scriptSrc];
            delete this._callbackMap[scriptSrc];
            for (var i = 0; i < scriptCallbacks.length; i++) {
                scriptCallbacks[i].callback();
            }
        };
        OnlyOnceScriptLoader.prototype.triggerErrorback = function (scriptSrc, err) {
            var scriptCallbacks = this._callbackMap[scriptSrc];
            delete this._callbackMap[scriptSrc];
            for (var i = 0; i < scriptCallbacks.length; i++) {
                scriptCallbacks[i].errorback(err);
            }
        };
        return OnlyOnceScriptLoader;
    }());
    var BrowserScriptLoader = /** @class */ (function () {
        function BrowserScriptLoader() {
        }
        /**
         * Attach load / error listeners to a script element and remove them when either one has fired.
         * Implemented for browsers supporting HTML5 standard 'load' and 'error' events.
         */
        BrowserScriptLoader.prototype.attachListeners = function (script, callback, errorback) {
            var unbind = function () {
                script.removeEventListener('load', loadEventListener);
                script.removeEventListener('error', errorEventListener);
            };
            var loadEventListener = function (e) {
                unbind();
                callback();
            };
            var errorEventListener = function (e) {
                unbind();
                errorback(e);
            };
            script.addEventListener('load', loadEventListener);
            script.addEventListener('error', errorEventListener);
        };
        BrowserScriptLoader.prototype.load = function (moduleManager, scriptSrc, callback, errorback) {
            if (/^node\|/.test(scriptSrc)) {
                var opts = moduleManager.getConfig().getOptionsLiteral();
                var nodeRequire = ensureRecordedNodeRequire(moduleManager.getRecorder(), (opts.nodeRequire || AMDLoader.global.nodeRequire));
                var pieces = scriptSrc.split('|');
                var moduleExports_1 = null;
                try {
                    moduleExports_1 = nodeRequire(pieces[1]);
                }
                catch (err) {
                    errorback(err);
                    return;
                }
                moduleManager.enqueueDefineAnonymousModule([], function () { return moduleExports_1; });
                callback();
            }
            else {
                var script = document.createElement('script');
                script.setAttribute('async', 'async');
                script.setAttribute('type', 'text/javascript');
                this.attachListeners(script, callback, errorback);
                var trustedTypesPolicy = moduleManager.getConfig().getOptionsLiteral().trustedTypesPolicy;
                if (trustedTypesPolicy) {
                    scriptSrc = trustedTypesPolicy.createScriptURL(scriptSrc);
                }
                script.setAttribute('src', scriptSrc);
                // Propagate CSP nonce to dynamically created script tag.
                var cspNonce = moduleManager.getConfig().getOptionsLiteral().cspNonce;
                if (cspNonce) {
                    script.setAttribute('nonce', cspNonce);
                }
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        };
        return BrowserScriptLoader;
    }());
    function canUseEval(moduleManager) {
        var trustedTypesPolicy = moduleManager.getConfig().getOptionsLiteral().trustedTypesPolicy;
        try {
            var func = (trustedTypesPolicy
                ? self.eval(trustedTypesPolicy.createScript('', 'true'))
                : new Function('true'));
            func.call(self);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    var WorkerScriptLoader = /** @class */ (function () {
        function WorkerScriptLoader() {
            this._cachedCanUseEval = null;
        }
        WorkerScriptLoader.prototype._canUseEval = function (moduleManager) {
            if (this._cachedCanUseEval === null) {
                this._cachedCanUseEval = canUseEval(moduleManager);
            }
            return this._cachedCanUseEval;
        };
        WorkerScriptLoader.prototype.load = function (moduleManager, scriptSrc, callback, errorback) {
            if (/^node\|/.test(scriptSrc)) {
                var opts = moduleManager.getConfig().getOptionsLiteral();
                var nodeRequire = ensureRecordedNodeRequire(moduleManager.getRecorder(), (opts.nodeRequire || AMDLoader.global.nodeRequire));
                var pieces = scriptSrc.split('|');
                var moduleExports_2 = null;
                try {
                    moduleExports_2 = nodeRequire(pieces[1]);
                }
                catch (err) {
                    errorback(err);
                    return;
                }
                moduleManager.enqueueDefineAnonymousModule([], function () { return moduleExports_2; });
                callback();
            }
            else {
                var trustedTypesPolicy_1 = moduleManager.getConfig().getOptionsLiteral().trustedTypesPolicy;
                var isCrossOrigin = (/^((http:)|(https:)|(file:))/.test(scriptSrc) && scriptSrc.substring(0, self.origin.length) !== self.origin);
                if (!isCrossOrigin && this._canUseEval(moduleManager)) {
                    // use `fetch` if possible because `importScripts`
                    // is synchronous and can lead to deadlocks on Safari
                    fetch(scriptSrc).then(function (response) {
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        return response.text();
                    }).then(function (text) {
                        text = text + "\n//# sourceURL=" + scriptSrc;
                        var func = (trustedTypesPolicy_1
                            ? self.eval(trustedTypesPolicy_1.createScript('', text))
                            : new Function(text));
                        func.call(self);
                        callback();
                    }).then(undefined, errorback);
                    return;
                }
                try {
                    if (trustedTypesPolicy_1) {
                        scriptSrc = trustedTypesPolicy_1.createScriptURL(scriptSrc);
                    }
                    importScripts(scriptSrc);
                    callback();
                }
                catch (e) {
                    errorback(e);
                }
            }
        };
        return WorkerScriptLoader;
    }());
    var NodeScriptLoader = /** @class */ (function () {
        function NodeScriptLoader(env) {
            this._env = env;
            this._didInitialize = false;
            this._didPatchNodeRequire = false;
        }
        NodeScriptLoader.prototype._init = function (nodeRequire) {
            if (this._didInitialize) {
                return;
            }
            this._didInitialize = true;
            // capture node modules
            this._fs = nodeRequire('fs');
            this._vm = nodeRequire('vm');
            this._path = nodeRequire('path');
            this._crypto = nodeRequire('crypto');
        };
        // patch require-function of nodejs such that we can manually create a script
        // from cached data. this is done by overriding the `Module._compile` function
        NodeScriptLoader.prototype._initNodeRequire = function (nodeRequire, moduleManager) {
            // It is important to check for `nodeCachedData` first and then set `_didPatchNodeRequire`.
            // That's because `nodeCachedData` is set _after_ calling this for the first time...
            var nodeCachedData = moduleManager.getConfig().getOptionsLiteral().nodeCachedData;
            if (!nodeCachedData) {
                return;
            }
            if (this._didPatchNodeRequire) {
                return;
            }
            this._didPatchNodeRequire = true;
            var that = this;
            var Module = nodeRequire('module');
            function makeRequireFunction(mod) {
                var Module = mod.constructor;
                var require = function require(path) {
                    try {
                        return mod.require(path);
                    }
                    finally {
                        // nothing
                    }
                };
                require.resolve = function resolve(request, options) {
                    return Module._resolveFilename(request, mod, false, options);
                };
                require.resolve.paths = function paths(request) {
                    return Module._resolveLookupPaths(request, mod);
                };
                require.main = process.mainModule;
                require.extensions = Module._extensions;
                require.cache = Module._cache;
                return require;
            }
            Module.prototype._compile = function (content, filename) {
                // remove shebang and create wrapper function
                var scriptSource = Module.wrap(content.replace(/^#!.*/, ''));
                // create script
                var recorder = moduleManager.getRecorder();
                var cachedDataPath = that._getCachedDataPath(nodeCachedData, filename);
                var options = { filename: filename };
                var hashData;
                try {
                    var data = that._fs.readFileSync(cachedDataPath);
                    hashData = data.slice(0, 16);
                    options.cachedData = data.slice(16);
                    recorder.record(60 /* CachedDataFound */, cachedDataPath);
                }
                catch (_e) {
                    recorder.record(61 /* CachedDataMissed */, cachedDataPath);
                }
                var script = new that._vm.Script(scriptSource, options);
                var compileWrapper = script.runInThisContext(options);
                // run script
                var dirname = that._path.dirname(filename);
                var require = makeRequireFunction(this);
                var args = [this.exports, require, this, filename, dirname, process, _commonjsGlobal, Buffer];
                var result = compileWrapper.apply(this.exports, args);
                // cached data aftermath
                that._handleCachedData(script, scriptSource, cachedDataPath, !options.cachedData, moduleManager);
                that._verifyCachedData(script, scriptSource, cachedDataPath, hashData, moduleManager);
                return result;
            };
        };
        NodeScriptLoader.prototype.load = function (moduleManager, scriptSrc, callback, errorback) {
            var _this = this;
            var opts = moduleManager.getConfig().getOptionsLiteral();
            var nodeRequire = ensureRecordedNodeRequire(moduleManager.getRecorder(), (opts.nodeRequire || AMDLoader.global.nodeRequire));
            var nodeInstrumenter = (opts.nodeInstrumenter || function (c) { return c; });
            this._init(nodeRequire);
            this._initNodeRequire(nodeRequire, moduleManager);
            var recorder = moduleManager.getRecorder();
            if (/^node\|/.test(scriptSrc)) {
                var pieces = scriptSrc.split('|');
                var moduleExports_3 = null;
                try {
                    moduleExports_3 = nodeRequire(pieces[1]);
                }
                catch (err) {
                    errorback(err);
                    return;
                }
                moduleManager.enqueueDefineAnonymousModule([], function () { return moduleExports_3; });
                callback();
            }
            else {
                scriptSrc = AMDLoader.Utilities.fileUriToFilePath(this._env.isWindows, scriptSrc);
                var normalizedScriptSrc_1 = this._path.normalize(scriptSrc);
                var vmScriptPathOrUri_1 = this._getElectronRendererScriptPathOrUri(normalizedScriptSrc_1);
                var wantsCachedData_1 = Boolean(opts.nodeCachedData);
                var cachedDataPath_1 = wantsCachedData_1 ? this._getCachedDataPath(opts.nodeCachedData, scriptSrc) : undefined;
                this._readSourceAndCachedData(normalizedScriptSrc_1, cachedDataPath_1, recorder, function (err, data, cachedData, hashData) {
                    if (err) {
                        errorback(err);
                        return;
                    }
                    var scriptSource;
                    if (data.charCodeAt(0) === NodeScriptLoader._BOM) {
                        scriptSource = NodeScriptLoader._PREFIX + data.substring(1) + NodeScriptLoader._SUFFIX;
                    }
                    else {
                        scriptSource = NodeScriptLoader._PREFIX + data + NodeScriptLoader._SUFFIX;
                    }
                    scriptSource = nodeInstrumenter(scriptSource, normalizedScriptSrc_1);
                    var scriptOpts = { filename: vmScriptPathOrUri_1, cachedData: cachedData };
                    var script = _this._createAndEvalScript(moduleManager, scriptSource, scriptOpts, callback, errorback);
                    _this._handleCachedData(script, scriptSource, cachedDataPath_1, wantsCachedData_1 && !cachedData, moduleManager);
                    _this._verifyCachedData(script, scriptSource, cachedDataPath_1, hashData, moduleManager);
                });
            }
        };
        NodeScriptLoader.prototype._createAndEvalScript = function (moduleManager, contents, options, callback, errorback) {
            var recorder = moduleManager.getRecorder();
            recorder.record(31 /* NodeBeginEvaluatingScript */, options.filename);
            var script = new this._vm.Script(contents, options);
            var ret = script.runInThisContext(options);
            var globalDefineFunc = moduleManager.getGlobalAMDDefineFunc();
            var receivedDefineCall = false;
            var localDefineFunc = function () {
                receivedDefineCall = true;
                return globalDefineFunc.apply(null, arguments);
            };
            localDefineFunc.amd = globalDefineFunc.amd;
            ret.call(AMDLoader.global, moduleManager.getGlobalAMDRequireFunc(), localDefineFunc, options.filename, this._path.dirname(options.filename));
            recorder.record(32 /* NodeEndEvaluatingScript */, options.filename);
            if (receivedDefineCall) {
                callback();
            }
            else {
                errorback(new Error("Didn't receive define call in " + options.filename + "!"));
            }
            return script;
        };
        NodeScriptLoader.prototype._getElectronRendererScriptPathOrUri = function (path) {
            if (!this._env.isElectronRenderer) {
                return path;
            }
            var driveLetterMatch = path.match(/^([a-z])\:(.*)/i);
            if (driveLetterMatch) {
                // windows
                return "file:///" + (driveLetterMatch[1].toUpperCase() + ':' + driveLetterMatch[2]).replace(/\\/g, '/');
            }
            else {
                // nix
                return "file://" + path;
            }
        };
        NodeScriptLoader.prototype._getCachedDataPath = function (config, filename) {
            var hash = this._crypto.createHash('md5').update(filename, 'utf8').update(config.seed, 'utf8').update(process.arch, '').digest('hex');
            var basename = this._path.basename(filename).replace(/\.js$/, '');
            return this._path.join(config.path, basename + "-" + hash + ".code");
        };
        NodeScriptLoader.prototype._handleCachedData = function (script, scriptSource, cachedDataPath, createCachedData, moduleManager) {
            var _this = this;
            if (script.cachedDataRejected) {
                // cached data got rejected -> delete and re-create
                this._fs.unlink(cachedDataPath, function (err) {
                    moduleManager.getRecorder().record(62 /* CachedDataRejected */, cachedDataPath);
                    _this._createAndWriteCachedData(script, scriptSource, cachedDataPath, moduleManager);
                    if (err) {
                        moduleManager.getConfig().onError(err);
                    }
                });
            }
            else if (createCachedData) {
                // no cached data, but wanted
                this._createAndWriteCachedData(script, scriptSource, cachedDataPath, moduleManager);
            }
        };
        // Cached data format: | SOURCE_HASH | V8_CACHED_DATA |
        // -SOURCE_HASH is the md5 hash of the JS source (always 16 bytes)
        // -V8_CACHED_DATA is what v8 produces
        NodeScriptLoader.prototype._createAndWriteCachedData = function (script, scriptSource, cachedDataPath, moduleManager) {
            var _this = this;
            var timeout = Math.ceil(moduleManager.getConfig().getOptionsLiteral().nodeCachedData.writeDelay * (1 + Math.random()));
            var lastSize = -1;
            var iteration = 0;
            var hashData = undefined;
            var createLoop = function () {
                setTimeout(function () {
                    if (!hashData) {
                        hashData = _this._crypto.createHash('md5').update(scriptSource, 'utf8').digest();
                    }
                    var cachedData = script.createCachedData();
                    if (cachedData.length === 0 || cachedData.length === lastSize || iteration >= 5) {
                        // done
                        return;
                    }
                    if (cachedData.length < lastSize) {
                        // less data than before: skip, try again next round
                        createLoop();
                        return;
                    }
                    lastSize = cachedData.length;
                    _this._fs.writeFile(cachedDataPath, Buffer.concat([hashData, cachedData]), function (err) {
                        if (err) {
                            moduleManager.getConfig().onError(err);
                        }
                        moduleManager.getRecorder().record(63 /* CachedDataCreated */, cachedDataPath);
                        createLoop();
                    });
                }, timeout * (Math.pow(4, iteration++)));
            };
            // with some delay (`timeout`) create cached data
            // and repeat that (with backoff delay) until the
            // data seems to be not changing anymore
            createLoop();
        };
        NodeScriptLoader.prototype._readSourceAndCachedData = function (sourcePath, cachedDataPath, recorder, callback) {
            if (!cachedDataPath) {
                // no cached data case
                this._fs.readFile(sourcePath, { encoding: 'utf8' }, callback);
            }
            else {
                // cached data case: read both files in parallel
                var source_1 = undefined;
                var cachedData_1 = undefined;
                var hashData_1 = undefined;
                var steps_1 = 2;
                var step_1 = function (err) {
                    if (err) {
                        callback(err);
                    }
                    else if (--steps_1 === 0) {
                        callback(undefined, source_1, cachedData_1, hashData_1);
                    }
                };
                this._fs.readFile(sourcePath, { encoding: 'utf8' }, function (err, data) {
                    source_1 = data;
                    step_1(err);
                });
                this._fs.readFile(cachedDataPath, function (err, data) {
                    if (!err && data && data.length > 0) {
                        hashData_1 = data.slice(0, 16);
                        cachedData_1 = data.slice(16);
                        recorder.record(60 /* CachedDataFound */, cachedDataPath);
                    }
                    else {
                        recorder.record(61 /* CachedDataMissed */, cachedDataPath);
                    }
                    step_1(); // ignored: cached data is optional
                });
            }
        };
        NodeScriptLoader.prototype._verifyCachedData = function (script, scriptSource, cachedDataPath, hashData, moduleManager) {
            var _this = this;
            if (!hashData) {
                // nothing to do
                return;
            }
            if (script.cachedDataRejected) {
                // invalid anyways
                return;
            }
            setTimeout(function () {
                // check source hash - the contract is that file paths change when file content
                // change (e.g use the commit or version id as cache path). this check is
                // for violations of this contract.
                var hashDataNow = _this._crypto.createHash('md5').update(scriptSource, 'utf8').digest();
                if (!hashData.equals(hashDataNow)) {
                    moduleManager.getConfig().onError(new Error("FAILED TO VERIFY CACHED DATA, deleting stale '" + cachedDataPath + "' now, but a RESTART IS REQUIRED"));
                    _this._fs.unlink(cachedDataPath, function (err) {
                        if (err) {
                            moduleManager.getConfig().onError(err);
                        }
                    });
                }
            }, Math.ceil(5000 * (1 + Math.random())));
        };
        NodeScriptLoader._BOM = 0xFEFF;
        NodeScriptLoader._PREFIX = '(function (require, define, __filename, __dirname) { ';
        NodeScriptLoader._SUFFIX = '\n});';
        return NodeScriptLoader;
    }());
    function ensureRecordedNodeRequire(recorder, _nodeRequire) {
        if (_nodeRequire.__$__isRecorded) {
            // it is already recorded
            return _nodeRequire;
        }
        var nodeRequire = function nodeRequire(what) {
            recorder.record(33 /* NodeBeginNativeRequire */, what);
            try {
                return _nodeRequire(what);
            }
            finally {
                recorder.record(34 /* NodeEndNativeRequire */, what);
            }
        };
        nodeRequire.__$__isRecorded = true;
        return nodeRequire;
    }
    AMDLoader.ensureRecordedNodeRequire = ensureRecordedNodeRequire;
    function createScriptLoader(env) {
        return new OnlyOnceScriptLoader(env);
    }
    AMDLoader.createScriptLoader = createScriptLoader;
})(AMDLoader || (AMDLoader = {}));
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var AMDLoader;
(function (AMDLoader) {
    // ------------------------------------------------------------------------
    // ModuleIdResolver
    var ModuleIdResolver = /** @class */ (function () {
        function ModuleIdResolver(fromModuleId) {
            var lastSlash = fromModuleId.lastIndexOf('/');
            if (lastSlash !== -1) {
                this.fromModulePath = fromModuleId.substr(0, lastSlash + 1);
            }
            else {
                this.fromModulePath = '';
            }
        }
        /**
         * Normalize 'a/../name' to 'name', etc.
         */
        ModuleIdResolver._normalizeModuleId = function (moduleId) {
            var r = moduleId, pattern;
            // replace /./ => /
            pattern = /\/\.\//;
            while (pattern.test(r)) {
                r = r.replace(pattern, '/');
            }
            // replace ^./ => nothing
            r = r.replace(/^\.\//g, '');
            // replace /aa/../ => / (BUT IGNORE /../../)
            pattern = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
            while (pattern.test(r)) {
                r = r.replace(pattern, '/');
            }
            // replace ^aa/../ => nothing (BUT IGNORE ../../)
            r = r.replace(/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//, '');
            return r;
        };
        /**
         * Resolve relative module ids
         */
        ModuleIdResolver.prototype.resolveModule = function (moduleId) {
            var result = moduleId;
            if (!AMDLoader.Utilities.isAbsolutePath(result)) {
                if (AMDLoader.Utilities.startsWith(result, './') || AMDLoader.Utilities.startsWith(result, '../')) {
                    result = ModuleIdResolver._normalizeModuleId(this.fromModulePath + result);
                }
            }
            return result;
        };
        ModuleIdResolver.ROOT = new ModuleIdResolver('');
        return ModuleIdResolver;
    }());
    AMDLoader.ModuleIdResolver = ModuleIdResolver;
    // ------------------------------------------------------------------------
    // Module
    var Module = /** @class */ (function () {
        function Module(id, strId, dependencies, callback, errorback, moduleIdResolver) {
            this.id = id;
            this.strId = strId;
            this.dependencies = dependencies;
            this._callback = callback;
            this._errorback = errorback;
            this.moduleIdResolver = moduleIdResolver;
            this.exports = {};
            this.error = null;
            this.exportsPassedIn = false;
            this.unresolvedDependenciesCount = this.dependencies.length;
            this._isComplete = false;
        }
        Module._safeInvokeFunction = function (callback, args) {
            try {
                return {
                    returnedValue: callback.apply(AMDLoader.global, args),
                    producedError: null
                };
            }
            catch (e) {
                return {
                    returnedValue: null,
                    producedError: e
                };
            }
        };
        Module._invokeFactory = function (config, strModuleId, callback, dependenciesValues) {
            if (config.isBuild() && !AMDLoader.Utilities.isAnonymousModule(strModuleId)) {
                return {
                    returnedValue: null,
                    producedError: null
                };
            }
            if (config.shouldCatchError()) {
                return this._safeInvokeFunction(callback, dependenciesValues);
            }
            return {
                returnedValue: callback.apply(AMDLoader.global, dependenciesValues),
                producedError: null
            };
        };
        Module.prototype.complete = function (recorder, config, dependenciesValues) {
            this._isComplete = true;
            var producedError = null;
            if (this._callback) {
                if (typeof this._callback === 'function') {
                    recorder.record(21 /* BeginInvokeFactory */, this.strId);
                    var r = Module._invokeFactory(config, this.strId, this._callback, dependenciesValues);
                    producedError = r.producedError;
                    recorder.record(22 /* EndInvokeFactory */, this.strId);
                    if (!producedError && typeof r.returnedValue !== 'undefined' && (!this.exportsPassedIn || AMDLoader.Utilities.isEmpty(this.exports))) {
                        this.exports = r.returnedValue;
                    }
                }
                else {
                    this.exports = this._callback;
                }
            }
            if (producedError) {
                var err = AMDLoader.ensureError(producedError);
                err.phase = 'factory';
                err.moduleId = this.strId;
                this.error = err;
                config.onError(err);
            }
            this.dependencies = null;
            this._callback = null;
            this._errorback = null;
            this.moduleIdResolver = null;
        };
        /**
         * One of the direct dependencies or a transitive dependency has failed to load.
         */
        Module.prototype.onDependencyError = function (err) {
            this._isComplete = true;
            this.error = err;
            if (this._errorback) {
                this._errorback(err);
                return true;
            }
            return false;
        };
        /**
         * Is the current module complete?
         */
        Module.prototype.isComplete = function () {
            return this._isComplete;
        };
        return Module;
    }());
    AMDLoader.Module = Module;
    var ModuleIdProvider = /** @class */ (function () {
        function ModuleIdProvider() {
            this._nextId = 0;
            this._strModuleIdToIntModuleId = new Map();
            this._intModuleIdToStrModuleId = [];
            // Ensure values 0, 1, 2 are assigned accordingly with ModuleId
            this.getModuleId('exports');
            this.getModuleId('module');
            this.getModuleId('require');
        }
        ModuleIdProvider.prototype.getMaxModuleId = function () {
            return this._nextId;
        };
        ModuleIdProvider.prototype.getModuleId = function (strModuleId) {
            var id = this._strModuleIdToIntModuleId.get(strModuleId);
            if (typeof id === 'undefined') {
                id = this._nextId++;
                this._strModuleIdToIntModuleId.set(strModuleId, id);
                this._intModuleIdToStrModuleId[id] = strModuleId;
            }
            return id;
        };
        ModuleIdProvider.prototype.getStrModuleId = function (moduleId) {
            return this._intModuleIdToStrModuleId[moduleId];
        };
        return ModuleIdProvider;
    }());
    var RegularDependency = /** @class */ (function () {
        function RegularDependency(id) {
            this.id = id;
        }
        RegularDependency.EXPORTS = new RegularDependency(0 /* EXPORTS */);
        RegularDependency.MODULE = new RegularDependency(1 /* MODULE */);
        RegularDependency.REQUIRE = new RegularDependency(2 /* REQUIRE */);
        return RegularDependency;
    }());
    AMDLoader.RegularDependency = RegularDependency;
    var PluginDependency = /** @class */ (function () {
        function PluginDependency(id, pluginId, pluginParam) {
            this.id = id;
            this.pluginId = pluginId;
            this.pluginParam = pluginParam;
        }
        return PluginDependency;
    }());
    AMDLoader.PluginDependency = PluginDependency;
    var ModuleManager = /** @class */ (function () {
        function ModuleManager(env, scriptLoader, defineFunc, requireFunc, loaderAvailableTimestamp) {
            if (loaderAvailableTimestamp === void 0) { loaderAvailableTimestamp = 0; }
            this._env = env;
            this._scriptLoader = scriptLoader;
            this._loaderAvailableTimestamp = loaderAvailableTimestamp;
            this._defineFunc = defineFunc;
            this._requireFunc = requireFunc;
            this._moduleIdProvider = new ModuleIdProvider();
            this._config = new AMDLoader.Configuration(this._env);
            this._hasDependencyCycle = false;
            this._modules2 = [];
            this._knownModules2 = [];
            this._inverseDependencies2 = [];
            this._inversePluginDependencies2 = new Map();
            this._currentAnonymousDefineCall = null;
            this._recorder = null;
            this._buildInfoPath = [];
            this._buildInfoDefineStack = [];
            this._buildInfoDependencies = [];
        }
        ModuleManager.prototype.reset = function () {
            return new ModuleManager(this._env, this._scriptLoader, this._defineFunc, this._requireFunc, this._loaderAvailableTimestamp);
        };
        ModuleManager.prototype.getGlobalAMDDefineFunc = function () {
            return this._defineFunc;
        };
        ModuleManager.prototype.getGlobalAMDRequireFunc = function () {
            return this._requireFunc;
        };
        ModuleManager._findRelevantLocationInStack = function (needle, stack) {
            var normalize = function (str) { return str.replace(/\\/g, '/'); };
            var normalizedPath = normalize(needle);
            var stackPieces = stack.split(/\n/);
            for (var i = 0; i < stackPieces.length; i++) {
                var m = stackPieces[i].match(/(.*):(\d+):(\d+)\)?$/);
                if (m) {
                    var stackPath = m[1];
                    var stackLine = m[2];
                    var stackColumn = m[3];
                    var trimPathOffset = Math.max(stackPath.lastIndexOf(' ') + 1, stackPath.lastIndexOf('(') + 1);
                    stackPath = stackPath.substr(trimPathOffset);
                    stackPath = normalize(stackPath);
                    if (stackPath === normalizedPath) {
                        var r = {
                            line: parseInt(stackLine, 10),
                            col: parseInt(stackColumn, 10)
                        };
                        if (r.line === 1) {
                            r.col -= '(function (require, define, __filename, __dirname) { '.length;
                        }
                        return r;
                    }
                }
            }
            throw new Error('Could not correlate define call site for needle ' + needle);
        };
        ModuleManager.prototype.getBuildInfo = function () {
            if (!this._config.isBuild()) {
                return null;
            }
            var result = [], resultLen = 0;
            for (var i = 0, len = this._modules2.length; i < len; i++) {
                var m = this._modules2[i];
                if (!m) {
                    continue;
                }
                var location_1 = this._buildInfoPath[m.id] || null;
                var defineStack = this._buildInfoDefineStack[m.id] || null;
                var dependencies = this._buildInfoDependencies[m.id];
                result[resultLen++] = {
                    id: m.strId,
                    path: location_1,
                    defineLocation: (location_1 && defineStack ? ModuleManager._findRelevantLocationInStack(location_1, defineStack) : null),
                    dependencies: dependencies,
                    shim: null,
                    exports: m.exports
                };
            }
            return result;
        };
        ModuleManager.prototype.getRecorder = function () {
            if (!this._recorder) {
                if (this._config.shouldRecordStats()) {
                    this._recorder = new AMDLoader.LoaderEventRecorder(this._loaderAvailableTimestamp);
                }
                else {
                    this._recorder = AMDLoader.NullLoaderEventRecorder.INSTANCE;
                }
            }
            return this._recorder;
        };
        ModuleManager.prototype.getLoaderEvents = function () {
            return this.getRecorder().getEvents();
        };
        /**
         * Defines an anonymous module (without an id). Its name will be resolved as we receive a callback from the scriptLoader.
         * @param dependencies @see defineModule
         * @param callback @see defineModule
         */
        ModuleManager.prototype.enqueueDefineAnonymousModule = function (dependencies, callback) {
            if (this._currentAnonymousDefineCall !== null) {
                throw new Error('Can only have one anonymous define call per script file');
            }
            var stack = null;
            if (this._config.isBuild()) {
                stack = new Error('StackLocation').stack || null;
            }
            this._currentAnonymousDefineCall = {
                stack: stack,
                dependencies: dependencies,
                callback: callback
            };
        };
        /**
         * Creates a module and stores it in _modules. The manager will immediately begin resolving its dependencies.
         * @param strModuleId An unique and absolute id of the module. This must not collide with another module's id
         * @param dependencies An array with the dependencies of the module. Special keys are: "require", "exports" and "module"
         * @param callback if callback is a function, it will be called with the resolved dependencies. if callback is an object, it will be considered as the exports of the module.
         */
        ModuleManager.prototype.defineModule = function (strModuleId, dependencies, callback, errorback, stack, moduleIdResolver) {
            var _this = this;
            if (moduleIdResolver === void 0) { moduleIdResolver = new ModuleIdResolver(strModuleId); }
            var moduleId = this._moduleIdProvider.getModuleId(strModuleId);
            // if (this._modules2[moduleId]) {
            //     if (!this._config.isDuplicateMessageIgnoredFor(strModuleId)) {
            //         console.warn('Duplicate definition of module \'' + strModuleId + '\'');
            //     }
            //     // Super important! Completely ignore duplicate module definition
            //     return;
            // }
            var m = new Module(moduleId, strModuleId, this._normalizeDependencies(dependencies, moduleIdResolver), callback, errorback, moduleIdResolver);
            this._modules2[moduleId] = m;
            if (this._config.isBuild()) {
                this._buildInfoDefineStack[moduleId] = stack;
                this._buildInfoDependencies[moduleId] = (m.dependencies || []).map(function (dep) { return _this._moduleIdProvider.getStrModuleId(dep.id); });
            }
            // Resolving of dependencies is immediate (not in a timeout). If there's a need to support a packer that concatenates in an
            // unordered manner, in order to finish processing the file, execute the following method in a timeout
            _currentDefineModule = m.exports;
            this._resolve(m);
        };
        ModuleManager.prototype._normalizeDependency = function (dependency, moduleIdResolver) {
            if (dependency === 'exports') {
                return RegularDependency.EXPORTS;
            }
            if (dependency === 'module') {
                return RegularDependency.MODULE;
            }
            if (dependency === 'require') {
                return RegularDependency.REQUIRE;
            }
            // Normalize dependency and then request it from the manager
            var bangIndex = dependency.indexOf('!');
            if (bangIndex >= 0) {
                var strPluginId = moduleIdResolver.resolveModule(dependency.substr(0, bangIndex));
                var pluginParam = moduleIdResolver.resolveModule(dependency.substr(bangIndex + 1));
                var dependencyId = this._moduleIdProvider.getModuleId(strPluginId + '!' + pluginParam);
                var pluginId = this._moduleIdProvider.getModuleId(strPluginId);
                return new PluginDependency(dependencyId, pluginId, pluginParam);
            }
            return new RegularDependency(this._moduleIdProvider.getModuleId(moduleIdResolver.resolveModule(dependency)));
        };
        ModuleManager.prototype._normalizeDependencies = function (dependencies, moduleIdResolver) {
            var result = [], resultLen = 0;
            for (var i = 0, len = dependencies.length; i < len; i++) {
                result[resultLen++] = this._normalizeDependency(dependencies[i], moduleIdResolver);
            }
            return result;
        };
        ModuleManager.prototype._relativeRequire = function (moduleIdResolver, dependencies, callback, errorback) {
            if (typeof dependencies === 'string') {
                return this.synchronousRequire(dependencies, moduleIdResolver);
            }
            this.defineModule(AMDLoader.Utilities.generateAnonymousModule(), dependencies, callback, errorback, null, moduleIdResolver);
        };
        /**
         * Require synchronously a module by its absolute id. If the module is not loaded, an exception will be thrown.
         * @param id The unique and absolute id of the required module
         * @return The exports of module 'id'
         */
        ModuleManager.prototype.synchronousRequire = function (_strModuleId, moduleIdResolver) {
            if (moduleIdResolver === void 0) { moduleIdResolver = new ModuleIdResolver(_strModuleId); }
            var dependency = this._normalizeDependency(_strModuleId, moduleIdResolver);
            var m = this._modules2[dependency.id];
            if (!m) {
                throw new Error('Check dependency list! Synchronous require cannot resolve module \'' + _strModuleId + '\'. This is the first mention of this module!');
            }
            if (!m.isComplete()) {
                throw new Error('Check dependency list! Synchronous require cannot resolve module \'' + _strModuleId + '\'. This module has not been resolved completely yet.');
            }
            if (m.error) {
                throw m.error;
            }
            return m.exports;
        };
        ModuleManager.prototype.configure = function (params, shouldOverwrite) {
            var oldShouldRecordStats = this._config.shouldRecordStats();
            if (shouldOverwrite) {
                this._config = new AMDLoader.Configuration(this._env, params);
            }
            else {
                this._config = this._config.cloneAndMerge(params);
            }
            if (this._config.shouldRecordStats() && !oldShouldRecordStats) {
                this._recorder = null;
            }
        };
        ModuleManager.prototype.getConfig = function () {
            return this._config;
        };
        /**
         * Callback from the scriptLoader when a module has been loaded.
         * This means its code is available and has been executed.
         */
        ModuleManager.prototype._onLoad = function (moduleId) {
            if (this._currentAnonymousDefineCall !== null) {
                var defineCall = this._currentAnonymousDefineCall;
                this._currentAnonymousDefineCall = null;
                // Hit an anonymous define call
                this.defineModule(this._moduleIdProvider.getStrModuleId(moduleId), defineCall.dependencies, defineCall.callback, null, defineCall.stack);
            }
        };
        ModuleManager.prototype._createLoadError = function (moduleId, _err) {
            var _this = this;
            var strModuleId = this._moduleIdProvider.getStrModuleId(moduleId);
            var neededBy = (this._inverseDependencies2[moduleId] || []).map(function (intModuleId) { return _this._moduleIdProvider.getStrModuleId(intModuleId); });
            var err = AMDLoader.ensureError(_err);
            err.phase = 'loading';
            err.moduleId = strModuleId;
            err.neededBy = neededBy;
            return err;
        };
        /**
         * Callback from the scriptLoader when a module hasn't been loaded.
         * This means that the script was not found (e.g. 404) or there was an error in the script.
         */
        ModuleManager.prototype._onLoadError = function (moduleId, err) {
            var error = this._createLoadError(moduleId, err);
            if (!this._modules2[moduleId]) {
                this._modules2[moduleId] = new Module(moduleId, this._moduleIdProvider.getStrModuleId(moduleId), [], function () { }, null, null);
            }
            // Find any 'local' error handlers, walk the entire chain of inverse dependencies if necessary.
            var seenModuleId = [];
            for (var i = 0, len = this._moduleIdProvider.getMaxModuleId(); i < len; i++) {
                seenModuleId[i] = false;
            }
            var someoneNotified = false;
            var queue = [];
            queue.push(moduleId);
            seenModuleId[moduleId] = true;
            while (queue.length > 0) {
                var queueElement = queue.shift();
                var m = this._modules2[queueElement];
                if (m) {
                    someoneNotified = m.onDependencyError(error) || someoneNotified;
                }
                var inverseDeps = this._inverseDependencies2[queueElement];
                if (inverseDeps) {
                    for (var i = 0, len = inverseDeps.length; i < len; i++) {
                        var inverseDep = inverseDeps[i];
                        if (!seenModuleId[inverseDep]) {
                            queue.push(inverseDep);
                            seenModuleId[inverseDep] = true;
                        }
                    }
                }
            }
            if (!someoneNotified) {
                this._config.onError(error);
            }
        };
        /**
         * Walks (recursively) the dependencies of 'from' in search of 'to'.
         * Returns true if there is such a path or false otherwise.
         * @param from Module id to start at
         * @param to Module id to look for
         */
        ModuleManager.prototype._hasDependencyPath = function (fromId, toId) {
            var from = this._modules2[fromId];
            if (!from) {
                return false;
            }
            var inQueue = [];
            for (var i = 0, len = this._moduleIdProvider.getMaxModuleId(); i < len; i++) {
                inQueue[i] = false;
            }
            var queue = [];
            // Insert 'from' in queue
            queue.push(from);
            inQueue[fromId] = true;
            while (queue.length > 0) {
                // Pop first inserted element of queue
                var element = queue.shift();
                var dependencies = element.dependencies;
                if (dependencies) {
                    // Walk the element's dependencies
                    for (var i = 0, len = dependencies.length; i < len; i++) {
                        var dependency = dependencies[i];
                        if (dependency.id === toId) {
                            // There is a path to 'to'
                            return true;
                        }
                        var dependencyModule = this._modules2[dependency.id];
                        if (dependencyModule && !inQueue[dependency.id]) {
                            // Insert 'dependency' in queue
                            inQueue[dependency.id] = true;
                            queue.push(dependencyModule);
                        }
                    }
                }
            }
            // There is no path to 'to'
            return false;
        };
        /**
         * Walks (recursively) the dependencies of 'from' in search of 'to'.
         * Returns cycle as array.
         * @param from Module id to start at
         * @param to Module id to look for
         */
        ModuleManager.prototype._findCyclePath = function (fromId, toId, depth) {
            if (fromId === toId || depth === 50) {
                return [fromId];
            }
            var from = this._modules2[fromId];
            if (!from) {
                return null;
            }
            // Walk the element's dependencies
            var dependencies = from.dependencies;
            if (dependencies) {
                for (var i = 0, len = dependencies.length; i < len; i++) {
                    var path = this._findCyclePath(dependencies[i].id, toId, depth + 1);
                    if (path !== null) {
                        path.push(fromId);
                        return path;
                    }
                }
            }
            return null;
        };
        /**
         * Create the local 'require' that is passed into modules
         */
        ModuleManager.prototype._createRequire = function (moduleIdResolver) {
            var _this = this;
            var result = (function (dependencies, callback, errorback) {
                return _this._relativeRequire(moduleIdResolver, dependencies, callback, errorback);
            });
            result.toUrl = function (id) {
                return _this._config.requireToUrl(moduleIdResolver.resolveModule(id));
            };
            result.getStats = function () {
                return _this.getLoaderEvents();
            };
            result.hasDependencyCycle = function () {
                return _this._hasDependencyCycle;
            };
            result.config = function (params, shouldOverwrite) {
                if (shouldOverwrite === void 0) { shouldOverwrite = false; }
                _this.configure(params, shouldOverwrite);
            };
            result.__$__nodeRequire = AMDLoader.global.nodeRequire;
            return result;
        };
        ModuleManager.prototype._loadModule = function (moduleId) {
            var _this = this;
            if (this._modules2[moduleId] || this._knownModules2[moduleId]) {
                // known module
                return;
            }
            this._knownModules2[moduleId] = true;
            var strModuleId = this._moduleIdProvider.getStrModuleId(moduleId);
            var paths = this._config.moduleIdToPaths(strModuleId);
            var scopedPackageRegex = /^@[^\/]+\/[^\/]+$/; // matches @scope/package-name
            if (this._env.isNode && (strModuleId.indexOf('/') === -1 || scopedPackageRegex.test(strModuleId))) {
                paths.push('node|' + strModuleId);
            }
            var lastPathIndex = -1;
            var loadNextPath = function (err) {
                lastPathIndex++;
                if (lastPathIndex >= paths.length) {
                    // No more paths to try
                    _this._onLoadError(moduleId, err);
                }
                else {
                    var currentPath_1 = paths[lastPathIndex];
                    var recorder_1 = _this.getRecorder();
                    if (_this._config.isBuild() && currentPath_1 === 'empty:') {
                        _this._buildInfoPath[moduleId] = currentPath_1;
                        _this.defineModule(_this._moduleIdProvider.getStrModuleId(moduleId), [], null, null, null);
                        _this._onLoad(moduleId);
                        return;
                    }
                    recorder_1.record(10 /* BeginLoadingScript */, currentPath_1);
                    _this._scriptLoader.load(_this, currentPath_1, function () {
                        if (_this._config.isBuild()) {
                            _this._buildInfoPath[moduleId] = currentPath_1;
                        }
                        recorder_1.record(11 /* EndLoadingScriptOK */, currentPath_1);
                        _this._onLoad(moduleId);
                    }, function (err) {
                        recorder_1.record(12 /* EndLoadingScriptError */, currentPath_1);
                        loadNextPath(err);
                    });
                }
            };
            loadNextPath(null);
        };
        /**
         * Resolve a plugin dependency with the plugin loaded & complete
         * @param module The module that has this dependency
         * @param pluginDependency The semi-normalized dependency that appears in the module. e.g. 'vs/css!./mycssfile'. Only the plugin part (before !) is normalized
         * @param plugin The plugin (what the plugin exports)
         */
        ModuleManager.prototype._loadPluginDependency = function (plugin, pluginDependency) {
            var _this = this;
            if (this._modules2[pluginDependency.id] || this._knownModules2[pluginDependency.id]) {
                // known module
                return;
            }
            this._knownModules2[pluginDependency.id] = true;
            // Delegate the loading of the resource to the plugin
            var load = (function (value) {
                _this.defineModule(_this._moduleIdProvider.getStrModuleId(pluginDependency.id), [], value, null, null);
            });
            load.error = function (err) {
                _this._config.onError(_this._createLoadError(pluginDependency.id, err));
            };
            plugin.load(pluginDependency.pluginParam, this._createRequire(ModuleIdResolver.ROOT), load, this._config.getOptionsLiteral());
        };
        /**
         * Examine the dependencies of module 'module' and resolve them as needed.
         */
        ModuleManager.prototype._resolve = function (module) {
            var _this = this;
            var dependencies = module.dependencies;
            if (dependencies) {
                for (var i = 0, len = dependencies.length; i < len; i++) {
                    var dependency = dependencies[i];
                    if (dependency === RegularDependency.EXPORTS) {
                        module.exportsPassedIn = true;
                        module.unresolvedDependenciesCount--;
                        continue;
                    }
                    if (dependency === RegularDependency.MODULE) {
                        module.unresolvedDependenciesCount--;
                        continue;
                    }
                    if (dependency === RegularDependency.REQUIRE) {
                        module.unresolvedDependenciesCount--;
                        continue;
                    }
                    var dependencyModule = this._modules2[dependency.id];
                    if (dependencyModule && dependencyModule.isComplete()) {
                        if (dependencyModule.error) {
                            module.onDependencyError(dependencyModule.error);
                            return;
                        }
                        module.unresolvedDependenciesCount--;
                        continue;
                    }
                    if (this._hasDependencyPath(dependency.id, module.id)) {
                        this._hasDependencyCycle = true;
                        console.warn('There is a dependency cycle between \'' + this._moduleIdProvider.getStrModuleId(dependency.id) + '\' and \'' + this._moduleIdProvider.getStrModuleId(module.id) + '\'. The cyclic path follows:');
                        var cyclePath = this._findCyclePath(dependency.id, module.id, 0) || [];
                        cyclePath.reverse();
                        cyclePath.push(dependency.id);
                        console.warn(cyclePath.map(function (id) { return _this._moduleIdProvider.getStrModuleId(id); }).join(' => \n'));
                        // Break the cycle
                        module.unresolvedDependenciesCount--;
                        continue;
                    }
                    // record inverse dependency
                    this._inverseDependencies2[dependency.id] = this._inverseDependencies2[dependency.id] || [];
                    this._inverseDependencies2[dependency.id].push(module.id);
                    if (dependency instanceof PluginDependency) {
                        var plugin = this._modules2[dependency.pluginId];
                        if (plugin && plugin.isComplete()) {
                            this._loadPluginDependency(plugin.exports, dependency);
                            continue;
                        }
                        // Record dependency for when the plugin gets loaded
                        var inversePluginDeps = this._inversePluginDependencies2.get(dependency.pluginId);
                        if (!inversePluginDeps) {
                            inversePluginDeps = [];
                            this._inversePluginDependencies2.set(dependency.pluginId, inversePluginDeps);
                        }
                        inversePluginDeps.push(dependency);
                        this._loadModule(dependency.pluginId);
                        continue;
                    }
                    this._loadModule(dependency.id);
                }
            }
            if (module.unresolvedDependenciesCount === 0) {
                this._onModuleComplete(module);
            }
        };
        ModuleManager.prototype._onModuleComplete = function (module) {
            var _this = this;
            var recorder = this.getRecorder();
            if (module.isComplete()) {
                // already done
                return;
            }
            var dependencies = module.dependencies;
            var dependenciesValues = [];
            if (dependencies) {
                for (var i = 0, len = dependencies.length; i < len; i++) {
                    var dependency = dependencies[i];
                    if (dependency === RegularDependency.EXPORTS) {
                        dependenciesValues[i] = module.exports;
                        continue;
                    }
                    if (dependency === RegularDependency.MODULE) {
                        dependenciesValues[i] = {
                            id: module.strId,
                            config: function () {
                                return _this._config.getConfigForModule(module.strId);
                            }
                        };
                        continue;
                    }
                    if (dependency === RegularDependency.REQUIRE) {
                        dependenciesValues[i] = this._createRequire(module.moduleIdResolver);
                        continue;
                    }
                    var dependencyModule = this._modules2[dependency.id];
                    if (dependencyModule) {
                        dependenciesValues[i] = dependencyModule.exports;
                        continue;
                    }
                    dependenciesValues[i] = null;
                }
            }
            module.complete(recorder, this._config, dependenciesValues);
            // Fetch and clear inverse dependencies
            var inverseDeps = this._inverseDependencies2[module.id];
            this._inverseDependencies2[module.id] = null;
            if (inverseDeps) {
                // Resolve one inverse dependency at a time, always
                // on the lookout for a completed module.
                for (var i = 0, len = inverseDeps.length; i < len; i++) {
                    var inverseDependencyId = inverseDeps[i];
                    var inverseDependency = this._modules2[inverseDependencyId];
                    inverseDependency.unresolvedDependenciesCount--;
                    if (inverseDependency.unresolvedDependenciesCount === 0) {
                        this._onModuleComplete(inverseDependency);
                    }
                }
            }
            var inversePluginDeps = this._inversePluginDependencies2.get(module.id);
            if (inversePluginDeps) {
                // This module is used as a plugin at least once
                // Fetch and clear these inverse plugin dependencies
                this._inversePluginDependencies2.delete(module.id);
                // Resolve plugin dependencies one at a time
                for (var i = 0, len = inversePluginDeps.length; i < len; i++) {
                    this._loadPluginDependency(module.exports, inversePluginDeps[i]);
                }
            }
        };
        return ModuleManager;
    }());
    AMDLoader.ModuleManager = ModuleManager;
})(AMDLoader || (AMDLoader = {}));
var define;
var AMDLoader;
(function (AMDLoader) {
    var env = new AMDLoader.Environment();
    var moduleManager = null;
    var DefineFunc = function (id, dependencies, callback) {
        if (typeof id !== 'string') {
            callback = dependencies;
            dependencies = id;
            id = null;
        }
        if (typeof dependencies !== 'object' || !Array.isArray(dependencies)) {
            callback = dependencies;
            dependencies = null;
        }
        if (!dependencies) {
            dependencies = ['require', 'exports', 'module'];
        }
        if (id) {
            moduleManager.defineModule(id, dependencies, callback, null, null);
        }
        else {
            moduleManager.enqueueDefineAnonymousModule(dependencies, callback);
        }
    };
    DefineFunc.amd = {
        jQuery: true
    };
    var _requireFunc_config = function (params, shouldOverwrite) {
        if (shouldOverwrite === void 0) { shouldOverwrite = false; }
        moduleManager.configure(params, shouldOverwrite);
    };
    var RequireFunc = function () {
        if (arguments.length === 1) {
            if ((arguments[0] instanceof Object) && !Array.isArray(arguments[0])) {
                _requireFunc_config(arguments[0]);
                return;
            }
            if (typeof arguments[0] === 'string') {
                return moduleManager.synchronousRequire(arguments[0]);
            }
        }
        if (arguments.length === 2 || arguments.length === 3) {
            if (Array.isArray(arguments[0])) {
                moduleManager.defineModule(AMDLoader.Utilities.generateAnonymousModule(), arguments[0], arguments[1], arguments[2], null);
                return;
            }
        }
        throw new Error('Unrecognized require call');
    };
    RequireFunc.config = _requireFunc_config;
    RequireFunc.getConfig = function () {
        return moduleManager.getConfig().getOptionsLiteral();
    };
    RequireFunc.reset = function () {
        moduleManager = moduleManager.reset();
    };
    RequireFunc.getBuildInfo = function () {
        return moduleManager.getBuildInfo();
    };
    RequireFunc.getStats = function () {
        return moduleManager.getLoaderEvents();
    };
    RequireFunc.define = DefineFunc;
    RequireFunc.defined = function(module){
        let moduleId = moduleManager._moduleIdProvider.getModuleId(module);
        if (moduleManager._modules2[moduleId])
            return true;
        return false;
    };
    function init() {
        if (typeof AMDLoader.global.require !== 'undefined' || typeof require !== 'undefined') {
            var _nodeRequire = (AMDLoader.global.require || require);
            if (typeof _nodeRequire === 'function' && typeof _nodeRequire.resolve === 'function') {
                // re-expose node's require function
                var nodeRequire = AMDLoader.ensureRecordedNodeRequire(moduleManager.getRecorder(), _nodeRequire);
                AMDLoader.global.nodeRequire = nodeRequire;
                RequireFunc.nodeRequire = nodeRequire;
                RequireFunc.__$__nodeRequire = nodeRequire;
            }
        }
        if (env.isNode && !env.isElectronRenderer && !env.isElectronNodeIntegrationWebWorker) {
            module.exports = RequireFunc;
            require = RequireFunc;
        }
        else {
            if (!env.isElectronRenderer) {
                AMDLoader.global.define = DefineFunc;
            }
            AMDLoader.global.require = RequireFunc;
        }
    }
    AMDLoader.init = init;
    if (typeof AMDLoader.global.define !== 'function' || !AMDLoader.global.define.amd) {
        moduleManager = new AMDLoader.ModuleManager(env, AMDLoader.createScriptLoader(env), DefineFunc, RequireFunc, AMDLoader.Utilities.getHighPerformanceTimestamp());
        // The global variable require can configure the loader
        if (typeof AMDLoader.global.require !== 'undefined' && typeof AMDLoader.global.require !== 'function') {
            RequireFunc.config(AMDLoader.global.require);
        }
        // This define is for the local closure defined in node in the case that the loader is concatenated
        define = function () {
            return DefineFunc.apply(null, arguments);
        };
        define.amd = DefineFunc.amd;
        if (typeof doNotInitLoader === 'undefined') {
            init();
        }
    }
})(AMDLoader || (AMDLoader = {}));

define("@ijstech/components",(require, exports)=>{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __decorateClass = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key2, result);
  return result;
};

// src/index.ts
__export(exports, {
  BarChart: () => BarChart,
  Button: () => Button,
  CardLayout: () => CardLayout,
  CarouselSlider: () => CarouselSlider,
  Checkbox: () => Checkbox,
  CheckboxGroup: () => CheckboxGroup,
  ClearObservers: () => ClearObservers,
  Clipboard: () => Clipboard,
  CodeDiffEditor: () => CodeDiffEditor,
  CodeEditor: () => CodeEditor,
  Collapse: () => Collapse,
  CollapseDetails: () => CollapseDetails,
  CollapseSummary: () => CollapseSummary,
  ComboBox: () => ComboBox,
  Component: () => Component,
  Container: () => Container,
  Control: () => Control,
  CountDown: () => CountDown,
  Datepicker: () => Datepicker,
  Divider: () => Divider,
  DropdownButton: () => DropdownButton,
  DropdownItem: () => DropdownItem,
  EventBus: () => EventBus,
  HStack: () => HStack,
  Icon: () => Icon,
  Iframe: () => Iframe,
  Image: () => Image2,
  Input: () => Input,
  Label: () => Label,
  LibPath: () => LibPath,
  LineChart: () => LineChart,
  Link: () => Link,
  ListView: () => ListView,
  ListViewItem: () => ListViewItem,
  Loading: () => Loading,
  Markdown: () => Markdown,
  MarkdownEditor: () => MarkdownEditor,
  Menu: () => Menu,
  Modal: () => Modal,
  Module: () => Module,
  Observe: () => Observe,
  Pagination: () => Pagination,
  Panel: () => Panel,
  PieChart: () => PieChart,
  Progress: () => Progress,
  ProgressItem: () => ProgressItem,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
  Range: () => Range,
  RequireJS: () => RequireJS,
  ScatterChart: () => ScatterChart,
  ScatterLineChart: () => ScatterLineChart,
  Search: () => Search,
  Slot: () => Slot,
  Styles: () => src_exports,
  Switch: () => Switch,
  Tab: () => Tab,
  TabSheet: () => TabSheet,
  Table: () => Table,
  TableColumn: () => TableColumn,
  Tabs: () => Tabs,
  Timeline: () => Timeline,
  Toast: () => Toast,
  Tooltip: () => Tooltip,
  TreeNode: () => TreeNode,
  TreeView: () => TreeView,
  Unobserve: () => Unobserve,
  Upload: () => Upload,
  VStack: () => VStack,
  application: () => application,
  customElements: () => customElements2,
  customModule: () => customModule,
  isObservable: () => isObservable,
  observable: () => observable
});

// packages/style/src/index.ts
var src_exports = {};
__export(src_exports, {
  Colors: () => Colors,
  Theme: () => theme_exports,
  cssRaw: () => cssRaw,
  cssRule: () => cssRule,
  fontFace: () => fontFace,
  keyframes: () => keyframes,
  rotate: () => rotate,
  style: () => style
});

// packages/style/src/theme.ts
var theme_exports = {};
__export(theme_exports, {
  ColorVars: () => ColorVars,
  Colors: () => Colors,
  ThemeVars: () => ThemeVars,
  applyTheme: () => applyTheme,
  darkTheme: () => darkTheme,
  defaultTheme: () => defaultTheme
});

// packages/style/src/colors.ts
var amber = {
  50: "#fff8e1",
  100: "#ffecb3",
  200: "#ffe082",
  300: "#ffd54f",
  400: "#ffca28",
  500: "#ffc107",
  600: "#ffb300",
  700: "#ffa000",
  800: "#ff8f00",
  900: "#ff6f00",
  A100: "#ffe57f",
  A200: "#ffd740",
  A400: "#ffc400",
  A700: "#ffab00"
};
var blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var blueGrey = {
  50: "#eceff1",
  100: "#cfd8dc",
  200: "#b0bec5",
  300: "#90a4ae",
  400: "#78909c",
  500: "#607d8b",
  600: "#546e7a",
  700: "#455a64",
  800: "#37474f",
  900: "#263238",
  A100: "#cfd8dc",
  A200: "#b0bec5",
  A400: "#78909c",
  A700: "#455a64"
};
var brown = {
  50: "#efebe9",
  100: "#d7ccc8",
  200: "#bcaaa4",
  300: "#a1887f",
  400: "#8d6e63",
  500: "#795548",
  600: "#6d4c41",
  700: "#5d4037",
  800: "#4e342e",
  900: "#3e2723",
  A100: "#d7ccc8",
  A200: "#bcaaa4",
  A400: "#8d6e63",
  A700: "#5d4037"
};
var cyan = {
  50: "#e0f7fa",
  100: "#b2ebf2",
  200: "#80deea",
  300: "#4dd0e1",
  400: "#26c6da",
  500: "#00bcd4",
  600: "#00acc1",
  700: "#0097a7",
  800: "#00838f",
  900: "#006064",
  A100: "#84ffff",
  A200: "#18ffff",
  A400: "#00e5ff",
  A700: "#00b8d4"
};
var deepOrange = {
  50: "#fbe9e7",
  100: "#ffccbc",
  200: "#ffab91",
  300: "#ff8a65",
  400: "#ff7043",
  500: "#ff5722",
  600: "#f4511e",
  700: "#e64a19",
  800: "#d84315",
  900: "#bf360c",
  A100: "#ff9e80",
  A200: "#ff6e40",
  A400: "#ff3d00",
  A700: "#dd2c00"
};
var deepPurple = {
  50: "#ede7f6",
  100: "#d1c4e9",
  200: "#b39ddb",
  300: "#9575cd",
  400: "#7e57c2",
  500: "#673ab7",
  600: "#5e35b1",
  700: "#512da8",
  800: "#4527a0",
  900: "#311b92",
  A100: "#b388ff",
  A200: "#7c4dff",
  A400: "#651fff",
  A700: "#6200ea"
};
var green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var indigo = {
  50: "#e8eaf6",
  100: "#c5cae9",
  200: "#9fa8da",
  300: "#7986cb",
  400: "#5c6bc0",
  500: "#3f51b5",
  600: "#3949ab",
  700: "#303f9f",
  800: "#283593",
  900: "#1a237e",
  A100: "#8c9eff",
  A200: "#536dfe",
  A400: "#3d5afe",
  A700: "#304ffe"
};
var lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var lightGreen = {
  50: "#f1f8e9",
  100: "#dcedc8",
  200: "#c5e1a5",
  300: "#aed581",
  400: "#9ccc65",
  500: "#8bc34a",
  600: "#7cb342",
  700: "#689f38",
  800: "#558b2f",
  900: "#33691e",
  A100: "#ccff90",
  A200: "#b2ff59",
  A400: "#76ff03",
  A700: "#64dd17"
};
var lime = {
  50: "#f9fbe7",
  100: "#f0f4c3",
  200: "#e6ee9c",
  300: "#dce775",
  400: "#d4e157",
  500: "#cddc39",
  600: "#c0ca33",
  700: "#afb42b",
  800: "#9e9d24",
  900: "#827717",
  A100: "#f4ff81",
  A200: "#eeff41",
  A400: "#c6ff00",
  A700: "#aeea00"
};
var orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var pink = {
  50: "#fce4ec",
  100: "#f8bbd0",
  200: "#f48fb1",
  300: "#f06292",
  400: "#ec407a",
  500: "#e91e63",
  600: "#d81b60",
  700: "#c2185b",
  800: "#ad1457",
  900: "#880e4f",
  A100: "#ff80ab",
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
};
var purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var teal = {
  50: "#e0f2f1",
  100: "#b2dfdb",
  200: "#80cbc4",
  300: "#4db6ac",
  400: "#26a69a",
  500: "#009688",
  600: "#00897b",
  700: "#00796b",
  800: "#00695c",
  900: "#004d40",
  A100: "#a7ffeb",
  A200: "#64ffda",
  A400: "#1de9b6",
  A700: "#00bfa5"
};
var yellow = {
  50: "#fffde7",
  100: "#fff9c4",
  200: "#fff59d",
  300: "#fff176",
  400: "#ffee58",
  500: "#ffeb3b",
  600: "#fdd835",
  700: "#fbc02d",
  800: "#f9a825",
  900: "#f57f17",
  A100: "#ffff8d",
  A200: "#ffff00",
  A400: "#ffea00",
  A700: "#ffd600"
};
var Colors = {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
};

// packages/style/src/theme.ts
var defaultTheme = {
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    activeOpacity: 0.12,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08
  },
  background: {
    default: "#fafafa",
    paper: "#fff",
    main: "#181e3e",
    modal: "#192046",
    gradient: "linear-gradient(90deg, #a8327f 0%, #d4626a 100%)"
  },
  breakboints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  },
  divider: "rgba(0, 0, 0, 0.12)",
  colors: {
    error: {
      contrastText: "#FFFFFF",
      dark: "#D32F2F",
      light: "#e57373",
      main: "#f44336"
    },
    info: {
      contrastText: "#fff",
      dark: "#1976d2",
      light: "#64b5f6",
      main: "#2196f3"
    },
    primary: {
      contrastText: "#fff",
      dark: "rgb(44, 56, 126)",
      light: "rgb(101, 115, 195)",
      main: "#3f51b5"
    },
    secondary: {
      contrastText: "#fff",
      dark: "rgb(171, 0, 60)",
      light: "rgb(247, 51, 120)",
      main: "#f50057"
    },
    success: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "#388e3c",
      light: "#81c784",
      main: "#4caf50"
    },
    warning: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "#f57c00",
      light: "#ffb74d",
      main: "#ff9800"
    }
  },
  shadows: {
    0: "none",
    1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    2: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    3: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    4: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    third: "#f6c958",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)"
  },
  docs: {
    background: "#f6f8fa",
    text0: "#393939",
    text1: "#717171"
  },
  typography: {
    fontSize: "14px",
    fontFamily: `'roboto', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'`
  }
};
var darkTheme = {
  action: {
    active: "#fff",
    activeOpacity: 0.12,
    disabled: "rgba(255,255,255,0.3)",
    disabledBackground: "rgba(255,255,255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255,255,255, 0.12)",
    focusOpacity: 0.12,
    hover: "rgba(255,255,255,0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255,255,255, 0.16)",
    selectedOpacity: 0.16
  },
  background: {
    default: "#303030",
    paper: "#424242",
    main: "#181e3e",
    modal: "#192046",
    gradient: "linear-gradient(90deg, #a8327f 0%, #d4626a 100%)"
  },
  breakboints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  },
  colors: {
    error: {
      contrastText: "#fff",
      dark: "#d32f2f",
      light: "#e57373",
      main: "#f44336"
    },
    info: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "#0288d1",
      light: "#4fc3f7",
      main: "#29b6f6"
    },
    primary: {
      contrastText: "#fff",
      dark: "rgb(44, 56, 126)",
      light: "rgb(101, 115, 195)",
      main: "#3f51b5"
    },
    secondary: {
      contrastText: "#fff",
      dark: "rgb(171, 0, 60)",
      light: "rgb(247, 51, 120)",
      main: "#f50057"
    },
    success: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "#388e3c",
      light: "#81c784",
      main: "#66bb6a"
    },
    warning: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "#f57c00",
      light: "#ffb74d",
      main: "#ffa726"
    }
  },
  divider: "rgba(255, 255, 255, 0.12)",
  shadows: {
    0: "none",
    1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    2: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    3: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    4: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  text: {
    primary: "#fff",
    secondary: "rgba(255, 255, 255, 0.7)",
    third: "#f6c958",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)"
  },
  docs: {
    background: "#010132",
    text0: "#fff",
    text1: "#fff"
  },
  typography: {
    fontSize: "14px",
    fontFamily: `'roboto', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'`
  }
};
function createThemeVars(theme, vars, prefix) {
  vars = vars || {};
  for (let v in theme) {
    if (typeof theme[v] == "object") {
      vars[v] = {};
      createThemeVars(theme[v], vars[v], prefix ? prefix + v + "-" : v + "-");
    } else {
      let name = ((prefix || "") + v).split(/(?=[A-Z])/).join("_").toLowerCase();
      vars[v] = `var(--${name})`;
    }
  }
  return vars;
}
function createThemeCss(theme, vars, prefix) {
  vars = vars || {};
  for (let v in theme) {
    if (typeof theme[v] == "object") {
      createThemeCss(theme[v], vars, prefix ? prefix + v + "-" : v + "-");
    } else {
      let name = ((prefix || "") + v).split(/(?=[A-Z])/).join("_").toLowerCase();
      vars[name] = theme[v];
    }
  }
  return vars;
}
var ThemeVars = createThemeVars(defaultTheme);
var ColorVars = createThemeVars(Colors);
var themeStyle;
function applyTheme(theme) {
  let cssVars = createThemeCss(theme);
  let css = `:root{`;
  for (let p in cssVars)
    css += `--${p}: ${cssVars[p]};`;
  css += "}";
  if (!themeStyle) {
    themeStyle = document.createElement("style");
    document.head.appendChild(themeStyle);
  }
  themeStyle.textContent = css;
}
applyTheme(defaultTheme);

// packages/style/src/styles.ts
var uniqueId = 0;
var CSS_NUMBER = Object.create(null);
var CSS_NUMBER_KEYS = [
  "animation-iteration-count",
  "border-image-outset",
  "border-image-slice",
  "border-image-width",
  "box-flex",
  "box-flex-group",
  "box-ordinal-group",
  "column-count",
  "columns",
  "counter-increment",
  "counter-reset",
  "flex",
  "flex-grow",
  "flex-positive",
  "flex-shrink",
  "flex-negative",
  "flex-order",
  "font-weight",
  "grid-area",
  "grid-column",
  "grid-column-end",
  "grid-column-span",
  "grid-column-start",
  "grid-row",
  "grid-row-end",
  "grid-row-span",
  "grid-row-start",
  "line-clamp",
  "line-height",
  "opacity",
  "order",
  "orphans",
  "tab-size",
  "widows",
  "z-index",
  "zoom",
  "fill-opacity",
  "flood-opacity",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width"
];
for (const property of CSS_NUMBER_KEYS) {
  for (const prefix of ["-webkit-", "-ms-", "-moz-", "-o-", ""]) {
    CSS_NUMBER[prefix + property] = true;
  }
}
function escape(str) {
  return str.replace(/[ !#$%&()*+,./;<=>?@[\]^`{|}~"'\\]/g, "\\$&");
}
function interpolate(selector, styleName) {
  return selector.replace(/&/g, styleName);
}
function hyphenate(propertyName) {
  return propertyName.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/^ms-/, "-ms-");
}
function stringHash(str) {
  let value = 5381;
  let len = str.length;
  while (len--)
    value = value * 33 ^ str.charCodeAt(len);
  return (value >>> 0).toString(36);
}
function styleToString(name, value) {
  const suffix = typeof value === "number" && value && !CSS_NUMBER[name] ? "px" : "";
  return `${name}:${value}${suffix}`;
}
function sortTuples(value) {
  return value.sort((a, b) => a[0] > b[0] ? 1 : -1);
}
function stringifyProperties(properties) {
  return properties.map(([name, value]) => {
    if (!Array.isArray(value))
      return styleToString(name, value);
    return value.map((x) => styleToString(name, x)).join(";");
  }).join(";");
}
function child(selector, parent) {
  if (!selector)
    return parent;
  if (!selector.includes("&"))
    return `${parent} ${selector}`;
  return interpolate(selector, parent);
}
function stylize(rulesList, stylesList, key2, styles, parentClassName) {
  const properties = [];
  const nestedStyles = [];
  for (const key3 of Object.keys(styles)) {
    const value = styles[key3];
    if (key3.charCodeAt(0) !== 36 && value != null) {
      if (typeof value === "object" && !Array.isArray(value)) {
        nestedStyles.push([key3, value]);
      } else {
        properties.push([hyphenate(key3), value]);
      }
    }
  }
  const isUnique = !!styles.$unique;
  const parent = styles.$global ? "" : parentClassName;
  const nested = parent ? nestedStyles : sortTuples(nestedStyles);
  const style2 = stringifyProperties(sortTuples(properties));
  let pid = style2;
  if (key2.charCodeAt(0) === 64) {
    const childRules = [];
    const childStyles = [];
    if (parent && style2) {
      pid += `:${parent}`;
      childStyles.push({ selector: parent, style: style2, isUnique });
    }
    for (const [name, value] of nested) {
      pid += `:${stylize(childRules, childStyles, name, value, parent)}`;
    }
    rulesList.push({
      selector: key2,
      rules: childRules,
      styles: childStyles,
      style: parent ? "" : style2
    });
  } else {
    const selector = parent ? child(key2, parent) : key2;
    pid += `:${selector}`;
    if (style2) {
      stylesList.push({ selector, style: style2, isUnique });
    }
    for (const [name, value] of nested) {
      pid += `:${stylize(rulesList, stylesList, name, value, selector)}`;
    }
  }
  return pid;
}
function compose(cache, rulesList, stylesList, id, name) {
  for (const { selector, style: style2, isUnique } of stylesList) {
    const key2 = interpolate(selector, name);
    const item = new Style(style2, `s:${isUnique ? (++uniqueId).toString(36) : id}:${style2}`);
    item.add(new Selector(key2, `k:${key2}`));
    cache.add(item);
  }
  for (const { selector, style: style2, rules, styles } of rulesList) {
    const key2 = interpolate(selector, name);
    const item = new Rule(key2, style2, `r:${id}:${key2}:${style2}`);
    compose(item, rules, styles, id, name);
    cache.add(item);
  }
}
function join(arr) {
  let res = "";
  for (let i = 0; i < arr.length; i++)
    res += arr[i];
  return res;
}
var Cache = class {
  constructor(changes) {
    this.changes = changes;
    this.sheet = [];
    this.changeId = 0;
    this._keys = [];
    this._children = Object.create(null);
    this._counters = Object.create(null);
  }
  add(style2) {
    const count = this._counters[style2.id] || 0;
    const item = this._children[style2.id] || style2.clone();
    this._counters[style2.id] = count + 1;
    if (count === 0) {
      this._children[item.id] = item;
      this._keys.push(item.id);
      this.sheet.push(item.getStyles());
      this.changeId++;
      if (this.changes)
        this.changes.add(item, this._keys.length - 1);
    } else if (item instanceof Cache && style2 instanceof Cache) {
      const prevItemChangeId = item.changeId;
      item.merge(style2);
      if (item.changeId !== prevItemChangeId) {
        const index = this._keys.indexOf(style2.id);
        this.sheet.splice(index, 1, item.getStyles());
        this.changeId++;
        if (this.changes)
          this.changes.change(item, index, index);
      }
    }
  }
  remove(style2) {
    const count = this._counters[style2.id];
    if (count) {
      this._counters[style2.id] = count - 1;
      const item = this._children[style2.id];
      const index = this._keys.indexOf(item.id);
      if (count === 1) {
        delete this._counters[style2.id];
        delete this._children[style2.id];
        this._keys.splice(index, 1);
        this.sheet.splice(index, 1);
        this.changeId++;
        if (this.changes)
          this.changes.remove(item, index);
      } else if (item instanceof Cache && style2 instanceof Cache) {
        const prevChangeId = item.changeId;
        item.unmerge(style2);
        if (item.changeId !== prevChangeId) {
          this.sheet.splice(index, 1, item.getStyles());
          this.changeId++;
          if (this.changes)
            this.changes.change(item, index, index);
        }
      }
    }
  }
  values() {
    return this._keys.map((key2) => this._children[key2]);
  }
  merge(cache) {
    for (const item of cache.values())
      this.add(item);
    return this;
  }
  unmerge(cache) {
    for (const item of cache.values())
      this.remove(item);
    return this;
  }
  clone() {
    return new Cache().merge(this);
  }
};
var Selector = class {
  constructor(selector, id) {
    this.selector = selector;
    this.id = id;
  }
  getStyles() {
    return this.selector;
  }
  clone() {
    return this;
  }
};
var Style = class extends Cache {
  constructor(style2, id) {
    super();
    this.style = style2;
    this.id = id;
  }
  getStyles() {
    return `${this.sheet.join(",")}{${this.style}}`;
  }
  clone() {
    return new Style(this.style, this.id).merge(this);
  }
};
var Rule = class extends Cache {
  constructor(rule, style2, id) {
    super();
    this.rule = rule;
    this.style = style2;
    this.id = id;
  }
  getStyles() {
    return `${this.rule}{${this.style}${join(this.sheet)}}`;
  }
  clone() {
    return new Rule(this.rule, this.style, this.id).merge(this);
  }
};
function key(id, styles) {
  if (!styles.$displayName)
    return id;
  return `${styles.$displayName}_${id}`;
}
var FreeStyle = class extends Cache {
  constructor(id, changes) {
    super(changes);
    this.id = id;
  }
  registerStyle(css) {
    const ruleList = [];
    const styleList = [];
    const pid = stylize(ruleList, styleList, "", css, ".&");
    const id = `f${stringHash(pid)}`;
    const name = key(id, css);
    compose(this, ruleList, styleList, id, false ? name : escape(name));
    return name;
  }
  registerKeyframes(keyframes2) {
    return this.registerHashRule("@keyframes", keyframes2);
  }
  registerHashRule(prefix, styles) {
    return this.registerStyle({
      $global: true,
      $displayName: styles.$displayName,
      [`${prefix} &`]: styles
    });
  }
  registerRule(rule, styles) {
    return this.registerStyle({ $global: true, [rule]: styles });
  }
  registerCss(styles) {
    return this.registerRule("", styles);
  }
  getStyles() {
    return join(this.sheet);
  }
  clone() {
    return new FreeStyle(this.id, this.changes).merge(this);
  }
};
function create(changes) {
  return new FreeStyle(`f${(++uniqueId).toString(36)}`, changes);
}

// packages/style/src/formatting.ts
function convertToStyles(object) {
  const styles = {};
  for (const key2 in object) {
    const val = object[key2];
    if (key2 === "$nest") {
      const nested = val;
      for (let selector in nested) {
        const subproperties = nested[selector];
        styles[selector] = convertToStyles(subproperties);
      }
    } else if (key2 === "$debugName") {
      styles.$displayName = val;
    } else {
      styles[key2] = val;
    }
  }
  return styles;
}
function convertToKeyframes(frames) {
  const result = {};
  for (const offset in frames) {
    if (offset !== "$debugName") {
      result[offset] = frames[offset];
    }
  }
  if (frames.$debugName) {
    result.$displayName = frames.$debugName;
  }
  return result;
}

// packages/style/src/utilities.ts
var raf = typeof requestAnimationFrame === "undefined" ? (cb) => setTimeout(cb) : typeof window === "undefined" ? requestAnimationFrame : requestAnimationFrame.bind(window);
function extend(...objects) {
  const result = {};
  for (const object of objects) {
    if (object == null || object === false) {
      continue;
    }
    for (const key2 in object) {
      const val = object[key2];
      if (!val && val !== 0) {
        continue;
      }
      if (key2 === "$nest" && val) {
        result[key2] = result["$nest"] ? extend(result["$nest"], val) : val;
      } else if (key2.indexOf("&") !== -1 || key2.indexOf("@media") === 0) {
        result[key2] = result[key2] ? extend(result[key2], val) : val;
      } else {
        result[key2] = val;
      }
    }
  }
  return result;
}

// packages/style/src/typestyle.ts
var createFreeStyle = () => create();
var TypeStyle = class {
  constructor({ autoGenerateTag }) {
    this.cssRaw = (mustBeValidCSS) => {
      if (!mustBeValidCSS) {
        return;
      }
      this._raw += mustBeValidCSS || "";
      this._pendingRawChange = true;
      this._styleUpdated();
    };
    this.cssRule = (selector, ...objects) => {
      const styles = convertToStyles(extend(...objects));
      this._freeStyle.registerRule(selector, styles);
      this._styleUpdated();
      return;
    };
    this.forceRenderStyles = () => {
      const target = this._getTag();
      if (!target) {
        return;
      }
      target.textContent = this.getStyles();
    };
    this.fontFace = (...fontFace2) => {
      const freeStyle = this._freeStyle;
      for (const face of fontFace2) {
        freeStyle.registerRule("@font-face", face);
      }
      this._styleUpdated();
      return;
    };
    this.getStyles = () => {
      return (this._raw || "") + this._freeStyle.getStyles();
    };
    this.keyframes = (frames) => {
      const keyframes2 = convertToKeyframes(frames);
      const animationName = this._freeStyle.registerKeyframes(keyframes2);
      this._styleUpdated();
      return animationName;
    };
    this.reinit = () => {
      const freeStyle = createFreeStyle();
      this._freeStyle = freeStyle;
      this._lastFreeStyleChangeId = freeStyle.changeId;
      this._raw = "";
      this._pendingRawChange = false;
      const target = this._getTag();
      if (target) {
        target.textContent = "";
      }
    };
    this.setStylesTarget = (tag) => {
      if (this._tag) {
        this._tag.textContent = "";
      }
      this._tag = tag;
      this.forceRenderStyles();
    };
    this.stylesheet = (classes) => {
      const classNames = Object.getOwnPropertyNames(classes);
      const result = {};
      for (let className of classNames) {
        const classDef = classes[className];
        if (classDef) {
          classDef.$debugName = className;
          result[className] = this.style(classDef);
        }
      }
      return result;
    };
    const freeStyle = createFreeStyle();
    this._autoGenerateTag = autoGenerateTag;
    this._freeStyle = freeStyle;
    this._lastFreeStyleChangeId = freeStyle.changeId;
    this._pending = 0;
    this._pendingRawChange = false;
    this._raw = "";
    this._tag = void 0;
    this.style = this.style.bind(this);
  }
  _afterAllSync(cb) {
    this._pending++;
    const pending = this._pending;
    raf(() => {
      if (pending !== this._pending) {
        return;
      }
      cb();
    });
  }
  _getTag() {
    if (this._tag) {
      return this._tag;
    }
    if (this._autoGenerateTag) {
      const tag = typeof window === "undefined" ? { textContent: "" } : document.createElement("style");
      if (typeof document !== "undefined") {
        document.head.appendChild(tag);
      }
      this._tag = tag;
      return tag;
    }
    return void 0;
  }
  _styleUpdated() {
    const changeId = this._freeStyle.changeId;
    const lastChangeId = this._lastFreeStyleChangeId;
    if (!this._pendingRawChange && changeId === lastChangeId) {
      return;
    }
    this._lastFreeStyleChangeId = changeId;
    this._pendingRawChange = false;
    this._afterAllSync(() => this.forceRenderStyles());
  }
  style(...args) {
    const className = this._freeStyle.registerStyle(convertToStyles(extend.apply(void 0, args)));
    this._styleUpdated();
    return className;
  }
};
var typeStyle = new TypeStyle({ autoGenerateTag: true });

// packages/style/src/snippets.ts
function rotate(degree) {
  if (degree !== 0 && !degree)
    return "";
  let value = `rotate(${degree}deg)`;
  return style({
    transform: value
  });
}

// packages/style/src/index.ts
var cssRaw = typeStyle.cssRaw;
var cssRule = typeStyle.cssRule;
var fontFace = typeStyle.fontFace;
var keyframes = typeStyle.keyframes;
var style = typeStyle.style;

// packages/base/src/observable.ts
var INSERT = "insert";
var UPDATE = "update";
var DELETE = "delete";
var REVERSE = "reverse";
var SHUFFLE = "shuffle";
var oMetaKey = Symbol.for("object-observer-meta-key-0");
var validObservableOptionKeys = { async: 1 };
var processObserveOptions = (options) => {
  if (!options || typeof options !== "object") {
    return null;
  }
  const result = {};
  const invalidOptions = [];
  for (const [optName, optVal] of Object.entries(options)) {
    if (optName === "path") {
      if (typeof optVal !== "string" || optVal === "") {
        throw new Error('"path" option, if/when provided, MUST be a non-empty string');
      }
      result[optName] = optVal;
    } else if (optName === "pathsOf") {
      if (options.path) {
        throw new Error('"pathsOf" option MAY NOT be specified together with "path" option');
      }
      if (typeof optVal !== "string") {
        throw new Error('"pathsOf" option, if/when provided, MUST be a string (MAY be empty)');
      }
      result[optName] = options.pathsOf.split(".").filter(Boolean);
    } else if (optName === "pathsFrom") {
      if (options.path || options.pathsOf) {
        throw new Error('"pathsFrom" option MAY NOT be specified together with "path"/"pathsOf" option/s');
      }
      if (typeof optVal !== "string" || optVal === "") {
        throw new Error('"pathsFrom" option, if/when provided, MUST be a non-empty string');
      }
      result[optName] = optVal;
    } else {
      invalidOptions.push(optName);
    }
  }
  if (invalidOptions.length) {
    throw new Error(`'${invalidOptions.join(", ")}' is/are not a valid observer option/s`);
  }
  return result;
};
var observe = function observe2(observer, options) {
  if (typeof observer !== "function") {
    throw new Error(`observer MUST be a function, got '${observer}'`);
  }
  const observers = this[oMetaKey].observers;
  if (!observers.some((o) => o[0] === observer)) {
    observers.push([observer, processObserveOptions(options)]);
  } else {
    console.warn("observer may be bound to an observable only once; will NOT rebind");
  }
};
var unobserve = function unobserve2() {
  const observers = this[oMetaKey].observers;
  let ol = observers.length;
  if (ol) {
    let al = arguments.length;
    if (al) {
      while (al--) {
        let i = ol;
        while (i--) {
          if (observers[i][0] === arguments[al]) {
            observers.splice(i, 1);
            ol--;
          }
        }
      }
    } else {
      observers.splice(0);
    }
  }
};
var clearObservers = function unobserve3() {
  this[oMetaKey].observers = [];
};
var propertiesBluePrint = { __observe: { value: observe }, __unobserve: { value: unobserve }, __clearObservers: { value: clearObservers } };
var prepareObject = (source, oMeta) => {
  const target = Object.defineProperties({}, propertiesBluePrint);
  target[oMetaKey] = oMeta;
  for (const key2 in source) {
    target[key2] = getObservedOf(source[key2], key2, oMeta);
  }
  return target;
};
var prepareArray = (source, oMeta) => {
  let l = source.length;
  const target = Object.defineProperties(new Array(l), propertiesBluePrint);
  target[oMetaKey] = oMeta;
  for (let i = 0; i < l; i++) {
    target[i] = getObservedOf(source[i], i, oMeta);
  }
  return target;
};
var prepareTypedArray = (source, oMeta) => {
  Object.defineProperties(source, propertiesBluePrint);
  source[oMetaKey] = oMeta;
  return source;
};
var filterChanges = (options, changes) => {
  if (!options) {
    return changes;
  }
  let result = changes;
  if (options.path) {
    const oPath = options.path;
    result = changes.filter((change) => change.path.join(".") === oPath);
  } else if (options.pathsOf) {
    const oPathsOf = options.pathsOf;
    const oPathsOfStr = oPathsOf.join(".");
    result = changes.filter((change) => (change.path.length === oPathsOf.length + 1 || change.path.length === oPathsOf.length && (change.type === REVERSE || change.type === SHUFFLE)) && change.path.join(".").startsWith(oPathsOfStr));
  } else if (options.pathsFrom) {
    const oPathsFrom = options.pathsFrom;
    result = changes.filter((change) => change.path.join(".").startsWith(oPathsFrom));
  }
  return result;
};
var callObserverSafe = (listener, changes) => {
  try {
    listener(changes);
  } catch (e) {
    console.error(`failed to notify listener ${listener} with ${changes}`, e);
  }
};
var callObserversFromMT = function callObserversFromMT2() {
  const batches = this.batches;
  this.batches = null;
  for (const [listener, changes] of batches) {
    callObserverSafe(listener, changes);
  }
};
var callObservers = (oMeta, changes) => {
  let currentObservable = oMeta;
  let observers, target, options, relevantChanges, i;
  const l = changes.length;
  do {
    observers = currentObservable.observers;
    i = observers.length;
    while (i--) {
      [target, options] = observers[i];
      relevantChanges = filterChanges(options, changes);
      if (relevantChanges.length) {
        if (currentObservable.options.async) {
          if (!currentObservable.batches) {
            currentObservable.batches = [];
            queueMicrotask(callObserversFromMT.bind(currentObservable));
          }
          let rb;
          for (const b of currentObservable.batches) {
            if (b[0] === target) {
              rb = b;
              break;
            }
          }
          if (!rb) {
            rb = [target, []];
            currentObservable.batches.push(rb);
          }
          Array.prototype.push.apply(rb[1], relevantChanges);
        } else {
          callObserverSafe(target, relevantChanges);
        }
      }
    }
    if (currentObservable.parent) {
      const clonedChanges = new Array(l);
      for (let j = 0; j < l; j++) {
        clonedChanges[j] = __spreadValues({}, changes[j]);
        clonedChanges[j].path = [currentObservable.ownKey, ...clonedChanges[j].path];
      }
      changes = clonedChanges;
      currentObservable = currentObservable.parent;
    } else {
      currentObservable = null;
    }
  } while (currentObservable);
};
var getObservedOf = (item, key2, parent) => {
  if (!item || typeof item !== "object") {
    return item;
  } else if (Array.isArray(item)) {
    return new ArrayOMeta({ target: item, ownKey: key2, parent }).proxy;
  } else if (ArrayBuffer.isView(item)) {
    return new TypedArrayOMeta({ target: item, ownKey: key2, parent }).proxy;
  } else if (item instanceof Date) {
    return item;
  } else {
    return new ObjectOMeta({ target: item, ownKey: key2, parent }).proxy;
  }
};
var proxiedPop = function proxiedPop2() {
  const oMeta = this[oMetaKey], target = oMeta.target, poppedIndex = target.length - 1;
  let popResult = target.pop();
  if (popResult && typeof popResult === "object") {
    const tmpObserved = popResult[oMetaKey];
    if (tmpObserved) {
      popResult = tmpObserved.detach();
    }
  }
  const changes = [new Change(DELETE, [poppedIndex], void 0, popResult, this)];
  callObservers(oMeta, changes);
  return popResult;
};
var proxiedPush = function proxiedPush2() {
  const oMeta = this[oMetaKey], target = oMeta.target, l = arguments.length, pushContent = new Array(l), initialLength = target.length;
  for (let i = 0; i < l; i++) {
    pushContent[i] = getObservedOf(arguments[i], initialLength + i, oMeta);
  }
  const pushResult = Reflect.apply(target.push, target, pushContent);
  const changes = [];
  for (let i = initialLength, j = target.length; i < j; i++) {
    changes[i - initialLength] = new Change(INSERT, [i], target[i], void 0, this);
  }
  callObservers(oMeta, changes);
  return pushResult;
};
var proxiedShift = function proxiedShift2() {
  const oMeta = this[oMetaKey], target = oMeta.target;
  let shiftResult, i, l, item, tmpObserved;
  shiftResult = target.shift();
  if (shiftResult && typeof shiftResult === "object") {
    tmpObserved = shiftResult[oMetaKey];
    if (tmpObserved) {
      shiftResult = tmpObserved.detach();
    }
  }
  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];
    if (item && typeof item === "object") {
      tmpObserved = item[oMetaKey];
      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }
  const changes = [new Change(DELETE, [0], void 0, shiftResult, this)];
  callObservers(oMeta, changes);
  return shiftResult;
};
var proxiedUnshift = function proxiedUnshift2() {
  const oMeta = this[oMetaKey], target = oMeta.target, al = arguments.length, unshiftContent = new Array(al);
  for (let i = 0; i < al; i++) {
    unshiftContent[i] = getObservedOf(arguments[i], i, oMeta);
  }
  const unshiftResult = Reflect.apply(target.unshift, target, unshiftContent);
  for (let i = 0, l2 = target.length, item; i < l2; i++) {
    item = target[i];
    if (item && typeof item === "object") {
      const tmpObserved = item[oMetaKey];
      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }
  const l = unshiftContent.length;
  const changes = new Array(l);
  for (let i = 0; i < l; i++) {
    changes[i] = new Change(INSERT, [i], target[i], void 0, this);
  }
  callObservers(oMeta, changes);
  return unshiftResult;
};
var proxiedReverse = function proxiedReverse2() {
  const oMeta = this[oMetaKey], target = oMeta.target;
  let i, l, item;
  target.reverse();
  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];
    if (item && typeof item === "object") {
      const tmpObserved = item[oMetaKey];
      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }
  const changes = [new Change(REVERSE, [], void 0, void 0, this)];
  callObservers(oMeta, changes);
  return this;
};
var proxiedSort = function proxiedSort2(comparator) {
  const oMeta = this[oMetaKey], target = oMeta.target;
  let i, l, item;
  target.sort(comparator);
  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];
    if (item && typeof item === "object") {
      const tmpObserved = item[oMetaKey];
      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }
  const changes = [new Change(SHUFFLE, [], void 0, void 0, this)];
  callObservers(oMeta, changes);
  return this;
};
var proxiedFill = function proxiedFill2(filVal, start, end) {
  const oMeta = this[oMetaKey], target = oMeta.target, changes = [], tarLen = target.length, prev = target.slice(0);
  start = start === void 0 ? 0 : start < 0 ? Math.max(tarLen + start, 0) : Math.min(start, tarLen);
  end = end === void 0 ? tarLen : end < 0 ? Math.max(tarLen + end, 0) : Math.min(end, tarLen);
  if (start < tarLen && end > start) {
    target.fill(filVal, start, end);
    let tmpObserved;
    for (let i = start, item, tmpTarget; i < end; i++) {
      item = target[i];
      target[i] = getObservedOf(item, i, oMeta);
      if (i in prev) {
        tmpTarget = prev[i];
        if (tmpTarget && typeof tmpTarget === "object") {
          tmpObserved = tmpTarget[oMetaKey];
          if (tmpObserved) {
            tmpTarget = tmpObserved.detach();
          }
        }
        changes.push(new Change(UPDATE, [i], target[i], tmpTarget, this));
      } else {
        changes.push(new Change(INSERT, [i], target[i], void 0, this));
      }
    }
    callObservers(oMeta, changes);
  }
  return this;
};
var proxiedCopyWithin = function proxiedCopyWithin2(dest, start, end) {
  const oMeta = this[oMetaKey], target = oMeta.target, tarLen = target.length;
  dest = dest < 0 ? Math.max(tarLen + dest, 0) : dest;
  start = start === void 0 ? 0 : start < 0 ? Math.max(tarLen + start, 0) : Math.min(start, tarLen);
  end = end === void 0 ? tarLen : end < 0 ? Math.max(tarLen + end, 0) : Math.min(end, tarLen);
  const len = Math.min(end - start, tarLen - dest);
  if (dest < tarLen && dest !== start && len > 0) {
    const prev = target.slice(0), changes = [];
    target.copyWithin(dest, start, end);
    for (let i = dest, nItem, oItem, tmpObserved; i < dest + len; i++) {
      nItem = target[i];
      if (nItem && typeof nItem === "object") {
        nItem = getObservedOf(nItem, i, oMeta);
        target[i] = nItem;
      }
      oItem = prev[i];
      if (oItem && typeof oItem === "object") {
        tmpObserved = oItem[oMetaKey];
        if (tmpObserved) {
          oItem = tmpObserved.detach();
        }
      }
      if (typeof nItem !== "object" && nItem === oItem) {
        continue;
      }
      changes.push(new Change(UPDATE, [i], nItem, oItem, this));
    }
    callObservers(oMeta, changes);
  }
  return this;
};
var proxiedSplice = function proxiedSplice2() {
  const oMeta = this[oMetaKey], target = oMeta.target, splLen = arguments.length, spliceContent = new Array(splLen), tarLen = target.length;
  for (let i2 = 0; i2 < splLen; i2++) {
    spliceContent[i2] = getObservedOf(arguments[i2], i2, oMeta);
  }
  const startIndex = splLen === 0 ? 0 : spliceContent[0] < 0 ? tarLen + spliceContent[0] : spliceContent[0], removed = splLen < 2 ? tarLen - startIndex : spliceContent[1], inserted = Math.max(splLen - 2, 0), spliceResult = Reflect.apply(target.splice, target, spliceContent), newTarLen = target.length;
  let tmpObserved;
  for (let i2 = 0, item2; i2 < newTarLen; i2++) {
    item2 = target[i2];
    if (item2 && typeof item2 === "object") {
      tmpObserved = item2[oMetaKey];
      if (tmpObserved) {
        tmpObserved.ownKey = i2;
      }
    }
  }
  let i, l, item;
  for (i = 0, l = spliceResult.length; i < l; i++) {
    item = spliceResult[i];
    if (item && typeof item === "object") {
      tmpObserved = item[oMetaKey];
      if (tmpObserved) {
        spliceResult[i] = tmpObserved.detach();
      }
    }
  }
  const changes = [];
  let index;
  for (index = 0; index < removed; index++) {
    if (index < inserted) {
      changes.push(new Change(UPDATE, [startIndex + index], target[startIndex + index], spliceResult[index], this));
    } else {
      changes.push(new Change(DELETE, [startIndex + index], void 0, spliceResult[index], this));
    }
  }
  for (; index < inserted; index++) {
    changes.push(new Change(INSERT, [startIndex + index], target[startIndex + index], void 0, this));
  }
  callObservers(oMeta, changes);
  return spliceResult;
};
var proxiedTypedArraySet = function proxiedTypedArraySet2(source, offset) {
  const oMeta = this[oMetaKey], target = oMeta.target, souLen = source.length, prev = target.slice(0);
  offset = offset || 0;
  target.set(source, offset);
  const changes = new Array(souLen);
  for (let i = offset; i < souLen + offset; i++) {
    changes[i - offset] = new Change(UPDATE, [i], target[i], prev[i], this);
  }
  callObservers(oMeta, changes);
};
var proxiedArrayMethods = {
  pop: proxiedPop,
  push: proxiedPush,
  shift: proxiedShift,
  unshift: proxiedUnshift,
  reverse: proxiedReverse,
  sort: proxiedSort,
  fill: proxiedFill,
  copyWithin: proxiedCopyWithin,
  splice: proxiedSplice
};
var proxiedTypedArrayMethods = {
  reverse: proxiedReverse,
  sort: proxiedSort,
  fill: proxiedFill,
  copyWithin: proxiedCopyWithin,
  set: proxiedTypedArraySet
};
var Change = class {
  constructor(type, path, value, oldValue, object) {
    this.type = type;
    this.path = path;
    this.value = value;
    this.oldValue = oldValue;
    this.object = object;
  }
};
var OMetaBase = class {
  constructor(properties, cloningFunction) {
    const { target, parent, ownKey } = properties;
    if (parent && ownKey !== void 0) {
      this.parent = parent;
      this.ownKey = ownKey;
    } else {
      this.parent = null;
      this.ownKey = null;
    }
    const targetClone = cloningFunction(target, this);
    this.observers = [];
    this.revocable = Proxy.revocable(targetClone, this);
    this.proxy = this.revocable.proxy;
    this.target = targetClone;
    this.options = this.processOptions(properties.options);
  }
  processOptions(options) {
    if (options) {
      if (typeof options !== "object") {
        throw new Error(`Observable options if/when provided, MAY only be an object, got '${options}'`);
      }
      const invalidOptions = Object.keys(options).filter((option) => !(option in validObservableOptionKeys));
      if (invalidOptions.length) {
        throw new Error(`'${invalidOptions.join(", ")}' is/are not a valid Observable option/s`);
      }
      return Object.assign({}, options);
    } else {
      return {};
    }
  }
  detach() {
    this.parent = null;
    return this.target;
  }
  set(target, key2, value) {
    let oldValue = target[key2];
    if (value !== oldValue) {
      const newValue = getObservedOf(value, key2, this);
      target[key2] = newValue;
      if (oldValue && typeof oldValue === "object") {
        const tmpObserved = oldValue[oMetaKey];
        if (tmpObserved) {
          oldValue = tmpObserved.detach();
        }
      }
      const changes = oldValue === void 0 ? [new Change(INSERT, [key2], newValue, void 0, this.proxy)] : [new Change(UPDATE, [key2], newValue, oldValue, this.proxy)];
      callObservers(this, changes);
    }
    return true;
  }
  deleteProperty(target, key2) {
    let oldValue = target[key2];
    delete target[key2];
    if (oldValue && typeof oldValue === "object") {
      const tmpObserved = oldValue[oMetaKey];
      if (tmpObserved) {
        oldValue = tmpObserved.detach();
      }
    }
    const changes = [new Change(DELETE, [key2], void 0, oldValue, this.proxy)];
    callObservers(this, changes);
    return true;
  }
};
var ObjectOMeta = class extends OMetaBase {
  constructor(properties) {
    super(properties, prepareObject);
  }
};
var ArrayOMeta = class extends OMetaBase {
  constructor(properties) {
    super(properties, prepareArray);
  }
  get(target, key2) {
    return proxiedArrayMethods[key2] || target[key2];
  }
};
var TypedArrayOMeta = class extends OMetaBase {
  constructor(properties) {
    super(properties, prepareTypedArray);
  }
  get(target, key2) {
    return proxiedTypedArrayMethods[key2] || target[key2];
  }
};
var Observable = Object.freeze({
  from: (target, options) => {
    if (!target || typeof target !== "object") {
      throw new Error("observable MAY ONLY be created from a non-null object");
    } else if (target[oMetaKey]) {
      return target;
    } else if (Array.isArray(target)) {
      return new ArrayOMeta({ target, ownKey: null, parent: null, options }).proxy;
    } else if (ArrayBuffer.isView(target)) {
      return new TypedArrayOMeta({ target, ownKey: null, parent: null, options }).proxy;
    } else if (target instanceof Date) {
      throw new Error(`${target} found to be one of a non-observable types`);
    } else {
      return new ObjectOMeta({ target, ownKey: null, parent: null, options }).proxy;
    }
  },
  isObservable: (input) => {
    return !!(input && input[oMetaKey]);
  }
});
function isObservable(input) {
  return !!(input && input[oMetaKey]);
}
function Observe(target, callback, options) {
  if (!target)
    return;
  if (!!(target && target[oMetaKey])) {
    if (callback)
      target.__observe(callback, options);
    return target;
  }
  ;
  let result;
  if (!target || typeof target !== "object") {
    throw new Error("observable MAY ONLY be created from a non-null object");
  } else if (target[oMetaKey]) {
    result = target;
  } else if (Array.isArray(target)) {
    result = new ArrayOMeta({ target, ownKey: null, parent: null }).proxy;
  } else if (ArrayBuffer.isView(target)) {
    result = new TypedArrayOMeta({ target, ownKey: null, parent: null }).proxy;
  } else if (target instanceof Date) {
    throw new Error(`${target} found to be one of a non-observable types`);
  } else {
    result = new ObjectOMeta({ target, ownKey: null, parent: null }).proxy;
  }
  if (callback)
    result.__observe(callback, options);
  return result;
}
function Unobserve(target, observer) {
  if (!target)
    return;
  if (!!(target && target[oMetaKey])) {
    target.__unobserve(observer);
  }
}
function ClearObservers(target) {
  if (!target)
    return;
  if (!!(target && target[oMetaKey])) {
    target.__clearObservers();
  }
}
function observable(propName) {
  return function(target, propertyName) {
    target["$observableProps"] = target["$observableProps"] || {};
    target["$observableProps"][propName || propertyName] = propertyName;
  };
}
function initObservables(target) {
  let observables = target["$observableProps"];
  target["$observables"] = target["$observables"] || {};
  for (let propName in observables) {
    let propertyName = observables[propName];
    let val = Observe({});
    let isObject = false;
    target["$observables"][propName] = val;
    const getter = function() {
      if (isObject)
        return val;
      else {
        return val.value;
      }
    };
    const setter = function(newVal) {
      if (typeof newVal == "object") {
        isObject = true;
        Object.assign(val, newVal);
      } else {
        isObject = false;
        val.value = newVal;
      }
    };
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter
    });
  }
}

// packages/base/src/component.ts
var Component = class extends HTMLElement {
  constructor(parent, options, defaults) {
    super();
    this.attrs = {};
    this.options = options || {};
    this.defaults = defaults || {};
    initObservables(this);
  }
  connectedCallback() {
    if (this.connected)
      return;
    this.connected = true;
    if (!this.initialized)
      this.init();
  }
  disconnectCallback() {
    this.connected = false;
  }
  createElement(tagName, parentElm) {
    let result = document.createElement(tagName);
    if (parentElm)
      parentElm.appendChild(result);
    return result;
  }
  getValue(target, paths, idx) {
    idx = idx || 0;
    let path = paths[idx];
    let value = target[path];
    idx++;
    if (paths.length > idx)
      try {
        return this.getValue(value, paths, idx);
      } catch (error) {
        return value;
      }
    else
      return value;
  }
  getAttribute(name, removeAfter, defaultValue2) {
    if (this.options[name] != null)
      return this.options[name];
    else if (this.attrs[name] != null && this.attrs[name] != void 0) {
      if (this.attrs[name].__target)
        return this.getValue(this.attrs[name].__target, this.attrs[name].__path);
      else
        return this.attrs[name];
    } else {
      let value = super.getAttribute(name);
      if (value && value.__target)
        return;
      else if (value != null) {
        if (value == "false" || value == "true")
          value = JSON.parse(value);
        this.options[name] = value;
        if (removeAfter)
          this.removeAttribute(name);
        return value;
      } else if (this.defaults[name] != null)
        return this.defaults[name];
    }
    ;
    return defaultValue2;
  }
  getPositionAttribute(name, removeAfter, defaultValue2) {
    let result = parseFloat(this.getAttribute(name, removeAfter, defaultValue2));
    if (removeAfter && result)
      this.style[name] = result + "px";
    return result;
  }
  getStyleAttribute(name, removeAfter, defaultValue2) {
    let result = this.getAttribute(name, removeAfter, defaultValue2);
    if (removeAfter && result)
      this.style[name] = result;
    return result;
  }
  getMarginStyle() {
    const toNumber = (value) => {
      return parseFloat(value.replace("px", ""));
    };
    const computedStyle = window.getComputedStyle(this);
    const left = toNumber(computedStyle.marginLeft);
    const right = toNumber(computedStyle.marginRight);
    const bottom = toNumber(computedStyle.marginBottom);
    const top = toNumber(computedStyle.marginTop);
    return { top, right, bottom, left };
  }
  get id() {
    return this.getAttribute("id");
  }
  set id(value) {
    this.options.id = value;
    this.setAttribute("id", value);
  }
  init() {
    this.initialized = true;
  }
};

// packages/base/src/style/base.css.ts
cssRule("body", {
  background: theme_exports.ThemeVars.background.default,
  backgroundAttachment: "fixed !important",
  margin: 0,
  padding: 0,
  $nest: {
    "*, *:before, *:after": {
      boxSizing: "border-box"
    },
    ".text-left": {
      textAlign: "left"
    },
    ".text-right": {
      textAlign: "right"
    },
    ".text-center": {
      textAlign: "center"
    },
    ".bold": {
      fontWeight: "bold"
    },
    ".inline-flex": {
      display: "inline-flex"
    },
    ".flex": {
      display: "flex"
    },
    ".inline-block": {
      display: "inline-block"
    },
    ".mr-1": {
      marginRight: "1rem !important"
    },
    ".ml-1": {
      marginLeft: "1rem !important"
    },
    ".mb-1": {
      marginBottom: "1rem !important"
    },
    ".mt-1": {
      marginTop: "1rem !important"
    },
    ".mb-2": {
      marginBottom: "2rem"
    },
    ".pointer": {
      cursor: "pointer"
    },
    "@media only screen and (max-width: 767px)": {
      $nest: {
        "i-hstack": {
          flexWrap: "wrap"
        }
      }
    }
  }
});
var disabledStyle = style({
  opacity: 0.4,
  cursor: "default"
});
var contentCenterStyle = style({
  margin: "0 auto"
});
var containerStyle = style({
  $nest: {
    ".e-resize": {
      position: "absolute",
      right: "0px",
      height: "100%",
      width: "4px",
      cursor: "e-resize"
    },
    ".n-resize": {
      position: "absolute",
      top: "0px",
      height: "4px",
      width: "100%",
      cursor: "n-resize"
    },
    ".s-resize": {
      position: "absolute",
      bottom: "0px",
      height: "4px",
      width: "100%",
      cursor: "s-resize"
    },
    ".w-resize": {
      position: "absolute",
      left: "0px",
      height: "100%",
      width: "4px",
      cursor: "w-resize"
    },
    ".highlight": {
      backgroundColor: theme_exports.ThemeVars.colors.info.dark
    },
    ".resizing": {
      userSelect: "none",
      pointerEvents: "none"
    }
  }
});

// packages/base/src/control.ts
var _refreshTimeout;
function refresh() {
  if (!document.body.style.opacity)
    document.body.style.opacity = "0";
  clearTimeout(_refreshTimeout);
  _refreshTimeout = setTimeout(() => {
    try {
      clearTimeout(_refreshTimeout);
      _refreshTimeout = void 0;
      let width = window.innerWidth - 1;
      let height = window.innerHeight - 1;
      for (let i = 0; i < document.body.childNodes.length; i++) {
        let node = document.body.childNodes[i];
        if (node instanceof Container) {
          node.style.position = "absolute";
          node.style.width = width + "px";
          node.style.height = height + "px";
          node.style.overflowX = "hidden";
          node.refresh();
        }
      }
    } finally {
      document.body.style.opacity = "1";
    }
  }, 10);
}
window.addEventListener("resize", () => {
  refresh();
});
var Control = class extends Component {
  constructor(parent, options, defaults) {
    super(parent, options, defaults);
    this._enabled = true;
    this._paddingLeft = 0;
    this._paddingTop = 0;
    this._paddingRight = 0;
    this._paddingBottom = 0;
    this._marginLeft = 0;
    this._marginTop = 0;
    this._marginRight = 0;
    this._marginBottom = 0;
    this._anchorLeft = true;
    this._anchorTop = true;
    this._anchorRight = false;
    this._anchorBottom = false;
    this._visible = true;
    this._contentCenter = false;
    if (parent instanceof Container)
      this.parent = parent;
  }
  static async create(options, parent, defaults) {
    let self = new this(parent, options);
    if (!self.initialized)
      await self.init();
    return self;
  }
  get color() {
    return this.style.backgroundColor;
  }
  set color(value) {
    this.style.backgroundColor = value;
  }
  get margin() {
    return this._margin;
  }
  set margin(value) {
    this._margin = value;
    const { top = 0, right = 0, bottom = 0, left = 0 } = value;
    this.style.margin = `${this.getSpacingValue(top)} ${this.getSpacingValue(right)} ${this.getSpacingValue(bottom)} ${this.getSpacingValue(left)}`;
    const { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft } = this.getMarginStyle();
    this._marginLeft = marginLeft;
    this._marginTop = marginTop;
    this._marginRight = marginRight;
    this._marginBottom = marginBottom;
  }
  get padding() {
    return this._padding;
  }
  set padding(value) {
    this._padding = value;
    const { top = 0, right = 0, bottom = 0, left = 0 } = value;
    this.style.padding = `${this.getSpacingValue(top)} ${this.getSpacingValue(right)} ${this.getSpacingValue(bottom)} ${this.getSpacingValue(left)}`;
  }
  get parent() {
    return this._parent;
  }
  set parent(value) {
    if (this._parent != value) {
      if (this._parent) {
        this._parent.controls.splice(this._parent.controls.indexOf(this), 1);
        this._parent.removeChild(this);
        if (!_refreshTimeout)
          this._parent.refresh();
      }
      ;
      this._parent = value;
      if (this._parent) {
        this._parent.controls.push(this);
        if (this.parentNode != value) {
          this._parent.appendChild(this);
          if (!_refreshTimeout)
            this._parent.refresh();
        }
      }
    }
  }
  getSpacingValue(value) {
    if (typeof value === "number")
      return value + "px";
    if (value === "auto")
      return value;
    const unit = value.replace(/\d+(\.\d+)?/g, "");
    const number = value.replace(unit, "");
    const isValidUnit = ["px", "em", "rem", "%"].includes(unit);
    return isValidUnit ? value : `${number}px`;
  }
  connectedCallback() {
    super.connectedCallback();
    refresh();
  }
  disconnectCallback() {
    this.parent = void 0;
    super.disconnectCallback();
  }
  getParentHeight() {
    if (!this._parent)
      return window.innerHeight;
    else
      return this._parent.offsetHeight;
  }
  getParentWidth() {
    if (!this._parent)
      return window.innerWidth;
    else {
      return this._parent.offsetWidth;
    }
  }
  getParentOccupiedLeft() {
    if (!this._parent)
      return 0;
    else {
      let result = 0;
      for (let i = 0; i < this._parent.controls.length; i++) {
        let control = this._parent.controls[i];
        if (control === this) {
          if (this.dock == "left")
            return result;
        } else if (control.visible && control.dock == "left")
          result += control.offsetWidth + control._marginLeft + control._marginRight;
      }
      ;
      return result;
    }
    ;
  }
  getParentOccupiedRight() {
    if (!this._parent)
      return 0;
    else {
      let result = 0;
      for (let i = 0; i < this._parent.controls.length; i++) {
        let control = this._parent.controls[i];
        if (control === this) {
          if (this.dock == "right")
            return result;
        } else if (control.dock == "right")
          result += control.offsetWidth;
      }
      ;
      return result;
    }
    ;
  }
  getParentOccupiedBottom() {
    if (!this._parent)
      return 0;
    else {
      let result = 0;
      for (let i = 0; i < this._parent.controls.length; i++) {
        let control = this._parent.controls[i];
        if (control === this) {
          if (this.dock == "bottom")
            return result;
        } else if (control.visible && control.dock == "bottom")
          result += control.offsetHeight;
      }
      ;
      return result;
    }
    ;
  }
  getParentOccupiedTop() {
    if (!this._parent)
      return 0;
    else {
      let result = 0;
      for (let i = 0; i < this._parent.controls.length; i++) {
        let control = this._parent.controls[i];
        if (control === this) {
          if (this.dock == "top")
            return result;
        } else if (control.visible && control.dock == "top") {
          result += control.offsetHeight + control._marginTop + control._marginBottom;
        }
      }
      ;
      return result;
    }
    ;
  }
  get dock() {
    return this._dock || "";
  }
  set dock(value) {
    this._dock = value;
    if (this._resizer)
      this._resizer.reset();
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    if (this._enabled != value) {
      this._enabled = value;
      if (value) {
        this.classList.remove("disabled");
        this.classList.remove(disabledStyle);
      } else {
        this.classList.add("disabled");
        this.classList.add(disabledStyle);
      }
    }
  }
  _handleOnClick(event) {
    if (this.enabled && this._onClick) {
      event.preventDefault();
      this._onClick(this, event);
    }
  }
  _handleOnContextMenu(event) {
    if (this.enabled && this._onContextMenu) {
      event.preventDefault();
      this._onContextMenu(this, event);
    }
  }
  _handleOnDblClick(event) {
    if (this.enabled && this._onDblClick) {
      event.preventDefault();
      this._onDblClick(this, event);
    }
  }
  get maxWidth() {
    return this.style.maxWidth;
  }
  set maxWidth(value) {
    this.style.maxWidth = value;
  }
  observables(propName) {
    let self = this;
    if (self["$observables"] && self["$observables"][propName])
      return self["$observables"][propName];
  }
  get onClick() {
    return this._onClick;
  }
  set onClick(callback) {
    this._onClick = callback;
  }
  clearInnerHTML() {
    this.innerHTML = "";
  }
  refresh() {
    if (this._dock != null) {
      this.style.position = "absolute";
      switch (this.dock) {
        case "none": {
          if (this._anchorTop == false)
            this.top = (this.getParentHeight() - this.offsetHeight) / 2;
          if (this._anchorLeft == false)
            this.left = (this.getParentWidth() - this.offsetWidth) / 2;
          break;
        }
        case "left": {
          let top = this.getParentOccupiedTop();
          this.top = top + this._marginTop;
          this.left = this.getParentOccupiedLeft();
          this.height = this.getParentHeight() - top - this.getParentOccupiedBottom() - this._marginTop - this._marginBottom;
          break;
        }
        case "top": {
          this.top = this.getParentOccupiedTop();
          this.width = this.getParentWidth();
          if (this._anchorLeft)
            this.left = 0;
          else
            this.left = (this.getParentWidth() - this.offsetWidth) / 2;
          break;
        }
        case "right": {
          let top = this.getParentOccupiedTop();
          this.top = top;
          this.left = this.getParentWidth() - this.getParentOccupiedRight() - this.offsetWidth;
          this.height = this.getParentHeight() - top - this.getParentOccupiedBottom();
          break;
        }
        case "bottom":
          this.top = this.getParentHeight() - this.getParentOccupiedBottom() - this.offsetHeight;
          this.left = 0;
          this.width = this.getParentWidth();
          break;
        case "fill":
          this.width = this.getParentWidth() - this.getParentOccupiedLeft() - this.getParentOccupiedRight();
          this.height = this.getParentHeight() - this.getParentOccupiedTop() - this.getParentOccupiedBottom();
          this.left = this.getParentOccupiedLeft();
          this.top = this.getParentOccupiedTop();
          break;
        case "center":
          this.left = (this.getParentWidth() - this.offsetWidth) / 2;
          this.top = (this.getParentHeight() - this.offsetHeight) / 2;
          break;
      }
    }
    ;
  }
  get resizable() {
    return this.attrs["resizer"] == true && ["left", "top", "right", "bottom"].indexOf(this.dock) >= 0;
  }
  setProperty(propName, value) {
    if (value.__target) {
      let target = value.__target;
      let path = value.__path;
      this[propName] = target[path[0]];
      Observe(target.observables(path[0]), (changes) => {
        let change = changes[0];
        this[propName] = change.value;
      });
    } else {
      this.setAttribute(propName, value);
    }
  }
  init() {
    super.init();
    this.height = this.getAttribute("height", true);
    this.left = this.getAttribute("left", true);
    this.top = this.getAttribute("top", true);
    this.right = this.getAttribute("right", true);
    this.width = this.getAttribute("width", true);
    this.dock = this.getAttribute("dock", true);
    this.color = this.getAttribute("color", true);
    const margin = this.getAttribute("margin", true);
    if (margin)
      this.margin = margin;
    const padding = this.getAttribute("padding", true);
    if (padding)
      this.padding = padding;
    this._marginLeft = this.getPositionAttribute("marginLeft", true, 0);
    this._marginTop = this.getPositionAttribute("marginTop", true, 0);
    this._marginRight = this.getPositionAttribute("marginRight", true, 0);
    this._marginBottom = this.getPositionAttribute("marginBottom", true, 0);
    this._paddingLeft = this.getPositionAttribute("paddingLeft", true, 0);
    this._paddingTop = this.getPositionAttribute("paddingTop", true, 0);
    this._paddingRight = this.getPositionAttribute("paddingRight", true, 0);
    this._paddingBottom = this.getPositionAttribute("paddingBottom", true, 0);
    this._anchorLeft = this.getAttribute("anchorLeft", true, true);
    this._anchorTop = this.getAttribute("anchorTop", true, true);
    this._anchorRight = this.getAttribute("anchorRight", true, false);
    this._anchorBottom = this.getAttribute("anchorBottom", true, false);
    this.maxWidth = this.getAttribute("maxWidth", true);
    this._contentCenter = this.getAttribute("contentCenter", true, false);
    if (this._contentCenter) {
      this.classList.add(contentCenterStyle);
    }
    const flex = this.getAttribute("flex", true);
    if (flex)
      this.flex = flex;
    if (this._left != null || this._top != null)
      this.style.position = "absolute";
    if (this.getAttribute("enabled") !== false)
      this.classList.add("enabled");
    else
      this.enabled = false;
    if (this.getAttribute("visible") == false)
      this.visible = false;
    this.background = this.getAttribute("background", true);
    this.lineHeight = this.getAttribute("lineHeight", true);
    this.linkTo = this.getAttribute("linkTo", true);
    this.minHeight = this.getAttribute("minHeight", true);
    let border = this.getAttribute("border", true);
    if (border) {
      this.border = border;
    }
    this.addEventListener("click", this._handleOnClick.bind(this));
    this.addEventListener("dblclick", this._handleOnDblClick.bind(this));
    this.addEventListener("oncontextmenu", this._handleOnContextMenu.bind(this));
  }
  calculatePositon() {
  }
  setPosition(prop, value) {
    if (value != null && !isNaN(value)) {
      this["_" + prop] = parseFloat(value);
      this.style[prop] = parseFloat(value) + "px";
    } else if (value != null) {
      this["_" + prop] = value;
      this.style[prop] = value;
    }
  }
  get height() {
    return !isNaN(this._height) ? this._height : this.offsetHeight;
  }
  set height(value) {
    this.setPosition("height", value);
  }
  get left() {
    return !isNaN(this._left) ? this._left : this.offsetLeft;
  }
  set left(value) {
    this.setPosition("left", value);
  }
  set right(value) {
    this.setPosition("right", value);
  }
  get top() {
    return !isNaN(this._top) ? this._top : this.offsetTop;
  }
  set top(value) {
    this.setPosition("top", value);
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    if (!this._visible)
      this.style.display = "none";
    else if (this._left != null || this._top != null)
      this.style.display = "block";
    else
      this.style.display = "";
    if (this._parent && !_refreshTimeout)
      this._parent.refresh();
  }
  get width() {
    return !isNaN(this._width) ? this._width : this.offsetWidth;
  }
  set width(value) {
    this.setPosition("width", value);
  }
  get flex() {
    return this._flex;
  }
  set flex(value) {
    this._flex = value;
    if (typeof value === "string") {
      this.style.flex = value;
    } else {
      this.style.flexBasis = value.basis || "";
      this.style.flexGrow = value.grow || "";
      this.style.flexShrink = value.shrink || "";
      this.style.flexWrap = value.wrap || "";
    }
  }
  get background() {
    return this.style.background;
  }
  set background(value) {
    this.style.background = value;
  }
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(value) {
    this.style.lineHeight = "" + value;
  }
  get linkTo() {
    return this._linkTo;
  }
  set linkTo(value) {
    this._linkTo = value;
  }
  get minHeight() {
    return this.style.minHeight;
  }
  set minHeight(value) {
    if (!isNaN(Number(value))) {
      this.style.minHeight = value + "px";
    } else {
      this.style.minHeight = value + "";
    }
  }
  get border() {
    return this._border;
  }
  set border(value) {
    this._border = value;
    if (!value.sides) {
      this.style.borderWidth = value.width || "";
      this.style.borderStyle = value.style || "";
      this.style.borderColor = value.color || "";
      this.style.borderRadius = value.radius || "";
    } else {
      this.setBorderSides("top", value.sides.top);
      this.setBorderSides("right", value.sides.right);
      this.setBorderSides("bottom", value.sides.bottom);
      this.setBorderSides("left", value.sides.left);
    }
  }
  setBorderSides(side, value) {
    this.style.setProperty(`border-${side}-width`, (value == null ? void 0 : value.width) || "");
    this.style.setProperty(`border-${side}-style`, (value == null ? void 0 : value.style) || "");
    this.style.setProperty(`border-${side}-color`, (value == null ? void 0 : value.color) || "");
  }
};
var ContainerResizer = class {
  constructor(target) {
    this.target = target;
    this._mouseDownHandler = this.handleMouseDown.bind(this);
    this._mouseUpHandler = this.handleMouseUp.bind(this);
    this._mouseMoveHandler = this.handleMouseMove.bind(this);
  }
  reset() {
    if (!this.target.resizable && this._resizer) {
      this._resizer.removeEventListener("mousedown", this._mouseDownHandler);
      this.target.removeChild(this._resizer);
      this._resizer = void 0;
    } else if (this.target.resizable) {
      switch (this.target.dock) {
        case "left":
          this.resizer.classList.value = "e-resize";
          break;
        case "top":
          this.resizer.classList.value = "s-resize";
          break;
        case "right":
          this.resizer.classList.value = "w-resize";
          break;
        case "bottom":
          this.resizer.classList.value = "n-resize";
          break;
      }
      ;
    }
    ;
  }
  handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.target.classList.add("resizing");
    this._origHeight = this.target.offsetHeight;
    this._origWidth = this.target.offsetWidth;
    if (this._resizer) {
      this._resizer.classList.add("highlight");
      this._mouseDownPos = {
        x: e.clientX,
        y: e.clientY
      };
      document.addEventListener("mousemove", this._mouseMoveHandler);
      document.addEventListener("mouseup", this._mouseUpHandler);
    }
  }
  handleMouseMove(e) {
    var _a, _b, _c, _d;
    e.preventDefault();
    e.stopPropagation();
    let offsetX = e.clientX - this._mouseDownPos.x;
    let offsetY = e.clientY - this._mouseDownPos.y;
    switch (this.target.dock) {
      case "left":
        this.target.style.width = this._origWidth + offsetX + "px";
        (_a = this.target.parent) == null ? void 0 : _a.refresh();
        break;
      case "top":
        this.target.style.height = this._origHeight + offsetY + "px";
        (_b = this.target.parent) == null ? void 0 : _b.refresh();
        break;
      case "right":
        this.target.style.width = this._origWidth - offsetX + "px";
        (_c = this.target.parent) == null ? void 0 : _c.refresh();
        break;
      case "bottom":
        this.target.style.height = this._origHeight - offsetY + "px";
        (_d = this.target.parent) == null ? void 0 : _d.refresh();
        break;
    }
  }
  handleMouseUp(e) {
    document.removeEventListener("mousemove", this._mouseMoveHandler);
    document.removeEventListener("mouseup", this._mouseUpHandler);
    e.preventDefault();
    e.stopPropagation();
    this.target.classList.remove("resizing");
    if (this._resizer)
      this._resizer.classList.remove("highlight");
  }
  get resizer() {
    if (!this._resizer) {
      this._resizer = document.createElement("span");
      this.target.appendChild(this._resizer);
      this._resizer.addEventListener("mousedown", this._mouseDownHandler);
    }
    ;
    return this._resizer;
  }
};
var Container = class extends Control {
  constructor() {
    super(...arguments);
    this.controls = [];
  }
  get resizer() {
    return this.attrs["resizer"] == true;
  }
  set resizer(value) {
    this.attrs["resizer"] = value;
    if (this.resizable && !this._resizer)
      this._resizer = new ContainerResizer(this);
    if (this._resizer)
      this._resizer.reset();
  }
  init() {
    super.init();
    this.classList.add(containerStyle);
    if (this.resizable && !this._resizer) {
      this._resizer = new ContainerResizer(this);
      this._resizer.reset();
    }
    ;
  }
  refresh() {
    super.refresh();
    for (let i = 0; i < this.childNodes.length; i++) {
      let node = this.childNodes[i];
      if (node instanceof Control) {
        node.parent = this;
      }
      ;
    }
    ;
    for (let i = 0; i < this.controls.length; i++)
      this.controls[i].refresh();
  }
};

// packages/base/src/index.ts
var scripts = document.getElementsByTagName("script");
var pathname = scripts[scripts.length - 1].src;
var lastIndex = pathname.lastIndexOf("/");
var LibPath = pathname.slice(0, lastIndex + 1);
var RequireJS = {
  config(config) {
    window.require.config(config);
  },
  require(reqs, callback) {
    window.require(reqs, callback);
  },
  defined(module2) {
    return window.require.defined(module2);
  }
};
function customElements2(name, options) {
  return (constructor) => {
    window.customElements.define(name, constructor, options);
  };
}
function customModule(target) {
  _currentDefineModule = target;
}

// packages/application/src/event-bus.ts
var _EventBus = class {
  constructor() {
    this.subscribers = {};
  }
  static getInstance() {
    if (this.instance === void 0) {
      this.instance = new _EventBus();
    }
    return this.instance;
  }
  dispatch(event, arg) {
    const subscriber = this.subscribers[event];
    if (subscriber === void 0) {
      return;
    }
    Object.keys(subscriber).forEach((key2) => subscriber[key2](arg));
  }
  register(sender, event, callback) {
    const id = this.getNextId();
    if (!this.subscribers[event])
      this.subscribers[event] = {};
    this.subscribers[event][id] = callback.bind(sender);
    return {
      unregister: () => {
        delete this.subscribers[event][id];
        if (Object.keys(this.subscribers[event]).length === 0)
          delete this.subscribers[event];
      }
    };
  }
  getNextId() {
    return _EventBus.nextId++;
  }
};
var EventBus = _EventBus;
EventBus.nextId = 0;
EventBus.instance = void 0;

// packages/application/src/styles/index.css.ts
var Theme = theme_exports.ThemeVars;
var applicationStyle = style({
  height: "100%",
  $nest: {
    "body": {
      height: "100%"
    }
  }
});

// packages/application/src/index.ts
var Application = class {
  constructor() {
    this.modules = {};
    this.modulesId = {};
    this.scripts = {};
    this.id = 0;
    this.LibHost = "";
  }
  get EventBus() {
    return EventBus.getInstance();
  }
  static get Instance() {
    return this._instance || (this._instance = new this());
  }
  async verifyScript(modulePath, script) {
    return true;
  }
  async getScript(modulePath) {
    if (this.scripts[modulePath])
      return this.scripts[modulePath];
    try {
      let result = await (await fetch(modulePath)).text();
      if (typeof result == "string") {
        if (await this.verifyScript(modulePath, result)) {
          this.scripts[modulePath] = result;
          return result;
        }
        ;
      }
      ;
    } catch (err) {
    }
    ;
    return "";
  }
  async loadScript(modulePath, script) {
    try {
      if (this.scripts[modulePath])
        return true;
      if (await this.verifyScript(modulePath, script)) {
        this.scripts[modulePath] = script;
        return true;
      }
      ;
    } catch (err) {
    }
    ;
    return false;
  }
  async getContent(modulePath) {
    try {
      return await (await fetch(modulePath)).text();
    } catch (err) {
    }
    return "";
  }
  async getModule(modulePath, options) {
    if (this.modules[modulePath])
      return this.modules[modulePath];
    let result = await this.newModule(modulePath, options);
    if (result)
      this.modules[modulePath] = result;
    return result;
  }
  async loadPackage(packageName, modulePath, options) {
    if (RequireJS.defined(packageName))
      return true;
    if (modulePath.startsWith("{LIB}/")) {
      if (LibPath.endsWith("/"))
        modulePath = modulePath.replace("{LIB}/", LibPath);
      else
        modulePath = modulePath.replace("{LIB}/", LibPath + "/");
    }
    ;
    let script = await this.getScript(modulePath);
    if (script) {
      _currentDefineModule = null;
      this.currentModulePath = modulePath;
      if (modulePath.indexOf("://") > 0)
        this.currentModuleDir = modulePath.split("/").slice(0, -1).join("/");
      else
        this.currentModuleDir = application.LibHost + modulePath.split("/").slice(0, -1).join("/");
      await import(`data:text/javascript,${encodeURIComponent(script)}`);
      this.currentModulePath = "";
      this.currentModuleDir = "";
      return true;
    }
    ;
    return false;
  }
  async loadModule(modulePath, options) {
    let module2 = await this.newModule(modulePath, options);
    if (module2)
      document.body.append(module2);
    return module2;
  }
  async newModule(modulePath, options) {
    let elmId = this.modulesId[modulePath];
    if (elmId && modulePath)
      return document.createElement(elmId);
    if (options && options.dependencies) {
      for (let p in options.dependencies) {
        await this.loadPackage(p, options.dependencies[p]);
      }
    }
    ;
    let script;
    if (options && options.script)
      script = options.script;
    else
      script = await this.getScript(modulePath);
    if (script) {
      _currentDefineModule = null;
      this.currentModulePath = modulePath;
      if (modulePath.indexOf("://") > 0)
        this.currentModuleDir = modulePath.split("/").slice(0, -1).join("/");
      else
        this.currentModuleDir = application.LibHost + modulePath.split("/").slice(0, -1).join("/");
      await import(`data:text/javascript,${encodeURIComponent(script)}`);
      document.getElementsByTagName("html")[0].classList.add(applicationStyle);
      this.currentModulePath = "";
      this.currentModuleDir = "";
      if (_currentDefineModule) {
        let module2 = _currentDefineModule.default || _currentDefineModule;
        if (module2) {
          this.id++;
          elmId = `i-module--${this.id}`;
          this.modulesId[modulePath] = elmId;
          let Module2 = class extends module2 {
          };
          customElements.define(elmId, Module2);
          let result = new Module2(null, options);
          return result;
        }
        ;
      }
    }
    return null;
  }
};
window["application"] = Application.Instance;
var application = Application.Instance;

// packages/icon/src/style/icon.css.ts
var Theme2 = theme_exports.ThemeVars;
cssRule("i-icon", {
  $nest: {
    "svg": {
      verticalAlign: "top",
      width: "100%",
      height: "100%"
    }
  }
});

// packages/icon/src/icon.ts
var _iconLoaded = false;
async function loadIconFile() {
  if (_iconLoaded)
    return;
  _iconLoaded = true;
  try {
    let res = await fetch(`${LibPath}assets/icon/solid.svg`);
    let text = await res.text();
    let span = document.createElement("span");
    span.innerHTML = text;
    document.body.appendChild(span);
  } catch (err) {
    _iconLoaded = false;
  }
  ;
}
var Icon = class extends Control {
  constructor(parent, options) {
    super(parent, options);
    loadIconFile();
  }
  init() {
    if (!this.initialized) {
      super.init();
      let fill = this.getAttribute("fill");
      if (fill)
        this.fill = fill;
      this._size = this.getAttribute("size", true);
      this._name = this.getAttribute("name", true);
      this._updateIcon();
    }
  }
  get fill() {
    return this.style.getPropertyValue("fill");
  }
  set fill(color) {
    this.style.setProperty("fill", color);
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._updateIcon();
  }
  _updateIcon() {
    if (this._name)
      this.innerHTML = `<svg><use xlink:href="#${this.name}"></use></svg>`;
    else
      this.innerHTML = "";
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Icon = __decorateClass([
  customElements2("i-icon")
], Icon);

// packages/button/src/style/button.css.ts
var Theme3 = theme_exports.ThemeVars;
var spinnerAnim = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
cssRule("i-button", {
  background: Theme3.colors.primary.main,
  boxShadow: Theme3.shadows[2],
  color: Theme3.text.primary,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  fontFamily: Theme3.typography.fontFamily,
  fontSize: Theme3.typography.fontSize,
  $nest: {
    "&:not(.disabled):hover": {
      cursor: "pointer",
      backgroundColor: Theme3.colors.primary.dark,
      boxShadow: Theme3.shadows[4],
      background: Theme3.colors.primary.main
    },
    "&.disabled": {
      color: Theme3.text.disabled,
      boxShadow: Theme3.shadows[0],
      background: Theme3.action.disabledBackground
    },
    "i-icon": {
      display: "inline-block",
      fill: Theme3.text.primary,
      verticalAlign: "middle",
      $nest: {
        "&.loading-icon": {
          animation: `${spinnerAnim} 2s linear infinite`
        }
      }
    },
    ".caption": {
      paddingRight: ".5rem"
    }
  }
});

// packages/button/src/button.ts
var Button = class extends Control {
  static async create(options, parent) {
    let self = new this(parent, options);
    if (!self.initialized)
      await self.init();
    return self;
  }
  constructor(parent, options) {
    super(parent, options, {
      loading: false
    });
  }
  get caption() {
    return this.captionElm.innerHTML;
  }
  set caption(value) {
    this.captionElm.innerHTML = value;
  }
  get icon() {
    if (!this.iconElm)
      return "";
    return this.iconElm.name;
  }
  set icon(name) {
    if (!name) {
      if (this.iconElm) {
        this.iconElm.name = name;
        this.iconElm.style.width = "0px";
        this.iconElm.style.height = "0px";
      }
      return;
    }
    if (!this.iconElm) {
      this.iconElm = new Icon();
      this.iconElm.init();
      this.iconElm.style.width = +this.offsetHeight / 2 + "px";
      this.iconElm.style.height = +this.offsetHeight / 2 + "px";
      this.appendChild(this.iconElm);
      if (this.captionElm && this.iconPosition === "left")
        this.insertBefore(this.iconElm, this.captionElm);
    }
    this.iconElm.name = name;
  }
  get loading() {
    return this._loading;
  }
  set loading(value) {
    this._loading = value;
    const previousEnabled = this._previousEnabled;
    this._previousEnabled = this.enabled;
    if (value) {
      this.icon = "spinner";
      this.iconElm && this.iconElm.classList.add("loading-icon");
      this.enabled = false;
    } else {
      this.icon = this._icon;
      this.iconElm && this.iconElm.classList.remove("loading-icon");
      this.enabled = previousEnabled;
    }
  }
  init() {
    if (!this.captionElm) {
      super.init();
      this._previousEnabled = this.enabled;
      this.captionElm = this.createElement("span", this);
      let caption = this.getAttribute("caption", true) || "";
      this.captionElm.innerHTML = caption;
      this.iconPosition = this.getAttribute("iconPosition", true) || "left";
      this._icon = this.getAttribute("icon", true);
      this.icon = this._icon;
      this.loading = this.getAttribute("loading", true);
    }
  }
};
Button = __decorateClass([
  customElements2("i-button")
], Button);

// packages/dropdown-button/src/style/dropdown-button.css.ts
var Theme4 = theme_exports.ThemeVars;
var spinnerAnim2 = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
cssRule("i-dropdown-button", {
  fontFamily: Theme4.typography.fontFamily,
  position: "relative",
  $nest: {
    "> *": {
      boxSizing: "border-box"
    },
    ".caption": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      minWidth: 0,
      margin: 0,
      gap: "16px",
      position: "relative"
    },
    ".button": {
      display: "flex",
      minWidth: 0,
      margin: 0,
      cursor: "pointer"
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "50px",
      lineHeight: "50px",
      width: "fit-content",
      minWidth: "128px",
      padding: "1rem 1.5rem",
      color: "white",
      backgroundColor: "#00c6f4",
      borderRadius: "25px 0px 0px 25px",
      border: 0,
      borderRight: "1px solid white",
      fontSize: "14px",
      pointerEvents: "all",
      opacity: 1,
      boxShadow: "none",
      transition: "all 0.3s ease 0s",
      cursor: "pointer"
    },
    ".icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 0,
      minWidth: 0,
      width: "50px",
      height: "50px",
      transition: "all 0.3s ease 0s",
      backgroundColor: "#00c6f4",
      borderRadius: "0px 25px 25px 0px",
      borderLeft: "none",
      $nest: {
        "i-icon": {
          height: "16px"
        }
      }
    },
    ".dropdown": {
      display: "none",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      right: 0,
      zIndex: 10,
      appearance: "none",
      padding: "1.5rem 1rem",
      borderRadius: "4px",
      width: "176px",
      listStyleType: "none",
      marginTop: "16px",
      backgroundColor: "#00c6f4",
      border: "1px solid rgba(255, 255, 255, 0.08)"
    },
    ".dropdown.show": {
      display: "flex"
    },
    "i-dropdown-item": {
      fontSize: "14px",
      lineHeight: "20px",
      margin: 0,
      cursor: "pointer",
      padding: "0.5rem 1rem",
      transition: "all 0.3s ease 0s",
      opacity: 0.88,
      color: "white",
      letterSpacing: 0,
      borderRadius: "4px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    ".loading-icon": {
      animation: `${spinnerAnim2} 2s linear infinite`,
      marginRight: "0.25rem",
      fill: "#fff",
      height: "16px",
      width: "16px"
    }
  }
});
cssRule(".i-popper", {
  fontFamily: Theme4.typography.fontFamily,
  display: "none",
  flexDirection: "column",
  position: "absolute",
  top: "100%",
  zIndex: 10,
  appearance: "none",
  padding: "1.5rem 1rem",
  borderRadius: "4px",
  width: "176px",
  listStyleType: "none",
  marginTop: "16px",
  background: "#00c6f4",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  $nest: {
    "&.show": {
      display: "flex"
    },
    "i-dropdown-item": {
      fontSize: "14px",
      lineHeight: "20px",
      margin: 0,
      cursor: "pointer",
      padding: "0.5rem 1rem",
      transition: "all 0.3s ease 0s",
      opacity: 0.88,
      color: "white",
      letterSpacing: 0,
      borderRadius: "4px"
    }
  }
});

// packages/dropdown-button/src/dropdown-button.ts
var DropdownItem = class extends Control {
  get loading() {
    return this._loading;
  }
  set loading(value) {
    this._loading = value;
    const prevEnabled = this._prevEnabled;
    this._prevEnabled = this.enabled;
    const elm = this.querySelector(".loading-icon");
    if (value) {
      if (this.loadingElm && !elm)
        this.insertBefore(this.loadingElm, this.captionElm);
      this.enabled = false;
    } else {
      if (elm)
        this.removeChild(elm);
      ;
      this.enabled = prevEnabled;
    }
  }
  constructor(parent, options) {
    super(parent, options);
  }
  async init() {
    if (!this.captionElm) {
      const caption = this.getAttribute("caption", true) || "";
      this.captionElm = this.createElement("li", this);
      this.captionElm.innerHTML = caption;
      this._prevEnabled = this.enabled;
      this.loadingElm = await Icon.create({ name: "spinner" });
      this.loadingElm.classList.add("loading-icon");
      this.insertBefore(this.loadingElm, this.captionElm);
      this.loading = this.getAttribute("loading", true);
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
DropdownItem = __decorateClass([
  customElements2("i-dropdown-item")
], DropdownItem);
var DropdownButton = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      body: false,
      placement: "bottomLeft"
    });
    this.isDropdownShown = false;
  }
  get caption() {
    const buttonElm = this.buttonElm.querySelector("button");
    return (buttonElm == null ? void 0 : buttonElm.innerHTML) || "";
  }
  set caption(value) {
    const buttonElm = this.buttonElm.querySelector("button");
    buttonElm && (buttonElm.innerHTML = value || "");
  }
  get body() {
    return this._body;
  }
  set body(value) {
    this._body = value;
  }
  get placement() {
    return this._placement;
  }
  set placement(value) {
    this._placement = value;
  }
  appendItems(value) {
    if (Array.isArray(value))
      this.dropdownElm.append(...value);
    else
      this.dropdownElm.append(value);
  }
  openList() {
    this.isDropdownShown = true;
    this.dropdownElm.classList.add("show");
  }
  handleClose() {
    this.isDropdownShown = false;
    this.dropdownElm.classList.remove("show");
  }
  toggleList() {
    this.isDropdownShown ? this.handleClose() : this.openList();
  }
  positionAt(placement, event) {
    const parent = this.buttonElm;
    const parentCoords = parent.getBoundingClientRect();
    let left = 0;
    let top = 0;
    const pageY = event.pageY - event.offsetY + 10;
    switch (placement) {
      case "top":
        top = pageY - this.dropdownElm.offsetHeight - parentCoords.height;
        left = parentCoords.left + (parent.offsetWidth - this.dropdownElm.offsetWidth) / 2;
        break;
      case "topLeft":
        top = pageY - this.dropdownElm.offsetHeight - parentCoords.height;
        left = parentCoords.left;
        break;
      case "topRight":
        top = pageY - this.dropdownElm.offsetHeight - parentCoords.height;
        left = parentCoords.left + parent.offsetWidth - this.dropdownElm.offsetWidth;
        break;
      case "bottom":
        top = pageY + parentCoords.height;
        left = parentCoords.left + (parent.offsetWidth - this.dropdownElm.offsetWidth) / 2;
        break;
      case "bottomLeft":
        top = pageY + parentCoords.height;
        left = parentCoords.left;
        break;
      case "bottomRight":
        top = pageY + parentCoords.height / 2;
        left = parentCoords.left + parent.offsetWidth - this.dropdownElm.offsetWidth;
        break;
    }
    left = left < 0 ? parentCoords.left : left;
    top = top < 0 ? parentCoords.top : top;
    this.dropdownElm.style.left = left + "px";
    this.dropdownElm.style.top = top + "px";
  }
  init() {
    if (!this.captionElm) {
      const caption = this.getAttribute("caption", true) || "";
      this.captionElm = this.createElement("div", this);
      this.captionElm.classList.add("caption");
      this.buttonElm = this.createElement("div");
      this.buttonElm.classList.add("button");
      this.captionElm.appendChild(this.buttonElm);
      const button = this.createElement("button");
      this.buttonElm.appendChild(button);
      this.caption = caption;
      this.iconElm = this.createElement("div", this);
      this.iconElm.classList.add("icon");
      const iconAttr = this.getAttribute("icon", true, "arrow-down");
      const icon = new Icon(this, { name: iconAttr, fill: "white" });
      this.iconElm.appendChild(icon);
      this.addEventListener("click", (event) => {
        if (!this._enabled)
          return false;
        this.toggleList();
        if (this.body) {
          this.dropdownElm.style.position = "absolute";
          this.dropdownElm.style.zIndex = "999";
          this.positionAt(this.placement, event);
        }
      });
      this.buttonElm.appendChild(this.iconElm);
      this.dropdownElm = this.createElement("ul");
      this.dropdownElm.classList.add("dropdown");
      this.captionElm.appendChild(this.dropdownElm);
      const popperClass = this.getAttribute("popperClass", true) || "";
      if (popperClass) {
        const classArr = popperClass.split(" ");
        this.dropdownElm.classList.add(classArr.join(","));
      }
      if (this.hasChildNodes()) {
        const dropdownItems = Array.from(this.querySelectorAll("i-dropdown-button > i-dropdown-item"));
        for (const dropdownItem of dropdownItems) {
          dropdownItem.addEventListener("click", (e) => {
            e.stopPropagation();
            this.handleClose();
          });
          this.dropdownElm.appendChild(dropdownItem);
        }
      }
      this.placement = this.getAttribute("placement", true);
      this.body = this.getAttribute("body", true) || false;
      if (this.body) {
        this.dropdownElm.classList.add("i-popper");
        document.body.appendChild(this.dropdownElm);
      } else {
        this.appendChild(this.dropdownElm);
      }
      document.addEventListener("click", (e) => {
        if (!this._enabled)
          return false;
        if (!this.contains(e.target)) {
          this.handleClose();
        }
      });
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
DropdownButton = __decorateClass([
  customElements2("i-dropdown-button")
], DropdownButton);

// packages/code-editor/src/monaco.ts
async function initMonaco() {
  if (window.monaco)
    return window.monaco;
  return new Promise((resolve) => {
    window.MonacoEnvironment = {};
    RequireJS.config({ paths: { "vs": `${LibPath}lib/monaco-editor/0.32.1/min/vs` } });
    RequireJS.require([`vs/editor/editor.main`], (monaco) => {
      resolve(monaco);
      if (monaco.$loaded)
        return;
      monaco.$loaded = true;
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        experimentalDecorators: true,
        allowSyntheticDefaultImports: true,
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
        target: monaco.languages.typescript.ScriptTarget.ES2020
      });
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      monaco.languages.registerCompletionItemProvider("typescript", {
        triggerCharacters: [">"],
        provideCompletionItems: (model, position) => {
          const code = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });
          const tag = code.slice(code.lastIndexOf("<") + 1, code.length);
          if (!tag || !tag.endsWith(">") || tag.startsWith("/") || tag.indexOf(" ") > 0)
            return;
          const word = model.getWordUntilPosition(position);
          return {
            suggestions: [
              {
                label: `</${tag}`,
                kind: monaco.languages.CompletionItemKind.EnumMember,
                insertText: `$1</${tag}`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn,
                  endColumn: word.endColumn
                }
              }
            ]
          };
        }
      });
    });
  });
}

// packages/code-editor/src/style/code-editor.css.ts
cssRule("i-code-editor", {
  $nest: {
    "*": {
      boxSizing: "border-box"
    },
    ".full-height": {
      height: "100vh"
    },
    ".half-width": {
      width: "50%"
    },
    ".column": {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch"
    },
    ".row": {
      display: "flex",
      flexDirection: "row"
    },
    ".align-right": {
      marginLeft: "auto",
      alignSelf: "stretch"
    },
    "#flex-wrapper": {
      display: "flex",
      alignItems: "stretch"
    },
    "#operation-editor": {
      height: "60vh",
      minHeight: "260px"
    },
    "#variables-editor": {
      height: "30vh",
      alignItems: "stretch"
    },
    "#results-editor": {
      height: "90vh",
      alignItems: "stretch"
    },
    "#toolbar": {
      minHeight: "40px",
      backgroundColor: "#1e1e1e",
      display: "inline-flex",
      alignItems: "stretch"
    },
    "#toolbar > button, #toolbar > select, #toolbar > span, button#execute-op": {
      margin: "4px",
      padding: "4px"
    },
    "#toolbar button, #toolbar select": {
      backgroundColor: "#1e1e1e",
      color: "#eee",
      border: "1px solid #eee",
      borderRadius: "4px"
    },
    "#toolbar button:hover, select:hover, button:focus, select:focus": {
      backgroundColor: "darkslategrey"
    },
    "#execution-tray": {
      display: "inline-flex",
      alignItems: "baseline"
    },
    "#schema-status": {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#eee"
    },
    "#toolbar button.reload-button": {
      border: "0 none",
      padding: "4px",
      width: "30px",
      textAlign: "center"
    }
  }
});

// packages/code-editor/src/code-editor.ts
var CodeEditor = class extends Control {
  init() {
    if (!this.editor) {
      super.init();
      this.language = this.getAttribute("language", true);
      this.style.display = "inline-block";
      if (this.language)
        this.loadContent("", this.language);
    }
    ;
  }
  async addLib(lib, dts) {
    let monaco = await initMonaco();
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dts, lib);
  }
  get editor() {
    return this._editor;
  }
  get language() {
    return this._language;
  }
  set language(value) {
    this._language = value;
    if (!this.editor) {
      this.loadContent();
    } else {
      let monaco = window.monaco;
      let model = this.editor.getModel();
      if (model) {
        if (value == "tsx")
          value = "typescript";
        monaco.editor.setModelLanguage(model, value);
      }
    }
  }
  async loadContent(content, language, fileName) {
    let monaco = await initMonaco();
    if (content == void 0)
      content = content || this._value || "";
    this._value = content;
    language = language || this._language || "typescript";
    this._language = language;
    if (!this._editor) {
      let captionDiv = this.createElement("div", this);
      captionDiv.style.display = "inline-block";
      captionDiv.style.height = "100%";
      captionDiv.style.width = "100%";
      const customOptions = this._options || {};
      let options = __spreadValues({
        theme: "vs-dark",
        tabSize: 2,
        formatOnPaste: true,
        formatOnType: true,
        renderWhitespace: "none",
        automaticLayout: true,
        minimap: {
          enabled: false
        }
      }, customOptions);
      this._editor = monaco.editor.create(captionDiv, options);
      if (language == "tsx" || (fileName == null ? void 0 : fileName.endsWith(".tsx"))) {
        this._language = "tsx";
        this._editor.setModel(monaco.editor.createModel(content || this._value || "", "typescript", monaco.Uri.file(fileName || "index.tsx")));
      } else
        this._editor.setModel(monaco.editor.createModel(content || this._value || "", language || this._language || "typescript"));
      this._editor.onDidChangeModelContent((event) => {
        if (typeof this.onChange === "function")
          this.onChange(event);
      });
    } else {
      if (language == "tsx")
        language = "typescript";
      let model = this.editor.getModel();
      if (model)
        monaco.editor.setModelLanguage(model, language);
      this.editor.setValue(content);
      this.editor.setScrollTop(0);
    }
    ;
  }
  updateOptions(options) {
    this._options = options;
    if (this.editor)
      this.editor.updateOptions(options);
    else
      this.loadContent();
  }
  get value() {
    if (this.editor)
      return this.editor.getValue();
    else
      return this._value;
  }
  set value(value) {
    this._value = value;
    if (this.editor) {
      this.editor.setValue(value);
      this.editor.setScrollTop(0);
    } else
      this.loadContent();
  }
};
CodeEditor = __decorateClass([
  customElements2("i-code-editor")
], CodeEditor);

// packages/code-editor/src/diff-editor.ts
var EditorType;
(function(EditorType2) {
  EditorType2[EditorType2["modified"] = 0] = "modified";
  EditorType2[EditorType2["original"] = 1] = "original";
})(EditorType || (EditorType = {}));
var CodeDiffEditor = class extends Control {
  init() {
    if (!this.editor) {
      super.init();
      this.language = this.getAttribute("language", true);
      this.style.display = "inline-block";
    }
    ;
  }
  async addLib(lib, dts) {
    let monaco = await initMonaco();
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dts, lib);
  }
  get editor() {
    return this._editor;
  }
  get language() {
    return this._language;
  }
  set language(value) {
    this._language = value;
    if (!this.editor) {
      if (this.language) {
        this.loadContent(1, "", this.language);
        this.loadContent(0, "", this.language);
      }
    } else {
      this.setModelLanguage(value, "getOriginalEditor");
      this.setModelLanguage(value, "getModifiedEditor");
    }
  }
  setModelLanguage(value, functionName) {
    let monaco = window.monaco;
    let model = this.editor[functionName]().getModel();
    if (model) {
      if (value == "tsx")
        value = "typescript";
      monaco.editor.setModelLanguage(model, value);
    }
  }
  getEditor(type) {
    if (type === 1)
      return this.editor.getOriginalEditor();
    else
      return this.editor.getModifiedEditor();
  }
  getModel(type) {
    return this.getEditor(type).getModel();
  }
  async loadContent(type, content, language, fileName) {
    let monaco = await initMonaco();
    const value = type === 0 ? this._modifiedValue : this._originalValue;
    if (content == void 0)
      content = content || value || "";
    type === 0 ? this._modifiedValue = content : this._originalValue = content;
    language = language || this._language || "typescript";
    this._language = language;
    if (!this._editor) {
      let captionDiv = this.createElement("div", this);
      captionDiv.style.display = "inline-block";
      captionDiv.style.height = "100%";
      captionDiv.style.width = "100%";
      let options = {
        originalEditable: false,
        readOnly: true,
        automaticLayout: true
      };
      this._editor = monaco.editor.createDiffEditor(captionDiv, options);
    }
    if (!this._modifiedModel || !this._originalModel) {
      let model;
      if (language == "tsx" || (fileName == null ? void 0 : fileName.endsWith(".tsx"))) {
        this._language = "tsx";
        model = monaco.editor.createModel(content || value || "", "typescript", monaco.Uri.file(fileName || "index.tsx"));
      } else
        model = monaco.editor.createModel(content || value || "", language || this._language || "typescript");
      type === 0 ? this._modifiedModel = model : this._originalModel = model;
      if (this._originalModel && this._modifiedModel) {
        this._editor.setModel({
          original: this._originalModel,
          modified: this._modifiedModel
        });
      }
    } else {
      if (language == "tsx")
        language = "typescript";
      let model = this.getModel(type);
      if (model)
        monaco.editor.setModelLanguage(model, language);
      this.getEditor(type).setValue(content);
    }
  }
  updateOptions(options) {
    this.editor.updateOptions(options);
  }
  get originalValue() {
    if (this.editor)
      return this.editor.getOriginalEditor().getValue();
    else
      return this._originalValue;
  }
  set originalValue(value) {
    this._originalValue = value;
    if (this.editor) {
      this.editor.getOriginalEditor().setValue(value);
    } else
      this.loadContent(1);
  }
  get modifiedValue() {
    if (this.editor)
      return this.editor.getModifiedEditor().getValue();
    else
      return this._modifiedValue;
  }
  set modifiedValue(value) {
    this._modifiedValue = value;
    if (this.editor) {
      this.editor.getModifiedEditor().setValue(value);
    } else {
      this.loadContent(0);
    }
  }
};
CodeDiffEditor = __decorateClass([
  customElements2("i-code-diff-editor")
], CodeDiffEditor);

// packages/combo-box/src/style/combo-box.css.ts
var Theme5 = theme_exports.ThemeVars;
var ItemListStyle = style({
  display: "none",
  position: "absolute",
  margin: "0.05rem 0 0",
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,.15)",
  borderRadius: "0.25rem",
  zIndex: "99999",
  $nest: {
    "> ul": {
      maxHeight: "100px",
      overflowY: "scroll",
      overflowX: "hidden",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    "> ul > li": {
      display: "block",
      width: "100%",
      padding: "0.25rem 0.5rem",
      backgroundColor: "transparent",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      cursor: "pointer"
    },
    "> ul > li .highlight": {
      backgroundColor: Theme5.colors.warning.light
    },
    "> ul > li.matched": {
      backgroundColor: Theme5.colors.primary.light
    },
    "> ul > li:hover": {
      backgroundColor: Theme5.colors.primary.light
    }
  }
});
cssRule("i-combo-box", {
  position: "relative",
  display: "inline-flex!important",
  fontFamily: Theme5.typography.fontFamily,
  fontSize: Theme5.typography.fontSize,
  $nest: {
    "*": {
      boxSizing: "border-box"
    },
    "> i-input input": {
      width: "100%!important",
      padding: "1px 0.5rem"
    },
    "> .icon-btn": {
      display: "inline-block",
      verticalAlign: "middle",
      backgroundColor: "#6c757d",
      padding: "8px",
      marginLeft: "-1px",
      borderRadius: "0 3px 3px 0",
      cursor: "pointer"
    },
    "> .icon-btn:hover": {
      backgroundColor: "#545b62"
    },
    "> .icon-btn i-icon": {
      display: "inline-block",
      width: "12px",
      height: "12px"
    }
  }
});

// packages/combo-box/src/combo-box.ts
var ComboBox = class extends Control {
  constructor(parent, options) {
    super(parent, options);
    this.isListShown = false;
    this._selected = [];
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (this.isValueValid(value)) {
      if (value == null)
        value = "";
      this._value = value;
      this.inputElm.value = typeof value === "object" ? value.label : value || "";
      if (this.callback) {
        this.callback(value);
      }
    }
  }
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = value;
    if (this.multi) {
      this.inputElm.value = this.selected.map((selectedItem) => {
        const itemLabel = typeof selectedItem === "object" ? selectedItem.label : selectedItem;
        return itemLabel;
      }).toString();
    } else {
      this.inputElm.value = typeof this.value === "object" ? this.value.label : this.value || "";
    }
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    this._caption = value;
    this.labelElm.textContent = this._caption || "";
    if (!value)
      this.labelElm.style.display = "none";
    else
      this.labelElm.style.display = "";
  }
  get captionWidth() {
    return this._captionWidth;
  }
  set captionWidth(value) {
    this._captionWidth = value;
    this.labelElm.style.width = value + "px";
  }
  get items() {
    return this._items;
  }
  set items(items) {
    this._items = items;
  }
  get icon() {
    return this._icon;
  }
  set icon(icon) {
    this._icon = icon;
  }
  get searchStr() {
    return this._searchStr;
  }
  set searchStr(str) {
    if (str == null)
      str = "";
    this._searchStr = str;
  }
  set enabled(value) {
    this.inputElm.disabled = !value;
  }
  get multi() {
    return this.isMulti;
  }
  set multi(value) {
    this.isMulti = value;
    this.selected = [];
    this.inputElm.readOnly = value;
  }
  isValueValid(value) {
    const _value = typeof value === "object" ? value.value : value;
    if (!_value)
      return true;
    const index = this.getItemIndex(this.items, value);
    return index >= 0;
  }
  getItemIndex(items, item) {
    const value = typeof item === "object" ? item.value.toString() : item;
    const index = items.findIndex((_item) => {
      if (typeof _item === "string")
        return _item.toLowerCase() === value.toLowerCase();
      else
        return _item.value.toString().toLowerCase() === value.toLowerCase();
    });
    return index;
  }
  openList() {
    this.isListShown = true;
    window.document.body.append(this.listElm);
    this.listElm.classList.add("show");
    this.listElm.style.display = "block";
    this.calculatePositon();
    if (!this.searchStr)
      this.renderItems();
  }
  calculatePositon() {
    let parentElement = document.querySelector(this.linkTo) || this;
    let rect = parentElement.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
    const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset;
    const top = rect.top + scrollTop + rect.height;
    const left = rect.left + scrollLeft;
    const width = rect.right - rect.left;
    this.listElm.style.top = top + "px";
    this.listElm.style.left = left + "px";
    this.listElm.style.width = width + "px";
  }
  closeList() {
    this.isListShown = false;
    this.listElm.remove();
    this.listElm.style.display = "none";
    this.listElm.classList.remove("show");
    this.searchStr = "";
    if (this.multi || Array.isArray(this.value))
      return;
    const label = typeof this.value === "object" ? this.value.label : this.value;
    this.inputElm.value = label;
  }
  toggleList() {
    this.isListShown ? this.closeList() : this.openList();
  }
  escapeRegExp(text) {
    return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : text;
  }
  renderItems() {
    const regExp = new RegExp(this.escapeRegExp(this.searchStr), "g");
    this.listElm.innerHTML = "";
    if (this.searchStr) {
      this.openList();
    }
    const ulElm = this.createElement("ul", this.listElm);
    for (let item of this.items) {
      const label = typeof item === "object" ? item.label : item;
      if (!this.searchStr || label.toLowerCase().includes(this.searchStr.toLowerCase())) {
        const liElm = this.createElement("li", ulElm);
        liElm.addEventListener("click", () => this.onItemClick(liElm, item));
        if (this.multi) {
          const index = this.getItemIndex(this.selected, item);
          if (index >= 0) {
            liElm.classList.add("matched");
          }
        } else if (item === this.value) {
          liElm.classList.add("matched");
        }
        const displayItem = this.searchStr ? label.replace(regExp, `<span class="highlight">${this.searchStr}</span>`) : label;
        liElm.innerHTML = displayItem;
      }
    }
    if (!ulElm.innerHTML) {
      this.listElm.classList.remove("show");
    }
  }
  onItemClick(liElm, item) {
    const label = typeof item === "object" ? item.label : item;
    if (this.multi) {
      const index = this.getItemIndex(this.selected, item);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item);
      }
      this.inputElm.value = this.selected.map((selectedItem) => {
        const itemLabel = typeof selectedItem === "object" ? selectedItem.label : selectedItem;
        return itemLabel;
      }).toString();
      liElm.classList.toggle("matched");
    } else {
      this.value = item;
      this.inputElm.value = label;
      this.closeList();
    }
    if (this.onSelect) {
      this.onSelect(this.value);
    }
  }
  init() {
    if (!this.inputElm) {
      this.callback = this.getAttribute("parentCallback", true);
      this.onSelect = this.getAttribute("onSelect", true) || this.onSelect;
      const width = this.getAttribute("width", true);
      const height = this.getAttribute("height", true);
      const value = this.attrs.value || this.getAttribute("value", true);
      this.items = this.attrs.items || this.getAttribute("items", true) || [];
      this.icon = this.getAttribute("icon", true);
      this.captionSpanElm = this.createElement("span", this);
      this.labelElm = this.createElement("label", this.captionSpanElm);
      this.inputElm = this.createElement("input", this);
      this.inputElm.width = width - height;
      this.inputElm.height = height;
      this.value = value;
      this.multi = this.getAttribute("multi", true);
      this.inputElm.addEventListener("click", (e) => {
        this.openList();
        if (this.onClick)
          this.onClick(this, e);
      });
      this.inputElm.addEventListener("keyup", () => {
        if (this.multi || Array.isArray(this.value))
          return;
        let label = typeof this.value === "string" ? this.value : this.value.label;
        if (this.inputElm.value.toLowerCase() !== label.toLowerCase()) {
          this.searchStr = this.inputElm.value;
          this.renderItems();
          if (!this.inputElm.value) {
            this.value = "";
          } else {
            const index = this.getItemIndex(this.items, this.inputElm.value);
            if (index >= 0)
              this.value = this.items[index];
          }
        }
      });
      this.appendChild(this.inputElm);
      const iconName = this.getAttribute("icon", true);
      this.iconElm = this.createElement("span", this);
      this.iconElm.classList.add("icon-btn");
      this.iconElm.style.width = this.options.height + "px";
      this.iconElm.style.height = this.options.height + "px";
      const icon = new Icon(this, { name: this.icon, fill: "white" });
      this.iconElm.appendChild(icon);
      this.iconElm.addEventListener("click", () => {
        if (!this._enabled)
          return false;
        this.toggleList();
      });
      this.listElm = this.createElement("div");
      this.listElm.classList.add(ItemListStyle);
      this.listElm.classList.add("item-list");
      this.renderItems();
      document.addEventListener("click", (e) => {
        if (!this._enabled)
          return false;
        if (!this.contains(e.target)) {
          this.closeList();
        }
      });
      this.enabled = this.getAttribute("enabled") !== false;
      super.init();
      window.addEventListener("resize", this.calculatePositon.bind(this));
    }
  }
  disconnectCallback() {
    window.removeEventListener("resize", this.calculatePositon.bind(this));
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], ComboBox.prototype, "_value", 2);
ComboBox = __decorateClass([
  customElements2("i-combo-box")
], ComboBox);

// packages/checkbox/src/style/checkbox.css.ts
var Theme6 = theme_exports.ThemeVars;
cssRule("i-checkbox", {
  fontFamily: Theme6.typography.fontFamily,
  fontSize: Theme6.typography.fontSize,
  userSelect: "none",
  "$nest": {
    ".i-checkbox": {
      display: "inline-flex",
      alignItems: "center",
      position: "relative"
    },
    ".i-checkbox_input": {
      cursor: "pointer",
      whiteSpace: "nowrap",
      display: "inline-flex",
      position: "relative"
    },
    ".checkmark": {
      width: 15,
      height: 15,
      display: "inline-block",
      position: "relative",
      backgroundColor: Theme6.background.paper,
      border: `1px solid ${Theme6.divider}`,
      boxSizing: "border-box",
      transition: "border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)"
    },
    ".i-checkbox_label": {
      boxSizing: "border-box",
      color: Theme6.text.primary,
      display: "inline-block",
      paddingLeft: 8,
      lineHeight: 1
    },
    "input": {
      opacity: 0,
      width: 0,
      height: 0,
      position: "absolute",
      top: 0,
      left: 0
    },
    "&.is-checked": {
      "$nest": {
        ".i-checkbox_label": {
          color: Theme6.colors.info.main
        },
        ".checkmark": {
          backgroundColor: Theme6.colors.info.main
        },
        ".checkmark:after": {
          transform: "rotate(45deg) scaleY(1)"
        },
        ".is-indeterminate .checkmark:after": {
          transform: "none"
        }
      }
    },
    "&:not(.disabled):hover input ~ .checkmark": {
      borderColor: Theme6.colors.info.main
    },
    "&.disabled": {
      cursor: "not-allowed"
    },
    ".checkmark:after": {
      content: "''",
      boxSizing: "content-box",
      border: `1px solid ${Theme6.background.paper}`,
      borderLeft: 0,
      borderTop: 0,
      height: 7.5,
      left: 5.5,
      top: 1,
      transform: "rotate(45deg) scaleY(0)",
      width: 3.5,
      transition: "transform .15s ease-in .05s",
      transformOrigin: "center",
      display: "inline-block",
      position: "absolute"
    },
    ".is-indeterminate .checkmark": {
      backgroundColor: Theme6.colors.info.main
    },
    ".is-indeterminate .checkmark:after": {
      width: "80%",
      height: 0,
      top: "50%",
      left: "10%",
      borderRight: 0,
      transform: "none"
    }
  }
});

// packages/checkbox/src/checkbox.ts
var CheckboxGroup = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get selectedValues() {
    return this._selectedValues;
  }
  set selectedValues(value) {
    this._selectedValues = value;
    if (this.hasChildNodes()) {
      const elms = Array.from(this.children);
      elms.forEach((elm) => {
        const inputElm = elm.getElementsByTagName("input")[0];
        this.updateUI(inputElm);
      });
    }
  }
  get parsedValue() {
    try {
      return JSON.parse(this._selectedValues);
    } catch (e) {
      return [];
    }
  }
  _handleChange(source, event) {
    const value = source.target.value;
    const checked = source.target.checked;
    const index = this.parsedValue.indexOf(value);
    if (checked) {
      if (index === -1) {
        const data = this.parsedValue;
        data.push(value);
        this.selectedValues = JSON.stringify(data);
      }
    } else {
      if (index !== -1) {
        const data = this.parsedValue;
        data.splice(index, 1);
        this.selectedValues = JSON.stringify(data);
      }
    }
    if (this.onChange)
      this.onChange(this, this.selectedValues);
  }
  updateUI(inputElm) {
    if (inputElm) {
      const hasVal = this.parsedValue.indexOf(inputElm.value) !== -1;
      if (hasVal && !inputElm.checked || !hasVal && inputElm.checked)
        inputElm.click();
    }
  }
  init() {
    this.classList.add("i-checkbox-group");
    this.setAttribute("role", "group");
    const valAttr = this.getAttribute("selectedValues");
    this.selectedValues = valAttr;
    if (this.hasChildNodes()) {
      const elms = Array.from(this.children);
      elms.forEach((elm) => {
        const inputElm = elm.getElementsByTagName("input")[0];
        if (inputElm) {
          this.updateUI(inputElm);
          inputElm.addEventListener("input", this._handleChange.bind(this));
        }
      });
    }
    super.init();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("selectedValues")
], CheckboxGroup.prototype, "_selectedValues", 2);
CheckboxGroup = __decorateClass([
  customElements2("i-checkbox-group")
], CheckboxGroup);
var Checkbox = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      height: 30
    });
    if (options == null ? void 0 : options.onRender)
      this.onRender = options.onRender;
    if (options == null ? void 0 : options.onChange)
      this.onRender = options.onChange;
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    if (!value)
      this.captionSpanElm.style.display = "none";
    else
      this.captionSpanElm.style.display = "";
    this.captionSpanElm && (this.captionSpanElm.textContent = value);
  }
  get captionWidth() {
    return this._captionWidth;
  }
  set captionWidth(value) {
    if (!value)
      return;
    this._captionWidth = value;
    this.captionSpanElm && (this.captionSpanElm.style.width = value + "px");
  }
  get height() {
    return this.offsetHeight;
  }
  set height(value) {
    if (typeof value == "string")
      value = parseInt(value);
    this._height = value;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.addClass(value, "is-checked");
    if (this.inputElm) {
      this.inputElm.checked = !!value;
    }
  }
  get width() {
    return this.offsetWidth;
  }
  set width(value) {
    this._width = value;
    this.style.width = value + "px";
    this._captionWidth = this._width - 20;
  }
  get indeterminate() {
    return this._indeterminate;
  }
  set indeterminate(value) {
    this._indeterminate = value;
    if (this.inputSpanElm)
      value ? this.inputSpanElm.classList.add("is-indeterminate") : this.inputSpanElm.classList.remove("is-indeterminate");
  }
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    if (this.inputElm)
      this.inputElm.checked = value;
  }
  _handleChange(source, event) {
    this.checked = this.inputElm.checked || false;
    this.addClass(this.checked, "is-checked");
    if (this.onChange)
      this.onChange(this, this.checked);
  }
  addClass(value, className) {
    if (value)
      this.classList.add(className);
    else
      this.classList.remove(className);
  }
  init() {
    if (!this.captionSpanElm) {
      this.value = this.getAttribute("value", true);
      this.wrapperElm = this.createElement("label", this);
      if (this.height)
        this.wrapperElm.style.height = this.height + "px";
      this.wrapperElm.classList.add("i-checkbox");
      this.inputSpanElm = this.createElement("span", this.wrapperElm);
      this.inputSpanElm.classList.add("i-checkbox_input");
      this.inputElm = this.createElement("input", this.inputSpanElm);
      this.inputElm.type = "checkbox";
      const disabled = this.getAttribute("enabled") === false;
      this.inputElm.disabled = disabled;
      this.checkmarklElm = this.createElement("span");
      this.checkmarklElm.classList.add("checkmark");
      this.inputSpanElm.appendChild(this.checkmarklElm);
      this.inputElm.addEventListener("input", this._handleChange.bind(this));
      this.captionSpanElm = this.createElement("span", this.wrapperElm);
      this.captionSpanElm.classList.add("i-checkbox_label");
      this.captionWidth = parseInt(this.getAttribute("captionWidth", true));
      this.caption = this.getAttribute("caption", true);
      this.inputElm.value = this.caption;
      this.checked = this.getAttribute("checked", true, false);
      if (typeof this.value === "boolean") {
        this.inputElm.checked = this.value;
      }
      this.addClass(this.inputElm.checked, "is-checked");
      this.indeterminate = this.getAttribute("indeterminate");
      this.inputElm.indeterminate = this.indeterminate;
      if (this.onRender && typeof this.onRender === "function") {
        this.inputSpanElm.style.display = "none";
        this.captionSpanElm.style.opacity = "0";
        this.captionSpanElm.style.width = "0";
        this.onRender(this.wrapperElm);
      }
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], Checkbox.prototype, "_value", 2);
Checkbox = __decorateClass([
  customElements2("i-checkbox")
], Checkbox);

// packages/datepicker/src/style/datepicker.css.ts
var Theme7 = theme_exports.ThemeVars;
cssRule("i-datepicker", {
  display: "inline-block",
  fontFamily: Theme7.typography.fontFamily,
  fontSize: Theme7.typography.fontSize,
  "$nest": {
    "*": {
      boxSizing: "border-box"
    },
    "> span": {
      overflow: "hidden"
    },
    "> span > label": {
      boxSizing: "border-box",
      color: Theme7.text.primary,
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      textAlign: "right",
      paddingRight: 4,
      height: "100%"
    },
    "> input": {
      padding: "1px 0.5rem",
      border: `0.5px solid ${Theme7.divider}`,
      boxSizing: "border-box",
      outline: "none"
    },
    "> input[type=text]:focus": {
      borderColor: Theme7.colors.info.main
    },
    "i-icon": {
      fill: Theme7.colors.primary.contrastText
    },
    ".datepicker-toggle": {
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      backgroundColor: "#6c757d",
      padding: "7px",
      marginLeft: "-1px",
      marginTop: "-1px",
      borderRadius: "0 3px 3px 0",
      cursor: "pointer"
    },
    "> .datepicker-toggle:hover": {
      backgroundColor: "#545b62"
    },
    ".datepicker": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      border: 0,
      padding: 0,
      opacity: 0,
      cursor: "pointer"
    },
    ".datepicker::-webkit-calendar-picker-indicator": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      cursor: "pointer"
    }
  }
});

// packages/datepicker/src/datepicker.ts
var defaultCaptionWidth = 40;
var Datepicker = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      captionWidth: defaultCaptionWidth,
      height: 25,
      width: 100
    });
    this._onDatePickerChange = (event) => {
      const _datepicker = event.target;
      const pickerValue = _datepicker.value;
      RequireJS.require([`${LibPath}lib/moment/2.29.1/moment.js`], (moment) => {
        let _moment = this._type === "time" ? moment(pickerValue, "HH:mm") : moment(pickerValue);
        if (_moment.isValid()) {
          this.inputElm.value = _moment.format(this.dateFormat || this.defaultDateFormat);
        } else {
          this.inputElm.value = "";
          _datepicker.value = "";
        }
        if (this.onSelect) {
          this.onSelect(this.inputElm.value);
        }
      });
      if (this.callback) {
        this.callback(this.inputElm.value);
      }
    };
    this._dateInputMask = (event) => {
      const key2 = event.key;
      const isNumeric = key2 != " " && !isNaN(Number(key2));
      const separator = this._type === "time" ? ":" : "/";
      if (!isNumeric) {
        event.preventDefault();
      }
      var len = this.inputElm.value.length;
      if (len === 2) {
        this.inputElm.value += separator;
      }
      if (this._type !== "time" && len === 5) {
        this.inputElm.value += separator;
      }
      if (this._type === "dateTime") {
        if (len === 10) {
          this.inputElm.value += " ";
        }
        if (len === 13) {
          this.inputElm.value += ":";
        }
      }
    };
    this._onFocus = () => {
      this.inputElm.placeholder = this.defaultDateFormat;
      if (!this.inputElm.value)
        return;
      if (this.dateFormat) {
        RequireJS.require([`${LibPath}lib/moment/2.29.1/moment.js`], (moment) => {
          let _moment = moment(this.inputElm.value, this.dateFormat, true);
          if (_moment.isValid()) {
            this.inputElm.value = _moment.format(this.defaultDateFormat);
          }
        });
      }
    };
    this._isValidDateFormat = () => {
      this.inputElm.placeholder = this._placeholder || "";
      if (!this.inputElm.value) {
        this.datepickerElm.value = "";
        if (this.callback) {
          this.callback("");
        }
        return;
      }
      ;
      RequireJS.require([`${LibPath}lib/moment/2.29.1/moment.js`], (moment) => {
        let _moment = moment(this.inputElm.value, this.defaultDateFormat, true);
        let isValid = _moment.isValid();
        if (isValid) {
          if (this.dateFormat) {
            this.inputElm.value = _moment.format(this.dateFormat);
          }
          this.datepickerElm.value = _moment.format(this.datepickerFormat);
        } else {
          this._value = "";
          this.inputElm.value = "";
          this.datepickerElm.value = "";
        }
        if (this.onSelect) {
          this.onSelect(this.inputElm.value);
        }
      });
      if (this.callback) {
        this.callback(this.inputElm.value);
      }
    };
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    this.labelElm.textContent = this._caption || "";
    if (!value)
      this.labelElm.style.display = "none";
    else
      this.labelElm.style.display = "";
  }
  get captionWidth() {
    return this._captionWidth;
  }
  set captionWidth(value) {
    this._captionWidth = value;
    this.labelElm.style.width = value + "px";
    let inputWidth = Number(this._width) - this._captionWidth - (this._iconWidth || 0);
    this.inputElm.style.width = inputWidth + "px";
  }
  get height() {
    return this.offsetHeight;
  }
  set height(value) {
    if (typeof value == "string")
      value = parseInt(value);
    this._height = value;
    this.inputElm.style.height = value + "px";
  }
  get width() {
    return this.offsetWidth;
  }
  set width(value) {
    this._width = value;
    this.style.width = value + "px";
    let inputWidth = this._width - this._captionWidth - (this._iconWidth || 0);
    this.inputElm.style.width = inputWidth + "px";
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (value == null)
      value = "";
    this._value = value;
    this.inputElm.value = value;
    this._isValidDateFormat();
  }
  get defaultDateFormat() {
    switch (this._type) {
      case "date":
        return "DD/MM/YYYY";
      case "dateTime":
        return "DD/MM/YYYY HH:mm";
      case "time":
        return "HH:mm";
    }
  }
  get dateFormat() {
    return this._dateFormat;
  }
  set dateFormat(format) {
    this._dateFormat = format;
  }
  get datepickerFormat() {
    switch (this._type) {
      case "date":
        return "YYYY-MM-DD";
      case "dateTime":
        return "YYYY-MM-DDTHH:mm";
      case "time":
        return "HH:mm";
    }
  }
  get maxLength() {
    switch (this._type) {
      case "date":
        return 10;
      case "dateTime":
        return 16;
      case "time":
        return 5;
    }
  }
  set enabled(value) {
    this.inputElm.disabled = !value;
    this.datepickerElm.disabled = !value;
  }
  get onSelect() {
    return this._onSelect;
  }
  set onSelect(callback) {
    this._onSelect = callback;
  }
  async init() {
    if (!this.captionSpanElm) {
      this.callback = this.getAttribute("parentCallback", true);
      this._placeholder = this.getAttribute("placeholder", true) || "";
      this.dateFormat = this.getAttribute("dateFormat", true) || "";
      this._type = this.getAttribute("type", true) || "date";
      this._iconWidth = this.getAttribute("height", true);
      this.captionSpanElm = this.createElement("span", this);
      this.labelElm = this.createElement("label", this.captionSpanElm);
      this.inputElm = this.createElement("input", this);
      this.inputElm.setAttribute("type", "text");
      this.inputElm.setAttribute("autocomplete", "disabled");
      this.inputElm.style.height = this.height + "px";
      this.inputElm.placeholder = this._placeholder;
      this.inputElm.maxLength = this.maxLength;
      this.inputElm.addEventListener("keypress", this._dateInputMask);
      this.inputElm.onfocus = this._onFocus;
      this.inputElm.onblur = this._isValidDateFormat;
      this.inputElm.pattern = this.dateFormat || this.defaultDateFormat;
      this.toggleElm = this.createElement("span", this);
      this.toggleElm.classList.add("datepicker-toggle");
      this.toggleElm.style.width = this._iconWidth + "px";
      this.toggleElm.style.height = this._iconWidth + "px";
      this.toggleIconElm = await Icon.create({
        name: this._type === "time" ? "clock" : "calendar"
      });
      this.toggleElm.appendChild(this.toggleIconElm);
      this.datepickerElm = this.createElement("input", this.toggleIconElm);
      const inputType = this._type === "dateTime" ? "datetime-local" : this._type;
      this.datepickerElm.setAttribute("type", inputType);
      this.datepickerElm.classList.add("datepicker");
      this.datepickerElm.addEventListener("change", this._onDatePickerChange);
      this.captionWidth = parseInt(this.getAttribute("captionWidth", true) || defaultCaptionWidth);
      this.caption = this.getAttribute("caption", true);
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], Datepicker.prototype, "_value", 2);
Datepicker = __decorateClass([
  customElements2("i-datepicker")
], Datepicker);

// packages/range/src/style/range.css.ts
var Theme8 = theme_exports.ThemeVars;
cssRule("i-range", {
  position: "relative",
  display: "inline-block",
  fontFamily: Theme8.typography.fontFamily,
  fontSize: Theme8.typography.fontSize,
  "$nest": {
    "*": {
      boxSizing: "border-box"
    },
    "> span": {
      overflow: "hidden"
    },
    "> span > label": {
      boxSizing: "border-box",
      color: Theme8.text.primary,
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      textAlign: "right",
      paddingRight: 4,
      height: "100%"
    },
    ".slider": {
      position: "relative",
      display: "inline-block"
    },
    'input[type="range"]': {
      "-webkit-appearance": "none",
      appearance: "none",
      background: "#d3d3d3",
      backgroundImage: `linear-gradient(${Theme8.colors.info.main}, ${Theme8.colors.info.main})`,
      backgroundSize: "0% 100%",
      backgroundRepeat: "no-repeat !important",
      borderRadius: "0.5rem",
      opacity: 0.7,
      border: 0,
      margin: 0,
      width: "inherit",
      boxSizing: "border-box",
      outline: "none",
      verticalAlign: "middle"
    },
    'input[type="range"]:not(:disabled)': {
      cursor: "pointer"
    },
    'input[type="range"]:hover': {
      opacity: 1
    },
    'input[type="range"]:focus': {
      outline: "none"
    },
    'input[type="range"]::-webkit-slider-runnable-track': {
      "-webkit-appearance": "none",
      boxShadow: "none",
      border: "none",
      background: "transparent",
      borderRadius: "0.5rem",
      height: "0.3rem",
      marginLeft: "-6.5px",
      marginRight: "-6.5px"
    },
    'input[type="range"]::-webkit-slider-thumb': {
      "-webkit-appearance": "none",
      appearance: "none",
      marginTop: "-5px",
      backgroundColor: Theme8.colors.info.main,
      borderRadius: "0.5rem",
      height: "1rem",
      width: "1rem"
    },
    ".range-labels": {
      display: "flex",
      justifyContent: "space-between",
      height: "auto",
      overflow: "hidden",
      listStyle: "none"
    },
    ".range-labels li": {
      padding: "0 0.25rem"
    },
    '&.--step input[type="range"]': {
      opacity: 1,
      $nest: {
        "&::-webkit-slider-runnable-track": {
          zIndex: 2
        },
        "&::-webkit-slider-thumb": {
          zIndex: 2
        }
      }
    },
    ".slider-step": {
      position: "absolute",
      zIndex: 0,
      top: 2,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "transparent"
    },
    ".step-dot": {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      width: "3px",
      height: "10px",
      backgroundColor: "#a7a9ac"
    },
    ".tooltip": {
      visibility: "hidden",
      minWidth: 35,
      maxWidth: 70,
      overflowWrap: "break-word",
      backgroundColor: "rgba(0, 0, 0, 0.78)",
      color: "#fff",
      textAlign: "center",
      borderRadius: "6px",
      padding: "8px",
      position: "absolute",
      zIndex: 1,
      bottom: "150%",
      left: "0%",
      marginLeft: "-20px",
      opacity: 0,
      transition: "opacity 0.3s",
      $nest: {
        "&::after": {
          content: "''",
          position: "absolute",
          top: "100%",
          left: "50%",
          marginLeft: "-5px",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.78) transparent transparent transparent"
        }
      }
    },
    'input[type="range"]:hover + .tooltip': {
      visibility: "visible",
      opacity: 1
    }
  }
});

// packages/range/src/range.ts
var defaultCaptionWidth2 = 40;
var Range = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      captionWidth: defaultCaptionWidth2,
      height: 25,
      width: 100
    });
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    this.labelElm.textContent = this._caption || "";
    if (!value)
      this.labelElm.style.display = "none";
    else
      this.labelElm.style.display = "";
  }
  get captionWidth() {
    return this._captionWidth;
  }
  set captionWidth(value) {
    this._captionWidth = value;
    this.labelElm.style.width = value + "px";
    let inputWidth = Number(this._width) - this._captionWidth;
    this.inputContainerElm.style.width = inputWidth + "px";
    if (this.labels) {
      this.rangeLabelListElm.style.paddingLeft = this.captionWidth + "px";
    }
  }
  get height() {
    return this.offsetHeight;
  }
  set height(value) {
    if (typeof value == "string")
      value = parseInt(value);
    this._height = value;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (value == null)
      value = this.inputElm.min;
    this._value = value;
    this.inputElm.value = value;
    const min = Number(this.inputElm.min);
    const max = Number(this.inputElm.max);
    this.inputElm.style.backgroundSize = (this._value - min) * 100 / (max - min) + "% 100%";
    this.onUpdateTooltip(false);
    if (this.callback) {
      this.callback(value);
    }
  }
  get width() {
    return this.offsetWidth;
  }
  set width(value) {
    this._width = value;
    this.style.width = value + "px";
    let inputWidth = this._width - this._captionWidth;
    this.inputContainerElm.style.width = inputWidth + "px";
    if (this.labels) {
      this.rangeLabelListElm.style.paddingLeft = this.captionWidth + "px";
    }
  }
  get _ratio() {
    var min = this.inputElm.min === "" ? 0 : parseInt(this.inputElm.min);
    var max = this.inputElm.max === "" ? 100 : parseInt(this.inputElm.max);
    return (this.value - min) / (max - min);
  }
  get labels() {
    return this._labels;
  }
  set labels(labels) {
    this._labels = labels;
  }
  set enabled(value) {
    this.inputElm.disabled = !value;
  }
  get tooltipVisible() {
    return this._tooltipVisible;
  }
  set tooltipVisible(value) {
    this._tooltipVisible = value;
    this.tooltipElm.style.display = value ? "block" : "none";
  }
  onSliderChange() {
    this.value = this.inputElm.value;
    const min = Number(this.inputElm.min);
    const max = Number(this.inputElm.max);
    this.inputElm.style.backgroundSize = (this._value - min) * 100 / (max - min) + "% 100%";
    if (this.onChange)
      this.onChange(this, this.value);
    this.onUpdateTooltip(false);
  }
  renderLabels() {
    this.labels.forEach((label) => {
      const labelElm = this.createElement("li", this.rangeLabelListElm);
      labelElm.innerHTML = label;
    });
  }
  onUpdateTooltip(init) {
    let inputValue = this._value;
    let formattedValue = this.tipFormatter ? this.tipFormatter(inputValue) : inputValue;
    const min = Number(this.inputElm.min);
    const max = Number(this.inputElm.max);
    if (init) {
      this.tooltipElm.style.marginLeft = `-${this.tooltipElm.clientWidth / 2}px`;
    }
    this.tooltipElm.innerHTML = formattedValue;
    this.tooltipElm.style.left = (this._value - min) * 100 / (max - min) + "%";
  }
  init() {
    if (!this.captionSpanElm) {
      this.callback = this.getAttribute("parentCallback", true);
      const min = this.getAttribute("min", true) || 0;
      const max = this.getAttribute("max", true) || 100;
      const step = this.getAttribute("step", true) || 0;
      const labels = this.getAttribute("labels", true) || "";
      const stepDots = this.getAttribute("stepDots", true);
      this.tipFormatter = this.getAttribute("tipFormatter", true) || this.tipFormatter;
      this.captionSpanElm = this.createElement("span", this);
      this.labelElm = this.createElement("label", this.captionSpanElm);
      this.inputContainerElm = this.createElement("div", this);
      this.inputContainerElm.classList.add("slider");
      this.inputElm = this.createElement("input", this.inputContainerElm);
      this.inputElm.setAttribute("autocomplete", "disabled");
      this.inputElm.type = "range";
      this.inputElm.min = min;
      this.inputElm.max = max;
      if (step != 0) {
        this.inputElm.step = step;
      }
      this.inputElm.addEventListener("input", this.onSliderChange.bind(this));
      if (this.onMouseUp)
        this.inputElm.addEventListener("mouseup", () => {
          this.onMouseUp(this, this.value);
        });
      this.tooltipElm = this.createElement("span", this.inputContainerElm);
      this.tooltipElm.classList.add("tooltip");
      this.tooltipVisible = this.getAttribute("tipFormatter", true);
      if (stepDots) {
        this.classList.add("--step");
        const stepContainer = this.createElement("div", this);
        stepContainer.classList.add("slider-step");
        if (this.caption) {
          stepContainer.style.width = Number(this._width) - this._captionWidth + "px";
          stepContainer.style.marginLeft = this.captionWidth + "px";
        } else {
          stepContainer.style.width = "100%";
        }
        const dotNums = typeof stepDots === "boolean" ? (max - min) / (step || 1) + 1 : stepDots;
        for (let i = 0; i < dotNums; i++) {
          const dotElm = this.createElement("span", stepContainer);
          dotElm.classList.add("step-dot");
        }
      }
      this.captionWidth = this.getAttribute("captionWidth", true) || defaultCaptionWidth2;
      this.caption = this.getAttribute("caption", true);
      this.value = this.getAttribute("value", true);
      if (this._value > 0) {
        this.inputElm.style.backgroundSize = (this._value - min) * 100 / (max - min) + "% 100%";
      }
      if (labels) {
        this.rangeLabelListElm = this.createElement("ul", this);
        this.rangeLabelListElm.classList.add("range-labels");
        this.rangeLabelListElm.style.paddingLeft = this.captionWidth + "px";
        this.labels = JSON.parse(labels);
        this.renderLabels();
      }
      this.onUpdateTooltip(true);
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], Range.prototype, "_value", 2);
Range = __decorateClass([
  customElements2("i-range")
], Range);

// packages/radio/src/radio.css.ts
var Theme9 = theme_exports.ThemeVars;
var captionStyle = style({
  fontFamily: Theme9.typography.fontFamily,
  fontSize: Theme9.typography.fontSize,
  "$nest": {
    "span": {
      color: Theme9.text.primary
    }
  }
});

// packages/radio/src/radio.ts
var defaultCaptionWidth3 = 40;
var Radio = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      captionWidth: defaultCaptionWidth3,
      height: 25,
      width: 100
    });
    if (options == null ? void 0 : options.onRender)
      this.onRender = options.onRender;
    if (options == null ? void 0 : options.onChange)
      this.onRender = options.onChange;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (value == null)
      value = this.inputElm.min;
    this._value = value;
    this.inputElm.value = value;
    if (this.callback) {
      this.callback(value);
    }
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    if (!value)
      this.captionSpanElm.style.display = "none";
    else
      this.captionSpanElm.style.display = "";
    this.captionSpanElm && (this.captionSpanElm.textContent = value);
  }
  get captionWidth() {
    return this._captionWidth;
  }
  set captionWidth(value) {
    this._captionWidth = value;
    this.captionSpanElm.style.width = value + "px";
  }
  addClass(value) {
    if (value)
      this.labelElm.classList.add("is-checked");
    else
      this.labelElm.classList.remove("is-checked");
  }
  get checked() {
    return this.inputElm.checked;
  }
  set checked(value) {
    this.inputElm.checked = value;
    if (value)
      this.labelElm.classList.add("is-checked");
    else
      this.labelElm.classList.remove("is-checked");
  }
  _handleChange(source, event) {
    var _a;
    const checked = this.inputElm.checked || false;
    const parentElm = (_a = this.parentElement) == null ? void 0 : _a.closest("i-radio-group");
    if (parentElm) {
      if (checked)
        parentElm.checked = this;
      const radioElm = parentElm.querySelector("i-radio.is-checked");
      if (radioElm) {
        radioElm.classList.remove("is-checked");
      }
    } else {
      const inputElms = document.querySelectorAll(`input[name="${this.inputElm.name}"`);
      const radioElms = Array.from(inputElms).map((elm) => {
        var _a2;
        return (_a2 = elm.parentElement) == null ? void 0 : _a2.closest(".i-radio");
      });
      this.updateCheckedUI(radioElms);
    }
    this.addClass(checked);
  }
  updateCheckedUI(elms) {
    Array.from(elms).forEach((elm) => {
      elm.classList.remove("is-checked");
    });
  }
  init() {
    super.init();
    this.classList.add(captionStyle);
    this.callback = this.getAttribute("parentCallback", true);
    this.labelElm = this.createElement("label", this);
    this.labelElm.classList.add("i-radio");
    this.inputElm = this.createElement("input", this.labelElm);
    this.inputElm.type = "radio";
    const nameAttr = this.getAttribute("name");
    nameAttr && (this.inputElm.name = nameAttr);
    const checkAttr = this.getAttribute("checked");
    this.inputElm.checked = checkAttr;
    this.addClass(checkAttr || false);
    const disabled = this.getAttribute("enabled") === false;
    this.inputElm.disabled = disabled;
    this.value = this.getAttribute("value");
    this.captionSpanElm = this.createElement("span", this.labelElm);
    this.captionSpanElm.classList.add("i-radio_label");
    this.caption = this.getAttribute("caption") || "";
    this.captionWidth = this.getAttribute("captionWidth") || defaultCaptionWidth3;
    this.labelElm.style.color = "#000";
    if (this.onRender && typeof this.onRender === "function") {
      this.inputElm.style.display = "none";
      this.captionSpanElm.style.opacity = "0";
      this.onRender(this.labelElm);
    }
    this.inputElm.addEventListener("click", this._handleChange.bind(this));
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], Radio.prototype, "_value", 2);
Radio = __decorateClass([
  customElements2("i-radio")
], Radio);
var RadioGroup = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    if (this.hasChildNodes()) {
      const elms = Array.from(this.children);
      elms.forEach((elm) => {
        const inputElm = elm.getElementsByTagName("input")[0];
        this.updateUI(inputElm);
      });
    }
  }
  _handleChange(source, event) {
    const value = source.target.value;
    this._value = value;
    if (this.onChange)
      this.onChange(this, this.value);
  }
  updateUI(inputElm) {
    if (inputElm) {
      const isValue = inputElm.value === this._value;
      if (isValue && !inputElm.checked || !isValue && inputElm.checked)
        inputElm.click();
    }
  }
  init() {
    this.classList.add("i-radio-group");
    this.setAttribute("role", "radiogroup");
    this.value = this.getAttribute("value");
    const nameAttr = this.getAttribute("name", true) || "group" + Date.now();
    if (this.hasChildNodes()) {
      const elms = Array.from(this.children);
      elms.forEach((elm) => {
        const inputElm = elm.getElementsByTagName("input")[0];
        if (inputElm) {
          this.updateUI(inputElm);
          inputElm.setAttribute("name", nameAttr);
          inputElm.addEventListener("input", this._handleChange.bind(this));
        }
      });
    }
    super.init();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], RadioGroup.prototype, "_value", 2);
RadioGroup = __decorateClass([
  customElements2("i-radio-group")
], RadioGroup);

// packages/input/src/style/input.css.ts
var Theme10 = theme_exports.ThemeVars;
cssRule("i-input", {
  display: "inline-block",
  fontFamily: Theme10.typography.fontFamily,
  fontSize: Theme10.typography.fontSize,
  "$nest": {
    "> span": {
      overflow: "hidden"
    },
    "> span > label": {
      boxSizing: "border-box",
      color: Theme10.text.primary,
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      textAlign: "right",
      paddingRight: 4,
      height: "100%"
    },
    "> input": {
      border: `0.5px solid ${Theme10.divider}`,
      boxSizing: "border-box",
      outline: "none"
    },
    ".clear-btn": {
      display: "none",
      verticalAlign: "middle",
      padding: "6px",
      $nest: {
        "&.active": {
          display: "inline-block",
          cursor: "pointer"
        }
      }
    },
    "textarea": {
      resize: "vertical",
      width: "100%",
      lineHeight: 1.5
    }
  }
});

// packages/input/src/input.ts
var defaultCaptionWidth4 = 40;
var defaultRows = 4;
var Input = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      height: 25,
      width: 100
    });
    this._inputCallback = (value) => {
      this._value = value;
    };
  }
  get caption() {
    if (this._inputControl) {
      return this._inputControl.caption;
    }
    return this._caption;
  }
  set caption(value) {
    if (this._inputControl) {
      this._inputControl.caption = value;
    } else {
      this._caption = value;
      this.labelElm.textContent = this._caption || "";
      if (!value)
        this.labelElm.style.display = "none";
      else
        this.labelElm.style.display = "";
    }
  }
  get captionWidth() {
    if (this._inputControl) {
      return this._inputControl.captionWidth;
    }
    return this._captionWidth;
  }
  set captionWidth(value) {
    if (this._inputControl) {
      this._inputControl.captionWidth = value;
    } else {
      value = this._caption ? value || defaultCaptionWidth4 : 0;
      this._captionWidth = value;
      this.labelElm.style.width = value + "px";
    }
  }
  get height() {
    return this.offsetHeight;
  }
  set height(value) {
    if (typeof value == "string")
      value = parseInt(value);
    this._height = value;
    if (this._inputControl) {
      this._inputControl.height = value;
    } else {
      this.inputElm.style.height = value + "px";
    }
  }
  get value() {
    if (this._inputControl) {
      return this._inputControl.value;
    }
    return this._value;
  }
  set value(value) {
    if (this._inputControl) {
      this._inputControl.value = value;
    } else {
      if (value == null)
        value = "";
      this._value = value;
      this.inputElm.value = value;
    }
  }
  get width() {
    return this.offsetWidth;
  }
  set width(value) {
    this._width = value;
    const _value = Number(value);
    if (Number.isNaN(_value)) {
      this.setPosition("width", value);
      this.inputElm.style.width = value == null ? void 0 : value.toString();
    } else {
      this.style.width = value + "px";
      const clearBtnWidth = this._clearable ? this._clearBtnWidth : 0;
      let inputWidth = Number(this._width) - this._captionWidth - clearBtnWidth;
      this.inputElm.style.width = inputWidth + "px";
    }
  }
  get readOnly() {
    return this._readOnly;
  }
  set readOnly(value) {
    this._readOnly = value;
    this.inputElm.readOnly = value;
  }
  get inputType() {
    return this._inputType;
  }
  set inputType(type) {
    this._inputType = type;
  }
  get inputControl() {
    return this._inputControl;
  }
  set enabled(value) {
    super.enabled = value;
    if (this._inputControl) {
      this._inputControl.enabled = value;
    } else if (this.inputElm) {
      this.inputElm.disabled = !value;
    }
  }
  set placeholder(value) {
    this.inputElm.placeholder = value;
  }
  get rows() {
    return this._rows;
  }
  set rows(value) {
    if (this.inputType !== "textarea")
      return;
    this._rows = value;
    this.inputElm.rows = value;
  }
  _createInputElement(type) {
    const value = this.getAttribute("value");
    const caption = this.getAttribute("caption");
    const width = this.getAttribute("width", true);
    const height = this.getAttribute("height", true);
    const checked = this.getAttribute("checked", true);
    const enabled = this.getAttribute("enabled", true);
    this._clearBtnWidth = height - 2 || 0;
    switch (type) {
      case "checkbox":
        this._inputControl = new Checkbox(this, {
          value,
          checked,
          enabled,
          caption,
          indeterminate: this.getAttribute("indeterminate", true)
        });
        if (this.onRender)
          this._inputControl.onRender = this.onRender;
        this._inputControl.onChange = this.onChange;
        this.appendChild(this._inputControl);
        this.inputElm = this._inputControl.querySelector('input[type="checkbox"]');
        break;
      case "combobox":
        this._inputControl = new ComboBox(this, {
          value: this.attrs.value,
          items: this.attrs.items,
          width,
          height,
          enabled,
          icon: this.getAttribute("icon", true),
          multi: this.getAttribute("multi", true),
          onSelect: this.onSelect,
          linkTo: this.getAttribute("linkTo", true),
          parentCallback: this._inputCallback
        });
        this.appendChild(this._inputControl);
        this.inputElm = this._inputControl.querySelector("input");
        break;
      case "date":
      case "dateTime":
      case "time":
        this._inputControl = new Datepicker(this, {
          caption,
          value,
          placeholder: this._placeholder,
          type,
          dateFormat: this.getAttribute("dateFormat", true),
          width,
          height,
          enabled,
          parentCallback: this._inputCallback
        });
        this.appendChild(this._inputControl);
        this.inputElm = this._inputControl.querySelector('input[type="text"]');
        break;
      case "range":
        this._inputControl = new Range(this, {
          value,
          caption,
          width,
          height,
          enabled,
          min: this.getAttribute("min", true),
          max: this.getAttribute("max", true),
          step: this.getAttribute("step", true),
          labels: this.getAttribute("labels", true),
          stepDots: this.getAttribute("stepDots", true),
          tipFormatter: this.tipFormatter,
          tooltipVisible: this.tooltipVisible,
          parentCallback: this._inputCallback
        });
        this._inputControl.onChange = this.onChange;
        this._inputControl.onMouseUp = this.onMouseUp;
        this.appendChild(this._inputControl);
        this.inputElm = this._inputControl.querySelector('input[type="range"]');
        break;
      case "radio":
        const id = this.getAttribute("id") || "";
        this._inputControl = new Radio(this, {
          value,
          checked,
          enabled,
          caption,
          id: id + "_radio",
          name: this.getAttribute("name", true)
        });
        if (this.onRender)
          this._inputControl.onRender = this.onRender;
        this.appendChild(this._inputControl);
        this.inputElm = this._inputControl.querySelector('input[type="radio"]');
        break;
      case "textarea":
        this.captionSpanElm = this.createElement("span", this);
        this.labelElm = this.createElement("label", this.captionSpanElm);
        this.inputElm = this.createElement("textarea", this);
        this.inputElm.style.height = "auto";
        const rows = this.getAttribute("rows", true) || defaultRows;
        this.rows = rows;
        if (this._placeholder) {
          this.inputElm.placeholder = this._placeholder;
        }
        this.inputElm.disabled = enabled === false;
        this.inputElm.addEventListener("input", this._handleChange.bind(this));
        this.inputElm.addEventListener("keydown", this._handleInputKeyDown.bind(this));
        this.inputElm.addEventListener("keyup", this._handleInputKeyUp.bind(this));
        this.inputElm.addEventListener("blur", this._handleOnBlur.bind(this));
        this.inputElm.addEventListener("focus", this._handleOnFocus.bind(this));
        break;
      default:
        const inputType = type == "password" ? type : "text";
        this.captionSpanElm = this.createElement("span", this);
        this.labelElm = this.createElement("label", this.captionSpanElm);
        this.inputElm = this.createElement("input", this);
        this.inputElm.setAttribute("autocomplete", "disabled");
        this.inputElm.style.height = this.height + "px";
        this.inputElm.type = inputType;
        if (this._placeholder) {
          this.inputElm.placeholder = this._placeholder;
        }
        this.inputElm.disabled = enabled === false;
        this.inputElm.addEventListener("input", this._handleChange.bind(this));
        this.inputElm.addEventListener("keydown", this._handleInputKeyDown.bind(this));
        this.inputElm.addEventListener("keyup", this._handleInputKeyUp.bind(this));
        this.inputElm.addEventListener("blur", this._handleOnBlur.bind(this));
        this.inputElm.addEventListener("focus", this._handleOnFocus.bind(this));
        this._clearable = this.getAttribute("clearable", true);
        if (this._clearable) {
          this.clearIconElm = this.createElement("span", this);
          this.clearIconElm.classList.add("clear-btn");
          this.clearIconElm.style.width = this._clearBtnWidth + "px";
          this.clearIconElm.style.height = this._clearBtnWidth + "px";
          this.clearIconElm.addEventListener("click", () => {
            if (!this._enabled)
              return false;
            this._clearValue();
          });
          const clearIcon = new Icon(this, { name: "times" });
          this.clearIconElm.appendChild(clearIcon);
        }
        break;
    }
  }
  _handleChange(event) {
    if (this.inputType === "number" && !/^-?\d*[.]?\d*$/.test(this.inputElm.value)) {
      this.inputElm.value = this._value;
      return;
    }
    this._value = this.inputElm.value;
    if (this.onChange)
      this.onChange(this, this.value);
  }
  _handleInputKeyDown(event) {
    if (this.onKeyDown)
      this.onKeyDown(this, event);
  }
  _handleInputKeyUp(event) {
    if (this.onKeyUp)
      this.onKeyUp(this, event);
    if (this.clearIconElm) {
      if (this.value) {
        this.clearIconElm.classList.add("active");
      } else {
        this.clearIconElm.classList.remove("active");
      }
    }
  }
  _handleOnBlur(event) {
    if (this.onBlur) {
      event.preventDefault();
      this.onBlur(this, this.value);
    }
  }
  _handleOnFocus(event) {
    if (this.onFocus) {
      event.preventDefault();
      this.onFocus(this, event);
    }
  }
  _clearValue() {
    this.value = "";
    this.clearIconElm.classList.remove("active");
    if (this.clearCallback)
      this.clearCallback();
  }
  init() {
    if (!this.inputType) {
      this._placeholder = this.getAttribute("placeholder", true);
      this.inputType = this.getAttribute("inputType", true);
      this._createInputElement(this.inputType);
      this.caption = this.getAttribute("caption", true);
      this.captionWidth = parseInt(this.getAttribute("captionWidth", true));
      this.value = this.attrs.value;
      const readOnly = this.getAttribute("readOnly", true);
      if (readOnly)
        this.readOnly = readOnly;
      if (this.value && this.clearIconElm)
        this.clearIconElm.classList.add("active");
      this.clearCallback = this.getAttribute("clearCallback", true) || this.clearCallback;
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], Input.prototype, "_value", 2);
Input = __decorateClass([
  customElements2("i-input")
], Input);

// packages/image/src/style/image.css.ts
var Theme11 = theme_exports.ThemeVars;
cssRule("i-image", {
  position: "relative",
  $nest: {
    "&.i-image-crop": {
      position: "relative",
      display: "table",
      verticalAlign: "middle",
      width: "100%",
      overflow: "hidden"
    },
    ".i-image-crop_box": {
      width: "45%",
      height: 200,
      cursor: "move",
      touchAction: "none",
      position: "absolute",
      top: 0,
      left: 0,
      border: `1px dashed ${Theme11.background.paper}`,
      zIndex: "100",
      maxWidth: "100%"
    },
    ".i-image-crop_mask": {
      backgroundColor: ThemeVars.text.secondary,
      cursor: "crosshair",
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0
    },
    ".i-image_resize": {
      width: "100%",
      height: "100%"
    },
    ".i-image_resize-handle": {
      display: "inline-block",
      position: "absolute",
      border: `1px solid ${Theme11.background.default}`,
      backgroundColor: Theme11.action.disabled,
      width: 10,
      height: 10,
      outline: "1px solid transparent"
    },
    ".ord-nw": {
      top: 0,
      left: 0,
      marginTop: -5,
      marginLeft: -5,
      cursor: "nw-resize"
    },
    ".ord-ne": {
      top: 0,
      right: 0,
      marginTop: -5,
      marginRight: -5,
      cursor: "ne-resize"
    },
    ".ord-sw": {
      bottom: 0,
      left: 0,
      marginBottom: -5,
      marginLeft: -5,
      cursor: "sw-resize"
    },
    ".ord-se": {
      bottom: 0,
      right: 0,
      marginBottom: -5,
      marginRight: -5,
      cursor: "se-resize"
    },
    ".i-image-clipped": {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 99
    },
    "img": {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "inherit",
      verticalAlign: "middle",
      objectFit: "contain",
      overflow: "hidden"
    }
  }
});

// packages/image/src/image.ts
var Image2 = class extends Control {
  constructor(parent, options) {
    super(parent, options, {});
    this._rotate = 0;
  }
  get rotate() {
    return this._rotate;
  }
  set rotate(value) {
    if (value == void 0)
      return;
    value = parseInt(value);
    if (value != this._rotate) {
      if (this.imageElm) {
        if (this._rotate != 0)
          this.imageElm.classList.remove(rotate(this._rotate));
        this.imageElm.classList.add(rotate(value));
      }
      this._rotate = value;
    }
  }
  get url() {
    return this._url;
  }
  set url(value) {
    this._url = value;
    if (value) {
      if (!this.imageElm)
        this.imageElm = this.createElement("img", this);
    }
    if (this.imageElm) {
      this.imageElm.src = value;
      const self = this;
      this.imageElm.onerror = function() {
        self._defaultUrl && (this.src = self._defaultUrl);
      };
    }
  }
  get dataUrl() {
    return this._dataUrl;
  }
  set dataUrl(value) {
    this._dataUrl = value;
    if (value) {
      if (!this.imageElm)
        this.imageElm = this.createElement("img", this);
    }
    if (this.imageElm)
      this.imageElm.src = value;
  }
  get crop() {
    return this._crop;
  }
  get cropInfo() {
    const cropValue = +this.crop;
    try {
      if (typeof cropValue === "number") {
        return { aspectRatio: isNaN(cropValue) ? 1 : cropValue };
      } else {
        return JSON.parse(this.crop);
      }
    } catch (e) {
      return null;
    }
  }
  set crop(value) {
    this._crop = value;
    if (this.cropInfo) {
      const maskElm = this.createElement("div", this);
      maskElm.classList.add("i-image-crop_mask");
      this.classList.add("i-image-crop");
      this._wrapCropElm = this.createElement("div", this);
      this._wrapCropElm.classList.add("i-image-crop_box");
      this._wrapResizeElm = this.createElement("div", this._wrapCropElm);
      this._wrapResizeElm.classList.add("i-image_resize");
      const templateHtml = `
                <div class="i-image_resize-handle ord-nw" data-ord="nw" tabindex="0"></div>
                <div class="i-image_resize-handle ord-ne" data-ord="ne" tabindex="1"></div>
                <div class="i-image_resize-handle ord-se" data-ord="se" tabindex="2"></div>
                <div class="i-image_resize-handle ord-sw" data-ord="sw" tabindex="3"></div>
            `;
      this._wrapResizeElm.innerHTML = templateHtml;
      this.addDragEvent();
      this.addResizeEvent();
    } else {
      this._imageClippedElm.style.display = "none";
    }
  }
  get imgRatio() {
    const orgImg = this.imageElm;
    return orgImg ? +(orgImg.naturalWidth / orgImg.width).toFixed(2) : 1;
  }
  addDragEvent() {
    let x = 0;
    let y = 0;
    const ele = this._wrapCropElm;
    const self = this;
    const mouseDownHandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      x = e.clientX;
      y = e.clientY;
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = function(e) {
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      const { left, top } = self.validatePosition(ele.offsetLeft, ele.offsetTop, ele.offsetWidth, ele.offsetHeight);
      ele.style.top = `${top + dy}px`;
      ele.style.left = `${left + dx}px`;
      ele.style.transform = "none";
      self.drawImageBox();
      x = e.clientX;
      y = e.clientY;
    };
    const mouseUpHandler = function() {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    ele.addEventListener("mousedown", mouseDownHandler);
    ele.ondragstart = function() {
      return false;
    };
  }
  addResizeEvent() {
    const resizeElms = this._wrapResizeElm.children;
    for (let i = 0; i < resizeElms.length; i++) {
      this.resize(resizeElms[i]);
    }
  }
  resize(resizeElm) {
    let x = 0;
    let y = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startLeft = 0;
    let startTop = 0;
    const containerELm = this._wrapCropElm;
    const self = this;
    const resizeHandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      x = e.clientX;
      y = e.clientY;
      startWidth = containerELm.offsetWidth;
      startHeight = containerELm.offsetHeight;
      startLeft = containerELm.offsetLeft;
      startTop = containerELm.offsetTop;
      document.addEventListener("mousemove", resizingHandler);
      document.addEventListener("mouseup", endResizeHandler);
    };
    const resizingHandler = function(e) {
      let width = 0;
      let left = 0;
      let top = 0;
      const dx = e.clientX - x;
      if (resizeElm.getAttribute("data-ord") === "nw") {
        width = startWidth - dx;
        left = startLeft + dx;
        top = startTop + (startHeight - width);
      } else if (resizeElm.getAttribute("data-ord") === "ne") {
        width = startWidth + dx;
        left = startLeft;
        top = startTop + (startHeight - width);
      } else if (resizeElm.getAttribute("data-ord") === "sw") {
        width = startWidth - dx;
        left = startLeft + dx;
        top = startTop;
      } else if (resizeElm.getAttribute("data-ord") === "se") {
        width = startWidth + dx;
        left = startLeft;
        top = startTop;
      }
      const height = width / self.cropInfo.aspectRatio;
      const { width: newWidth, height: newHeight } = self.constrainToRatio(width, height, self.cropInfo.aspectRatio);
      containerELm.style.width = newWidth + "px";
      containerELm.style.height = newHeight + "px";
      const { left: newLeft, top: newTop } = self.validatePosition(left, top, newWidth, newHeight);
      containerELm.style.left = newLeft + "px";
      containerELm.style.top = newTop + "px";
      self.drawImageBox();
    };
    resizeElm.addEventListener("mousedown", resizeHandler);
    const endResizeHandler = function() {
      document.removeEventListener("mousemove", resizingHandler);
      document.removeEventListener("mouseup", endResizeHandler);
    };
  }
  validatePosition(left, top, width, height) {
    let newLeft = 0;
    let newTop = 0;
    const { width: containerWidth, height: containerHeight } = this.getContainerInfo();
    newLeft = left < 0 ? 0 : left > containerWidth - width ? containerWidth - width : left;
    newTop = top < 0 ? 0 : top > containerHeight - height ? containerHeight - height : top;
    return { left: newLeft, top: newTop };
  }
  constrainToRatio(width, height, ratio) {
    const orgHeight = this.imageElm.height;
    let newWidth = width;
    let newHeight = height;
    const widthRatio = orgHeight * ratio;
    const absWidth = Math.abs(width);
    const absHeight = Math.abs(width);
    if (absHeight > orgHeight || absWidth > widthRatio) {
      newHeight = orgHeight;
      newWidth = newHeight * ratio;
    }
    return { width: newWidth, height: newHeight };
  }
  getBoxInfo() {
    const elm = this._wrapCropElm;
    if (!elm)
      return { top: 0, left: 0, width: 0, height: 0 };
    return {
      top: elm.offsetTop,
      left: elm.offsetLeft,
      width: elm.offsetWidth,
      height: elm.offsetHeight
    };
  }
  getContainerInfo() {
    const containerWidth = this.imageElm && this.imageElm.clientWidth;
    const containerHeight = this.imageElm && this.imageElm.clientHeight;
    return {
      width: containerWidth || 0,
      height: containerHeight || 0
    };
  }
  drawImageBox() {
    const { left, top, width, height } = this.getBoxInfo();
    this._imageClippedElm && (this._imageClippedElm.style.clip = `rect(${top}px, ${left + width}px, ${top + height}px, ${left}px)`);
  }
  cropImage(url) {
    if (!this._wrapCropElm)
      return;
    const orgImg = this.imageElm;
    const canvas = this.createElement("canvas");
    const context = canvas.getContext("2d");
    const imageObj = this.createElement("img");
    imageObj.crossOrigin = "Anonymous";
    canvas.width = this._wrapCropElm.offsetWidth;
    canvas.height = this._wrapCropElm.offsetHeight;
    const parentPos = this.getBoundingClientRect();
    const childPos = this._wrapCropElm.getBoundingClientRect();
    const relativePos = { left: 0, top: 0 };
    relativePos.top = childPos.top - parentPos.top;
    relativePos.left = childPos.left - parentPos.left;
    const ratio = this.imgRatio;
    imageObj.onload = function() {
      const sourceWidth = childPos.width * ratio;
      const sourceHeight = childPos.height * ratio;
      const sourceX = relativePos.left * ratio;
      const sourceY = relativePos.top * ratio;
      const destWidth = canvas.width;
      const destHeight = canvas.height;
      let newLeft = 0;
      let newTop = 0;
      const containerWidth = orgImg.naturalWidth;
      const containerHeight = orgImg.naturalHeight;
      newLeft = sourceX < 0 ? 0 : sourceX > containerWidth - sourceWidth ? containerWidth - sourceWidth : sourceX;
      newTop = sourceY < 0 ? 0 : sourceY > containerHeight - sourceHeight ? containerHeight - sourceHeight : sourceY;
      context.drawImage(imageObj, newLeft, newTop, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
    };
    imageObj.src = url;
    return canvas;
  }
  async init() {
    super.init();
    this._defaultUrl = this.getAttribute("defaultUrl", true, "");
    const dataUrlAttr = this.getAttribute("dataUrl", true);
    if (dataUrlAttr)
      await fetch(dataUrlAttr).then((response) => response.blob()).then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        this.dataUrl = imageObjectURL;
      });
    const urlAttr = this.getAttribute("url", true);
    urlAttr && !dataUrlAttr && (this.url = urlAttr);
    this.rotate = this.getAttribute("rotate", true);
    const cropAttr = this.getAttribute("crop", true);
    cropAttr && (this.crop = cropAttr);
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this._wrapCropElm)
      return;
    if (!this._imageClippedElm) {
      this._imageClippedElm = this.imageElm.cloneNode();
      this._imageClippedElm.className = "i-image-clipped";
      this.appendChild(this._imageClippedElm);
    }
    const self = this;
    this.imageElm.onload = function() {
      const { width: containerWidth, height: containerHeight } = self.getContainerInfo();
      const { width: boxWidth, height: boxHeight } = self.getBoxInfo();
      let updatedHeight = boxHeight;
      if (self.cropInfo && self.cropInfo.aspectRatio) {
        updatedHeight = boxWidth / self.cropInfo.aspectRatio;
        self._wrapCropElm.style.height = `${updatedHeight}px`;
      }
      self._wrapCropElm.style.left = `${containerWidth / 2 - boxWidth / 2}px`;
      self._wrapCropElm.style.top = `${containerHeight / 2 - updatedHeight / 2}px`;
      self.drawImageBox();
    };
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Image2 = __decorateClass([
  customElements2("i-image")
], Image2);

// packages/markdown/src/style/markdown.css.ts
var Theme12 = theme_exports.ThemeVars;
cssRule("i-markdown", {
  display: "inline-block",
  color: Theme12.text.primary,
  fontFamily: Theme12.typography.fontFamily,
  fontSize: Theme12.typography.fontSize,
  $nest: {
    h1: {
      fontSize: "48px",
      fontWeight: "900",
      marginBottom: "16px",
      marginTop: "1.5em",
      $nest: {
        "@media (max-width: 700px)": {
          fontSize: "24px"
        }
      }
    },
    h2: {
      fontSize: "24px",
      lineHeight: "1.5",
      fontWeight: "600",
      marginBottom: "16px",
      marginTop: "1.5em",
      $nest: {
        "@media (max-width: 700px)": {
          fontSize: "20px"
        }
      }
    },
    h3: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "600",
      marginBottom: "16px",
      marginTop: "1.5em",
      $nest: {
        "@media (max-width: 700px)": {
          fontSize: "16px"
        }
      }
    },
    h4: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "16px",
      marginTop: "1.5em"
    },
    h5: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "16px",
      marginTop: "1.5em"
    },
    h6: {
      fontSize: "13.6px",
      fontWeight: "600",
      marginBottom: "16px",
      marginTop: "1.5em"
    },
    p: {
      display: "block",
      lineHeight: "150%",
      marginBottom: "1em",
      marginTop: "0",
      fontSize: "15px"
    },
    "p > img": {
      width: "50%",
      float: "left",
      $nest: {
        "@media (max-width: 700px)": {
          width: "100%"
        }
      }
    },
    "p img:nth-child(odd)": {
      paddingRight: "6px",
      $nest: {
        "@media (max-width: 700px)": {
          padding: "0"
        }
      }
    },
    "p img:nth-child(even)": {
      paddingLeft: "6px",
      $nest: {
        "@media (max-width: 700px)": {
          padding: "0"
        }
      }
    },
    "p img:only-child": {
      width: "100%"
    },
    "p a": {
      display: "contents"
    },
    "table": {
      borderSpacing: "0",
      border: "1px solid #393939",
      width: "100%",
      marginBottom: "20px",
      $nest: {
        "thead": {
          background: "#FFF"
        },
        "th, td": {
          padding: "10px"
        },
        "td": {
          borderTop: "1px solid #393939"
        },
        "tbody": {
          $nest: {
            "tr:nth-child(odd)": {
              backgroundColor: "#EEE"
            },
            "tr:nth-child(even)": {
              backgroundColor: "#FFF"
            }
          }
        }
      }
    },
    strong: {
      fontWeight: "600"
    },
    blockquote: {
      background: "#e3e3ff",
      borderLeft: "0.25em solid #55f",
      display: "block",
      padding: "15px 30px 15px 15px",
      color: "#6a737d",
      fontSize: "16px",
      margin: "0 0 16px",
      $nest: {
        p: {
          marginBottom: "0"
        }
      }
    },
    hr: {
      border: "1px solid #dfe2e5",
      boxSizing: "content-box",
      margin: "1.5em 0",
      overflow: "hidden",
      padding: "0"
    },
    ol: {
      marginBottom: "1em",
      marginTop: "0",
      paddingLeft: "2em",
      $nest: {
        li: {
          fontSize: "16px"
        },
        "li+li": {
          marginTop: "0.5em"
        }
      }
    },
    ul: {
      marginBottom: "1em",
      marginTop: "0",
      paddingLeft: "2em",
      $nest: {
        li: {
          fontSize: "16px"
        },
        "li+li": {
          marginTop: "0.5em"
        }
      }
    },
    "ol ol, ul ul, ol ul, ul ol": {
      marginTop: "0.5em"
    },
    "code, pre code": {
      borderRadius: "3px",
      background: "#ebeff3",
      overflowX: "scroll",
      border: "0",
      display: "inline",
      margin: "0",
      overflow: "visible",
      padding: "0",
      whiteSpace: "pre",
      wordBreak: "normal",
      wordWrap: "normal"
    },
    "a, a:hover": {
      color: "#55f",
      textDecoration: "none"
    }
  }
});

// packages/markdown/src/markdown.ts
var libs = [`${LibPath}lib/marked/marked.umd.js`];
var Markdown = class extends Control {
  constructor() {
    super();
    this.gitbookProcess = true;
  }
  async load(text) {
    if (!this.marked)
      this.marked = await this.loadLib();
    text = await this.marked.parse(text);
    text = await this.processText(text);
    this.innerHTML = text;
    return this.innerHTML;
  }
  async beforeRender(text) {
    this.innerHTML = text;
  }
  async processText(text) {
    if (this.gitbookProcess) {
      text = text.replace(/\*\*\*\*/g, "\n	").replace(/\\/g, "");
    }
    return text;
  }
  async loadLib() {
    return new Promise((resolve, reject) => {
      RequireJS.require(libs, async (marked) => {
        resolve(marked);
      });
    });
  }
  init() {
    super.init();
  }
};
Markdown = __decorateClass([
  customElements2("i-markdown")
], Markdown);

// packages/tab/src/style/tab.css.ts
var Theme13 = theme_exports.ThemeVars;
cssRule("i-tabs", {
  lineHeight: "25px",
  $nest: {
    "&.tab-justified i-tab": {
      flexBasis: 0,
      flexGrow: 1,
      textAlign: "center"
    },
    "&:not(.vertical) .tabs": {
      display: "flex",
      borderBottom: `1px solid ${Theme13.divider}`,
      marginBottom: "1rem",
      $nest: {
        "i-tab:not(.disabled).active::after": {
          display: "block",
          content: '""',
          alignContent: "center",
          margin: "auto",
          zIndex: 3,
          borderBottom: `2px solid ${Theme13.colors.info.main}`
        }
      }
    },
    ".tabs.borderless": {
      border: 0
    },
    ".tabs.scrollable": {
      overflowX: "auto",
      overflowY: "hidden",
      "-ms-overflow-style": "none",
      scrollbarWidth: "none",
      $nest: {
        "&::-webkit-scrollbar": {
          display: "none"
        }
      }
    },
    "&.vertical": {
      display: "flex !important",
      alignItems: "flex-start",
      $nest: {
        ".tabs": {
          display: "flex",
          marginRight: "1rem",
          flexDirection: "column"
        },
        "i-tab:not(.disabled).active": {
          backgroundColor: Theme13.colors.info.main,
          color: Theme13.colors.info.contrastText,
          borderRadius: "0.25rem"
        }
      }
    },
    ".tabs > i-tab": {
      display: "inline-block",
      color: Theme13.text.primary,
      marginBottom: "-1px",
      alignItems: "flex-start",
      font: "inherit",
      $nest: {
        "&.border": {
          border: "1px solid transparent",
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "0.25rem"
        },
        "&:not(.disabled):hover": {
          cursor: "pointer",
          color: Theme13.text.secondary
        },
        "&.disabled": {
          color: Theme13.text.disabled,
          boxShadow: Theme13.shadows[0]
        },
        "&:not(.disabled).active.border": {
          borderColor: `${Theme13.divider} ${Theme13.divider} #fff`,
          borderBottomWidth: "1.5px"
        },
        ".tab-link": {
          padding: "1rem"
        }
      }
    },
    ".tab_sheet > i-tab-sheet": {
      display: "none",
      minHeight: "260px",
      $nest: {
        "&.border": {
          border: `1px solid ${Theme13.divider}`,
          borderBottomLeftRadius: "0.25rem",
          borderBottomRightRadius: "0.25rem",
          padding: "0 1rem 1rem"
        },
        "&.show": {
          display: "block"
        },
        "&::after": {
          clear: "both"
        },
        "i-label .f1yauex0": {
          whiteSpace: "normal"
        }
      }
    }
  }
});

// packages/tab/src/tab.ts
var Tabs = class extends Container {
  constructor(parent, options) {
    super(parent, options, {
      width: 600
    });
    this._handleTabClick = (event) => {
      let target = null;
      target = event.target.closest("i-tab");
      if (target != null) {
        for (let i = 0; i < this._tabs.length; i++) {
          if (this._tabs[i].isSameNode(target) && target.getAttribute("enabled") !== false) {
            this.activePageIndex = i;
            break;
          }
        }
      }
    };
  }
  get activePageIndex() {
    return this._activePageIndex;
  }
  set activePageIndex(value) {
    this.toggleTab(this._activePageIndex);
    this._activePageIndex = value;
    this.toggleTab(this._activePageIndex, true);
  }
  set gap(value) {
    if (value == null || value == void 0)
      return;
    this.tabContainerElm.style.gap = value + "px";
  }
  set marginBottom(value) {
    if (value == null || value == void 0)
      return;
    this.tabContainerElm.style.marginBottom = value + "px";
  }
  addTab(value) {
    if (!Array.isArray(value))
      value = [value];
    this._tabs.push(...value);
    this.tabContainerElm.append(...value);
  }
  addTabSheet(value) {
    if (!Array.isArray(value))
      value = [value];
    this.tabSheetContainer.append(...value);
  }
  deactiveTab(index) {
    this._tabs[index].classList.remove("active");
    let tabSheetId = this._tabs[index].tabSheetId || "";
    if (tabSheetId) {
      let tabSheets = this.querySelector(`#${tabSheetId}`);
      tabSheets == null ? void 0 : tabSheets.classList.remove("show");
    }
    this.activePageIndex = -1;
  }
  toggleTab(index, active) {
    if (index >= 0 && index < this._tabs.length) {
      if (active) {
        this._tabs[index].classList.add("active");
      } else {
        this._tabs[index].classList.remove("active");
      }
      let tabSheetId = this._tabs[index].tabSheetId || "";
      if (tabSheetId) {
        let tabSheets = this.querySelector(`#${tabSheetId}`);
        if (active) {
          tabSheets == null ? void 0 : tabSheets.classList.add("show");
        } else {
          tabSheets == null ? void 0 : tabSheets.classList.remove("show");
        }
      }
    }
  }
  init() {
    if (!this._tabs) {
      super.init();
      this.addEventListener("click", this._handleTabClick);
      let vertical = this.getAttribute("vertical", true) || false;
      if (vertical) {
        this.classList.add("vertical");
      }
      let haveBorder = this.getAttribute("tabBorder", true) || false;
      this.tabContainerElm = this.createElement("div", this);
      this.tabContainerElm.classList.add("tabs");
      const _tabs = this.querySelectorAll("i-tab");
      this._tabs = [];
      _tabs.forEach((tab) => {
        if (haveBorder) {
          tab.classList.toggle("border");
        }
        this.tabContainerElm.appendChild(tab);
        this._tabs.push(tab);
      });
      const borderless = this.getAttribute("borderless", true) || false;
      if (borderless) {
        this.tabContainerElm.classList.add("borderless");
      }
      const scrollable = this.getAttribute("scrollable", true) || false;
      if (scrollable) {
        this.tabContainerElm.classList.add("scrollable");
      }
      this.gap = this.getAttribute("gap", true);
      this.marginBottom = this.getAttribute("marginBottom", true);
      let tabSheetId = "";
      this._activePageIndex = this.getAttribute("activePageIndex", true) || 0;
      if (this._activePageIndex >= 0 && this._activePageIndex < this._tabs.length) {
        this._tabs[this._activePageIndex].classList.add("active");
        tabSheetId = this._tabs[this._activePageIndex].tabSheetId || "";
      }
      this.tabSheetContainer = this.createElement("div", this);
      this.tabSheetContainer.classList.add("tab_sheet");
      let tabSheets = this.querySelectorAll("i-tab-sheet");
      tabSheets.forEach((tabSheet) => {
        this.tabSheetContainer.appendChild(tabSheet);
        if (tabSheet.id === tabSheetId) {
          tabSheet.classList.add("show");
        }
      });
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Tabs = __decorateClass([
  customElements2("i-tabs")
], Tabs);
var Tab = class extends Control {
  get caption() {
    return this.captionElm.innerHTML;
  }
  set caption(value) {
    this.captionElm.innerHTML = value;
  }
  get tabSheetId() {
    return this._tabSheetId;
  }
  set tabSheetId(value) {
    this._tabSheetId = value;
  }
  init() {
    if (!this.captionElm) {
      super.init();
      const className = !this.hasChildNodes() ? "tab-link" : "";
      this.captionElm = this.createElement("div", this);
      if (className)
        this.captionElm.classList.add(className);
      let caption = this.getAttribute("caption", true) || "";
      this.captionElm.innerHTML = caption;
      this.tabSheetId = this.attrs.tabSheetId;
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Tab = __decorateClass([
  customElements2("i-tab")
], Tab);
var TabSheet = class extends Control {
  init() {
    super.init();
    let haveBorder = this.getAttribute("border", true) || false;
    if (haveBorder) {
      this.classList.toggle("border");
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
TabSheet = __decorateClass([
  customElements2("i-tab-sheet")
], TabSheet);

// packages/markdown-editor/src/style/markdown-editor.css.ts
var Theme14 = theme_exports.ThemeVars;
cssRule("i-markdown-editor", {
  display: "block",
  $nest: {
    ".editor-container": {
      marginRight: "auto",
      marginLeft: "auto"
    },
    ".editor-tabs": {
      display: "block",
      position: "relative",
      border: `1px solid ${Theme14.divider}`,
      borderRadius: "6px",
      $nest: {
        ".tabs": {
          backgroundColor: Theme14.background.paper,
          borderBottom: `1px solid ${Theme14.divider}`,
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
          marginBottom: 0,
          zIndex: 1,
          $nest: {
            "i-tab": {
              display: "inline-block",
              padding: "12px 16px",
              textDecoration: "none",
              backgroundColor: "transparent",
              border: "1px solid transparent",
              borderBottom: 0,
              borderRadius: 0,
              transition: "color .2s cubic-bezier(0.3, 0, 0.5, 1)",
              cursor: "pointer",
              $nest: {
                ".tab-link": {
                  display: "none"
                },
                "&::after": {
                  content: "none!important"
                },
                "i-icon": {
                  display: "inline-block",
                  verticalAlign: "middle",
                  fill: Theme14.text.secondary
                },
                "span": {
                  marginLeft: "6px",
                  fontSize: "14px",
                  lineHeight: "23px",
                  color: Theme14.text.secondary,
                  verticalAlign: "middle"
                },
                "&.active": {
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  backgroundColor: Theme14.colors.primary.main,
                  borderColor: Theme14.divider,
                  $nest: {
                    "&:first-of-type": {
                      borderColor: "transparent",
                      borderTopRightRadius: 0,
                      borderRightColor: Theme14.divider
                    },
                    "i-icon": {
                      fill: Theme14.text.primary
                    },
                    "span": {
                      fontWeight: 600,
                      color: Theme14.text.primary
                    }
                  }
                }
              }
            }
          }
        },
        "#preview": {
          padding: "32px 85px"
        }
      }
    }
  }
});

// packages/markdown-editor/src/markdown-editor.ts
var MarkdownEditor = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      width: "100%",
      height: "auto"
    });
  }
  onViewPreview() {
    const value = this.mdEditor.value;
    this.mdPreviewer.load(value);
  }
  getValue() {
    return this.mdEditor.value;
  }
  setValue(value) {
    this.mdEditor.value = value;
    if (this.tabs.activePageIndex === 1) {
      this.mdPreviewer.load(value);
    }
  }
  async init() {
    super.init();
    const container = this.createElement("div", this);
    container.classList.add("editor-container");
    this.tabs = new Tabs();
    container.appendChild(this.tabs);
    this.tabs.classList.add("editor-tabs");
    this.tabs.width = "auto";
    this.editTab = new Tab();
    this.tabs.addTab(this.editTab);
    this.editTab.tabSheetId = "edit";
    const editIcon = new Icon();
    this.editTab.appendChild(editIcon);
    editIcon.name = "code";
    editIcon.style.width = "16px";
    editIcon.style.height = "16px";
    const editCaptionElm = this.createElement("span", this.editTab);
    editCaptionElm.innerHTML = "Edit file";
    this.previewTab = new Tab();
    this.tabs.addTab(this.previewTab);
    this.previewTab.tabSheetId = "preview";
    this.previewTab.onClick = this.onViewPreview.bind(this);
    const previewIcon = new Icon();
    this.previewTab.appendChild(previewIcon);
    previewIcon.name = "eye";
    previewIcon.style.width = "16px";
    previewIcon.style.height = "16px";
    const previewCaptionElm = this.createElement("span", this.previewTab);
    previewCaptionElm.innerHTML = "Preview";
    const editTabSheet = new TabSheet();
    this.tabs.addTabSheet(editTabSheet);
    editTabSheet.id = "edit";
    this.mdEditor = new CodeEditor();
    editTabSheet.appendChild(this.mdEditor);
    this.mdEditor.width = "100%";
    this.mdEditor.height = "646px";
    this.mdEditor.language = "markdown";
    const previewTabSheet = new TabSheet();
    this.tabs.addTabSheet(previewTabSheet);
    previewTabSheet.id = "preview";
    this.mdPreviewer = new Markdown();
    previewTabSheet.appendChild(this.mdPreviewer);
    this.tabs.activePageIndex = 0;
  }
};
MarkdownEditor = __decorateClass([
  customElements2("i-markdown-editor")
], MarkdownEditor);

// packages/menu/src/style/menu-item.css.ts
var Theme15 = theme_exports.ThemeVars;
var menuItemId = style({});
cssRule("i-menu-item", {
  fontFamily: Theme15.typography.fontFamily,
  fontSize: Theme15.typography.fontSize,
  position: "relative",
  $nest: {
    "*": {
      boxSizing: "border-box"
    },
    "&:hover > .desktop ~ i-menu": {
      display: "block"
    },
    "> .desktop": {
      display: "flex",
      alignItems: "center",
      margin: 0,
      minWidth: 0,
      $nest: {
        "~ i-menu": {
          display: "none"
        },
        "> .link": {
          color: Theme15.text.primary,
          margin: 0,
          padding: 0,
          border: 0,
          borderBottom: "1px solid",
          borderColor: "transparent",
          backgroundColor: "transparent",
          cursor: "pointer",
          textDecoration: "none",
          transition: "font-weight,text-shadow,opacity .3s ease",
          fontSize: "16px",
          width: "100%",
          $nest: {
            ".title": {
              display: "flex",
              alignItems: "center",
              margin: 0,
              minWidth: 0,
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              letterSpacing: "0.4px",
              gap: "4px"
            },
            ".heading": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              whiteSpace: "nowrap",
              padding: ".75rem 1rem",
              $nest: {
                svg: {
                  color: "inherit",
                  width: "1rem",
                  height: "1rem",
                  marginLeft: "2px"
                }
              }
            }
          }
        },
        "> .link:hover": {
          borderColor: "transparent",
          opacity: 0.85
        }
      }
    },
    "> .desktop.dropdown": {
      $nest: {
        "> .link": {
          display: "flex",
          alignItems: "center",
          width: "100%",
          opacity: 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          $nest: {
            " .title": {
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              letterSpacing: 0
            },
            ".content": {
              fontSize: "14px",
              fontWeight: 400,
              color: Theme15.text.primary,
              opacity: 0.64
            }
          }
        },
        "> .link:hover": {
          opacity: 1,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          $nest: {}
        }
      }
    },
    "> .desktop.show-dropdown": {
      $nest: {
        "~ i-menu": {
          display: "block"
        }
      }
    },
    ".submenu .heading svg": {
      transform: "rotate(-90deg)"
    },
    "> .mobile": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      cursor: "pointer",
      height: "52px",
      transition: "all 0.3s ease 0s",
      opacity: 0.68,
      color: Theme15.text.primary,
      fontSize: "16px",
      letterSpacing: 0,
      lineHeight: "20px",
      $nest: {
        "&.show-dropdown img": {
          transition: "all 0.3s ease",
          transform: "rotate(90deg)"
        },
        "& ~ i-menu": {
          $nest: {
            "& > nav.mobile": {
              position: "relative",
              width: "auto",
              height: "auto",
              animation: "none",
              boxShadow: "none",
              $nest: {
                ".align": {
                  padding: 0,
                  width: "auto",
                  height: "auto",
                  $nest: {
                    li: {
                      height: "auto",
                      paddingBottom: "6px",
                      $nest: {
                        a: {
                          fontSize: "14px",
                          fontWeight: 400
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "&.show-dropdown ~ i-menu > .dropdown": {
          display: "block",
          paddingBottom: "10px",
          paddingLeft: "8px"
        },
        "> .link": {
          display: "flex",
          margin: 0,
          minWidth: 0,
          gap: "16px",
          color: `${Theme15.text.primary}f5`,
          textDecoration: "none",
          $nest: {
            ".title": {
              display: "flex",
              alignItems: "center",
              margin: 0,
              minWidth: 0,
              gap: "4px",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.4px",
              color: `${Theme15.text.primary}f5`
            }
          }
        },
        "> button.link": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          border: 0,
          padding: 0,
          cursor: "pointer",
          $nest: {
            ".title": {
              textDecoration: "none",
              $nest: {
                ".heading": {
                  display: "flex"
                },
                img: {
                  display: "block"
                }
              }
            }
          }
        }
      }
    }
  }
});

// packages/menu/src/menu-item.ts
var MenuItem = class extends Control {
  constructor() {
    super(...arguments);
    this.isDropdownShown = false;
    this.selectedIcon = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6' fill='none'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3 0L6 3L3 6L0 3L3 0Z' fill='white'/%3e%3c/svg%3e";
    this.arrowRightIcon = "data:image/svg+xml,%3csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0.5 5H9.5M9.5 5L5 0.5M9.5 5L5 9.5' stroke='white' stroke-linejoin='round'/%3e%3c/svg%3e";
    this.arrowDownIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="css-1nhsdn7"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>';
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
    const heading = this.getElementsByClassName("heading")[0];
    if (heading && value === "More")
      heading.textContent = value;
  }
  get href() {
    return this._href;
  }
  set href(value) {
    this._href = value || "";
  }
  get linkTarget() {
    return this._linkTarget || "_self";
  }
  set linkTarget(value) {
    this._linkTarget = value || "_self";
  }
  get content() {
    return this._content;
  }
  set content(value) {
    this._content = value;
  }
  get platform() {
    return this._platform;
  }
  set platform(value) {
    if (!value || !["desktop", "mobile"].includes(value)) {
      value = "desktop";
    }
    this._platform = value;
  }
  get hasChildren() {
    return this._hasChildren;
  }
  set hasChildren(value) {
    if (value == null) {
      value = false;
    }
    this._hasChildren = value;
  }
  get isDropdown() {
    return this._isDropdown;
  }
  set isDropdown(value) {
    if (value == null) {
      value = false;
    }
    this._isDropdown = value;
  }
  get rootMode() {
    var _a;
    const rootMenu = (_a = this.parentElement) == null ? void 0 : _a.closest("i-menu:not(.submenu)");
    const mode = rootMenu == null ? void 0 : rootMenu.getAttribute("mode");
    return mode;
  }
  get active() {
    return this.classList.contains("menu-active");
  }
  set active(isActive) {
    if (isActive) {
      this.classList.add("menu-active");
    } else {
      this.classList.remove("menu-active");
    }
  }
  showDropdown() {
    this.isDropdownShown = true;
    if (this.itemElm) {
      this.itemElm.classList.add("show-dropdown");
    }
  }
  hideDropdown() {
    this.isDropdownShown = false;
    if (this.itemElm) {
      this.itemElm.classList.remove("show-dropdown");
    }
  }
  toggleDropdown() {
    this.isDropdownShown ? this.hideDropdown() : this.showDropdown();
    const parentMenu = this.closest("i-menu");
    if (parentMenu) {
      const menuItems = Array.from(parentMenu.querySelectorAll("i-menu-item"));
      menuItems.forEach((item) => {
        item.classList.remove("menu-active");
      });
    }
    this.classList.add("menu-active");
  }
  activeItem() {
    const parentMenu = this.closest("i-menu:not(.submenu)");
    if (parentMenu) {
      const activeItem = parentMenu.querySelector("i-menu-item.menu-active");
      activeItem == null ? void 0 : activeItem.classList.remove("menu-active");
    }
    this.classList.add("menu-active");
  }
  renderItem() {
    switch (this.platform) {
      case "desktop":
        this.itemElm = this.createElement("div", this);
        this.itemElm.classList.add("desktop");
        this.itemElm.addEventListener("click", (e) => {
          if (this.rootMode === "vertical") {
            this.toggleDropdown();
          } else {
            this.activeItem();
          }
        });
        break;
      case "mobile":
        this.itemElm = this.createElement("li", this);
        this.itemElm.classList.add("mobile");
        break;
      default:
        console.log("Invalid Platform");
        return;
    }
    if (this.isDropdown)
      this.itemElm.classList.add("dropdown");
    if (this.hasChildren)
      this.itemElm.classList.add("has-children");
    let linkElm = null;
    if ((!this.hasChildren || this.hasChildren && this.href) && !(this.platform === "mobile")) {
      linkElm = this.createElement("a");
      linkElm.setAttribute("href", this.href);
      linkElm.target = this.linkTarget;
    } else {
      linkElm = this.createElement("button");
      linkElm.setAttribute("type", "button");
    }
    linkElm.classList.add("link");
    let titleElm = null;
    if (this.platform === "desktop") {
      titleElm = this.createElement("div");
    } else {
      titleElm = this.createElement("a");
      titleElm.setAttribute("href", this.href);
      linkElm.target = this.linkTarget;
    }
    titleElm.classList.add("title");
    const heading = this.createElement("div");
    heading.classList.add("heading");
    const arrowRightIcon = this.createElement("img");
    arrowRightIcon.setAttribute("src", this.arrowRightIcon);
    arrowRightIcon.addEventListener("click", () => {
      console.log("------------click");
      this.toggleDropdown();
    });
    const titleSlot = this.querySelector("i-slot[name=title]");
    if (titleSlot) {
      heading.appendChild(titleSlot);
    } else {
      heading.append(this.title);
    }
    titleElm.appendChild(heading);
    if (this.content) {
      const content = this.createElement("div");
      content.classList.add("content");
      content.innerHTML = this.content;
      titleElm.appendChild(content);
    }
    linkElm.appendChild(titleElm);
    this.itemElm.appendChild(linkElm);
    if (this.hasChildren) {
      switch (this.platform) {
        case "desktop":
          heading.innerHTML += this.arrowDownIcon;
          break;
        case "mobile":
          linkElm.append(arrowRightIcon);
          break;
      }
    }
    switch (this.platform) {
      case "desktop":
        if (this.hasChildNodes()) {
          const dropdownMenu = this.getElementsByTagName("i-menu")[0];
          if (dropdownMenu) {
            this.appendChild(dropdownMenu);
          }
        }
    }
  }
  addEvent() {
    document.addEventListener("click", (e) => {
      var _a;
      e.stopPropagation();
      if (!((_a = document.getElementById(this.id)) == null ? void 0 : _a.contains(e.target))) {
        this.rootMode === "horizontal" && this.hideDropdown();
      }
    });
    let subMenuTimeout = null;
    this.addEventListener("mouseleave", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.classList.contains("more-item") || this.rootMode === "vertical")
        return;
      const desktopElm = this.querySelector(".desktop");
      subMenuTimeout = setTimeout(function() {
        desktopElm == null ? void 0 : desktopElm.classList.remove("show-dropdown");
      }, 500);
    });
    const subMenu = this.querySelector("i-menu");
    if (subMenu) {
      subMenu.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.rootMode === "vertical")
          return;
        const target = e.target;
        const beforeElm = target.previousSibling;
        beforeElm == null ? void 0 : beforeElm.classList.remove("show-dropdown");
        const parentMenu = this.querySelector(".desktop");
        parentMenu && parentMenu.classList.remove("show-dropdown");
      });
      subMenu.addEventListener("mouseenter", (e) => {
        subMenuTimeout && clearTimeout(subMenuTimeout);
      });
      subMenu.addEventListener("mouseenter", (e) => {
        subMenuTimeout && clearTimeout(subMenuTimeout);
      });
    }
  }
  init() {
    if (!this.itemElm) {
      this.id = new Date().getTime() + "";
      this.title = this.getAttribute("title", true);
      this.href = this.getAttribute("href", true);
      this.linkTarget = this.getAttribute("linkTarget", true);
      this.content = this.getAttribute("content", true);
      this.platform = this.getAttribute("platform", true);
      this.hasChildren = this.getAttribute("hasChildren", true);
      this.isDropdown = this.getAttribute("isDropdown", true);
      this.renderItem();
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
MenuItem = __decorateClass([
  customElements2("i-menu-item")
], MenuItem);

// packages/menu/src/style/menu.css.ts
var Theme16 = theme_exports.ThemeVars;
var menuId = style({});
var fadeInRight = keyframes({
  "0%": {
    opacity: 0,
    transform: "translate3d(100%, 0, 0)"
  },
  "100%": {
    opacity: 1,
    transform: "translate3d(0, 0, 0)"
  }
});
cssRule("i-menu", {
  fontFamily: Theme16.typography.fontFamily,
  fontSize: Theme16.typography.fontSize,
  position: "relative",
  $nest: {
    "*": {
      boxSizing: "border-box"
    },
    "&.root-menu": {
      $nest: {
        "> nav.mobile > .align": {
          minHeight: "100vh"
        }
      }
    },
    "> .desktop": {
      display: "block",
      marginTop: "1px",
      $nest: {
        ".align": {
          display: "flex",
          margin: 0,
          minWidth: 0,
          gridGap: "32px"
        }
      }
    },
    "> .desktop.dropdown": {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      left: 0,
      padding: 0,
      margin: 0,
      zIndex: 10,
      appearance: "none",
      border: "1px solid rgba(255, 255, 255, 0.08) ",
      borderRadius: "4px",
      borderImage: "initial",
      background: "linear-gradient(0deg, rgba(111, 76, 255, 0.04), rgba(111, 76, 255, 0.04)) 0% 0% / 100% 250%, linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), rgb(12, 10, 29)",
      $nest: {
        ".align": {
          flexDirection: "column",
          gridGap: 0,
          backgroundColor: "#252a48"
        },
        "i-menu": {
          position: "absolute",
          top: 0,
          left: "calc(100% + 2px)",
          $nest: {
            ".desktop.dropdown": {
              top: 0
            }
          }
        }
      }
    },
    ".menu-bar": {
      display: "block",
      boxShadow: "none",
      border: "none",
      backgroundColor: "transparent",
      color: Theme16.text.primary,
      cursor: "pointer"
    },
    "> nav.mobile": {
      position: "fixed",
      top: 0,
      minWidth: 0,
      maxHeight: "100vh",
      width: "240px",
      margin: 0,
      zIndex: 10,
      pointerEvents: "all",
      transform: "translateZ(0px)",
      animation: `0.4s ease-in 0s 1 normal none running ${fadeInRight}`,
      overflow: "hidden",
      overflowY: "auto",
      boxShadow: "rgb(0 0 0 / 14%) 0px 0px 16px, rgb(0 0 0 / 14%) 0px 0px 64px, rgb(0 0 0 / 32%) 0px 0px 128px",
      $nest: {
        "> .align": {
          width: "240px",
          height: "100%",
          padding: "32px",
          background: "linear-gradient(0deg, rgba(111, 76, 255, 0.04), rgba(111, 76, 255, 0.04)), linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), rgb(12, 10, 29)",
          $nest: {
            "> .menu-title": {
              display: "flex",
              alignItems: "center",
              margin: "0px 0px 6px",
              minWidth: 0,
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.64)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.14)",
              textTransform: "uppercase",
              height: "36px",
              gap: "3px",
              $nest: {
                img: {
                  opacity: 0.54,
                  cursor: "pointer",
                  height: "10px",
                  marginTop: "1px"
                }
              }
            },
            "> .list": {
              display: "flex",
              flexDirection: "column",
              margin: 0,
              minWidth: 0,
              $nest: {
                "i-slot": {
                  animation: `0.4s ease-in 0s 1 normal none running ${fadeInRight}`,
                  overflow: "hidden"
                }
              }
            }
          }
        }
      }
    },
    "> nav.mobile.dropdown": {
      display: "none"
    },
    "&.i-menu--vertical": {
      minWidth: "200px",
      $nest: {
        "> .desktop": {
          display: "block",
          marginTop: "1px",
          $nest: {
            ".align": {
              flexDirection: "column",
              gridGap: 0
            }
          }
        },
        "i-menu > .desktop.dropdown": {
          position: "static",
          display: "block",
          backgroundColor: "transparent",
          borderRadius: 0,
          boxShadow: "none",
          border: "none",
          transition: "all 0.3s ease-in",
          padding: 0,
          margin: 0
        },
        ".submenu": {
          transition: "border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)"
        },
        ".submenu > .desktop .align": {
          paddingLeft: ".5rem"
        },
        "i-menu-item > .desktop": {
          $nest: {
            "~ i-menu": {
              display: "block",
              maxHeight: 0,
              visibility: "hidden",
              position: "static",
              transition: "max-height .3s cubic-bezier(.645,.045,.355,1)"
            },
            svg: {
              transform: "rotate(-90deg)"
            },
            "> .link": {
              borderBottom: "none"
            },
            "> .link:hover": {
              backgroundColor: "transparent"
            }
          }
        },
        "i-menu-item > .desktop.show-dropdown": {
          $nest: {
            "~ i-menu": {
              maxHeight: "100%",
              visibility: "visible"
            },
            svg: {
              transform: "rotate(0deg)"
            }
          }
        }
      }
    },
    "&.i-menu--inline": {
      minWidth: "200px",
      $nest: {
        "> .desktop": {
          justifyContent: "space-between",
          $nest: {
            ".align": {
              flexDirection: "column",
              gridGap: 0
            },
            ".link": {
              padding: "5px 10px",
              $nest: {
                ".heading svg": {
                  transform: "rotate(-90deg)"
                },
                ".title": {
                  justifyContent: "space-between",
                  paddingLeft: 0
                },
                ".heading": {
                  width: "100%"
                },
                "&:hover": {
                  backgroundColor: Theme16.action.hover
                }
              }
            }
          }
        },
        "i-menu > .desktop.dropdown": {
          top: -30,
          left: "100%",
          backgroundColor: "transparent",
          minWidth: 150,
          $nest: {
            ".align": {
              backgroundColor: "transparent",
              $nest: {
                ".link": {
                  padding: "5px 10px"
                },
                ".link:hover": {
                  backgroundColor: Theme16.action.hover
                }
              }
            }
          }
        }
      }
    }
  }
});

// packages/menu/src/menu.ts
var Menu = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      mode: "horizontal",
      platform: "desktop"
    });
    this.isMobileMenuSwitching = false;
    this._menuItems = [];
    this._moreItems = [];
    this._appendedMore = false;
    this._oldWidth = 0;
    this.mobileMap = new Map();
    this.hambugerIcon = "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.88'%3e%3cpath d='M9 10H23' stroke='white' stroke-miterlimit='1.55572'/%3e%3cpath d='M12 16L20 16' stroke='white' stroke-miterlimit='1.55572'/%3e%3cpath d='M9 22H23' stroke='white' stroke-miterlimit='1.55572'/%3e%3c/g%3e%3c/svg%3e";
    this.arrowLeftIcon = "data:image/svg+xml,%3csvg width='13' height='14' viewBox='0 0 13 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13 7L1 7M1 7L7 13M1 7L7 1' stroke='white' stroke-linejoin='round'/%3e%3c/svg%3e";
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get platform() {
    return this._platform || "desktop";
  }
  set platform(value) {
    if (!value || !["desktop", "mobile"].includes(value)) {
      value = "desktop";
    }
    this._platform = value;
  }
  get isDropdown() {
    return this._isDropdown;
  }
  set isDropdown(value) {
    if (value == null) {
      value = false;
    }
    this._isDropdown = value;
  }
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    if (!this.isDropdown) {
      this.classList.add(`i-menu--${value}`);
    }
  }
  get items() {
    return this._items;
  }
  set items(items) {
    this._items = items;
    this.renderItems(this._items);
  }
  show() {
    if (this.platform === "mobile") {
      this.navElm.style.display = "block";
    }
  }
  hide() {
    if (this.platform === "mobile") {
      this.navElm.style.display = "none";
    }
  }
  goPrev() {
    this.isMobileMenuSwitching = true;
    const dom = this.mobileMap.get(this.title);
    if (dom) {
      this.titleElm.innerHTML = this.title;
      this.listElm.innerHTML = "";
      this.listElm.appendChild(dom);
    }
  }
  goNext(title) {
    this.isMobileMenuSwitching = true;
    const dom = this.mobileMap.get(title);
    if (dom) {
      this.titleElm.innerText = title;
      const backBtnElm = this.createElement("img");
      backBtnElm.setAttribute("src", this.arrowLeftIcon);
      this.titleElm.prepend(backBtnElm);
      this.titleElm.addEventListener("click", (e) => {
        this.goPrev();
      });
      this.listElm.innerHTML = "";
      this.listElm.appendChild(dom);
    }
  }
  handleResize(e) {
    if (!this.classList.contains("submenu")) {
      var self = this;
      setTimeout(function() {
        self.renderFn();
      }, 200);
    }
  }
  renderDesktopMenu(items) {
    this.id = `menu-desktop-${new Date().getTime()}`;
    this.classList.add("desktop-menu");
    this.navElm = this.createElement("nav", this);
    this.navElm.classList.add("desktop");
    if (this.isDropdown) {
      this.navElm.classList.add("dropdown");
      this.classList.add("submenu");
    }
    const alignElm = this.createElement("div");
    alignElm.classList.add("align");
    if (this.hasChildNodes()) {
      const menuItems = items ? items : Array.from(this.querySelectorAll("i-menu > i-menu-item"));
      for (const menuItem of menuItems) {
        alignElm.appendChild(menuItem);
      }
    }
    if (!this.isDropdown && !this.classList.contains("submenu") && this.mode === "horizontal") {
      this._oldWidth = Math.ceil(window.innerWidth);
      this.renderMore();
      setTimeout(() => this.renderFn(true), 700);
      window.addEventListener("resize", this.handleResize.bind(this));
    }
    this.navElm.appendChild(alignElm);
  }
  renderMore() {
    this._moreElm = new MenuItem();
    this._moreElm.classList.add("more-item");
    this._moreElm.init();
    const templateHtml = `
      <div class="desktop has-children">
        <button type="button" class="link">
          <div class="title">
            <div class="heading">More<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="css-1nhsdn7"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
          </div>
        </button>
      </div>
      <i-menu class="desktop-menu submenu enabled i-menu--stretch">
        <nav class="desktop dropdown">
          <div class="align">
          </div>
        </nav>
      </i-menu>
    `;
    this._moreElm.innerHTML = templateHtml;
  }
  reappendToParent(i, parentElm) {
    if (!parentElm)
      return;
    const itemInMore = this._moreItems[i];
    if (itemInMore !== void 0) {
      const item = this._menuItems[itemInMore];
      item && parentElm.appendChild(item);
      this._moreItems.splice(i, 1);
    }
  }
  appendToMore(i, parentElm) {
    const item = this._menuItems[i];
    const findedItem = this._moreItems.includes(i);
    !findedItem && this._moreItems.push(i);
    parentElm.contains(item) && parentElm.removeChild(item);
  }
  renderFn(isFirstLoad = false) {
    const newWidth = Math.ceil(window.innerWidth);
    const parentElm = this.querySelector(".align");
    if (!parentElm || window.innerWidth < 760)
      return;
    if (this.parentElement) {
      let parentOffsetWidth = Math.ceil(this.parentElement.offsetWidth);
      let parentScrollWidth = Math.ceil(this.parentElement.scrollWidth);
      const menuItems = document.querySelectorAll(".i-menu--horizontal:not(.submenu) > nav > .align > i-menu-item:not(.more-item)");
      if (this._oldWidth <= newWidth && this._moreItems.length) {
        let i = this._moreItems.length - 1 || 0;
        while (parentScrollWidth <= parentOffsetWidth && i >= 0) {
          this.reappendToParent(i, parentElm);
          parentOffsetWidth = Math.ceil(this.parentElement.offsetWidth);
          parentScrollWidth = Math.ceil(this.parentElement.scrollWidth);
          i--;
        }
        if (this._moreItems.length === 1) {
          this.reappendToParent(0, parentElm);
        }
        this._moreElm.style.display = this._moreItems.length ? "block" : "none";
        this._appendedMore = false;
      } else if (this._oldWidth !== newWidth || isFirstLoad) {
        let i = menuItems.length - 1;
        while (parentScrollWidth > parentOffsetWidth && i >= 0) {
          this.appendToMore(i, parentElm);
          parentOffsetWidth = Math.ceil(this.parentElement.offsetWidth);
          parentScrollWidth = Math.ceil(this.parentElement.scrollWidth);
          i--;
        }
        if (this._moreItems.length === 1) {
          this.reappendToParent(0, parentElm);
        }
      }
      const moreLength = this._moreItems.length;
      this._moreElm.style.display = moreLength ? "block" : "none";
      if (!moreLength) {
        this._oldWidth = newWidth;
        return;
      }
      if (this._moreElm && !this._appendedMore) {
        parentElm.appendChild(this._moreElm);
        this._appendedMore = true;
      }
      const alignMoreElm = this._moreElm.querySelector(".align");
      if (alignMoreElm) {
        alignMoreElm.innerHTML = "";
        for (let i = moreLength - 1; i >= 0; i--) {
          const childId = this._moreItems[i];
          const childItem = this._menuItems[childId];
          if (!childItem)
            continue;
          alignMoreElm.appendChild(childItem);
        }
      }
    }
    this._oldWidth = newWidth;
  }
  renderMobileMenu() {
    this.id = `menu-mobile-${new Date().getTime()}`;
    this.classList.add("mobile-menu");
    if (!this.isDropdown) {
      const button = this.createElement("button");
      button.classList.add("menu-bar");
      const icon = this.createElement("img");
      icon.setAttribute("src", this.hambugerIcon);
      button.appendChild(icon);
      button.addEventListener("click", () => {
        this.show();
      });
      this.appendChild(button);
    }
    this.navElm = this.createElement("nav");
    this.navElm.classList.add("mobile");
    this.appendChild(this.navElm);
    if (this.isDropdown) {
      this.navElm.classList.add("dropdown");
    }
    const alignElm = this.createElement("div");
    alignElm.classList.add("align");
    const menuSlot = Array.from(this.getElementsByTagName("i-slot"));
    for (const slot of menuSlot) {
      const name = slot.getAttribute("name");
      if (name)
        this.mobileMap.set(name, slot);
      this.removeChild(slot);
    }
    this.titleElm = this.createElement("div");
    this.titleElm.classList.add("menu-title");
    this.titleElm.append(this.title);
    alignElm.append(this.titleElm);
    this.listElm = this.createElement("div");
    this.listElm.classList.add("list");
    const dom = this.mobileMap.get(this.title);
    if (dom)
      this.listElm.appendChild(dom);
    alignElm.append(this.listElm);
    this.navElm.appendChild(alignElm);
    this.listElm.addEventListener("click", (e) => {
      const elm = e.target;
      if (elm.classList.contains("has-children") || elm.closest(".has-children")) {
        const title = elm.closest(".has-children");
        if (title && title.textContent)
          this.goNext(title.textContent);
      }
    });
    document.addEventListener("click", (e) => {
      var _a;
      e.stopPropagation();
      if (!this.isMobileMenuSwitching && !((_a = document.querySelector(`#${this.id}`)) == null ? void 0 : _a.contains(e.target))) {
        this.hide();
      }
      if (this.isMobileMenuSwitching)
        this.isMobileMenuSwitching = false;
    });
    this.hide();
  }
  setActiveItem(isActive) {
    const menuItems = this.querySelectorAll("i-menu-item");
    menuItems.forEach((item) => {
      if (isActive ? item.active : !item.active)
        return;
      item.active = isActive;
    });
  }
  renderItems(items) {
    if (!Array.isArray(items))
      return;
    let navElm = this.navElm;
    if (!navElm) {
      navElm = this.createElement("nav");
      navElm.classList.add(this.platform);
    }
    const alignElm = this.createElement("div");
    alignElm.classList.add("align");
    items.forEach((item) => {
      const hasChildren = item.items && item.items.length;
      const menuItem = new MenuItem();
      menuItem.platform = this.platform;
      menuItem.title = item.caption;
      menuItem.href = item.href || "";
      menuItem.isDropdown = !!hasChildren;
      menuItem.hasChildren = !!hasChildren;
      menuItem.enabled = item.enabled === false ? false : true;
      menuItem.renderItem();
      if (item.items && item.items.length) {
        const subMenu = new Menu();
        subMenu.isDropdown = true;
        subMenu.items = item.items;
        menuItem.appendChild(subMenu);
      }
      if (menuItem.platform === "desktop" && menuItem.enabled)
        menuItem.addEvent();
      alignElm.appendChild(menuItem);
    });
    if (this.isDropdown) {
      navElm.classList.add("dropdown");
      this.classList.add("submenu");
    } else {
      this.classList.add("root-menu");
    }
    this.classList.add(`${this.platform}-menu`);
    this.id = `menu-${this.platform}-${new Date().getTime()}`;
    navElm.appendChild(alignElm);
    this.navElm = navElm;
    this.appendChild(this.navElm);
  }
  append(...nodes) {
    switch (this.platform) {
      case "desktop":
        this._menuItems = [];
        let childNodes = [];
        for (let i = 0; i < nodes.length; i++) {
          childNodes.push(nodes[i]);
        }
        this._menuItems = childNodes;
        this.renderDesktopMenu(this._menuItems);
        break;
      case "mobile":
        this.renderMobileMenu();
        break;
    }
  }
  async init() {
    if (!this.navElm) {
      this.title = this.getAttribute("title", true);
      this.platform = this.getAttribute("platform", true, "desktop");
      this.isDropdown = this.getAttribute("isDropdown", true);
      this.mode = this.getAttribute("mode");
      const itemsAttr = this.attrs["items"] || this.getAttribute("items", true, []);
      if (itemsAttr && itemsAttr.length) {
        this.items = itemsAttr;
      } else {
        switch (this.platform) {
          case "desktop":
            this._menuItems = [];
            let childNodes = [];
            for (let i = 0; i < this.childNodes.length; i++) {
              childNodes.push(this.childNodes[i]);
            }
            this._menuItems = childNodes;
            if (childNodes.length > 0) {
              this.renderDesktopMenu();
            }
            break;
          case "mobile":
            this.renderMobileMenu();
            break;
        }
      }
      super.init();
    }
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize.bind(this));
    clearTimeout();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Menu = __decorateClass([
  customElements2("i-menu")
], Menu);

// packages/module/src/module.ts
function ProxySetter(obj, prop, value) {
  obj["__target"][prop] = value;
  return true;
}
function ProxyGetter(target, prop) {
  if (typeof target.__target[prop] == "function")
    return target.__target[prop].bind(target.__target);
  if (prop == "__target")
    return target["__target"];
  else if (prop == "__path")
    return target["__path"];
  else if (prop == "$renderElms" && target.__target)
    return target.__target["$renderElms"];
  let path;
  if (target.__root)
    path = [];
  else
    path = target.__path || [];
  path.push(prop);
  return ProxyObject({
    __target: target.__target,
    __path: path
  });
}
function ProxyObject(target, root) {
  if (target.__root)
    root = true;
  let path;
  if (root)
    path = [];
  else
    path = target.__path || [];
  if (target.__target)
    target = target.__target;
  return new Proxy({ __root: root, __target: target, __path: path }, {
    get: ProxyGetter,
    set: ProxySetter
  });
}
function getObservable(target, paths) {
  if (isObservable(target))
    return target;
  let path = paths.shift();
  if (paths.length == 0) {
    if (typeof target["observables"] == "function")
      return target["observables"](path);
    else if (path && typeof target == "object")
      return target[path];
  } else
    return getObservable(target[path], paths);
}
function bindObservable(elm, prop) {
  return function(changes) {
    elm[prop] = changes[0].value;
  };
}
var Module = class extends Container {
  constructor(parent, options, defaults) {
    super(parent, options, defaults || {
      width: "inherit",
      height: "inherit"
    });
    this.$renderElms = [];
    let proxy = ProxyObject(this, true);
    this.$render = this._render.bind(proxy);
  }
  static async create(options, parent, defaults) {
    let self = new this(parent, options, defaults);
    self.init();
    return self;
  }
  init() {
    super.init();
    this.$renderElms = [];
    let proxy = ProxyObject(this, true);
    let render = this.render.bind(proxy);
    let r = window["Render"];
    window["Render"] = this._render.bind(proxy);
    render();
    for (let i = 0; i < this.$renderElms.length; i++) {
      let elm = this.$renderElms[i].elm;
      let options = this.$renderElms[i].options;
      for (let prop in options) {
        let value = options[prop];
        if (value == null ? void 0 : value.__target) {
          let target = value.__target;
          let paths = value.__path;
          let targetValue = this.getValue(target, paths);
          let observable3 = getObservable(target, paths);
          if (isObservable(observable3)) {
            if (paths.length > 0)
              Observe(observable3, bindObservable(elm, prop), { path: paths.join(".") });
            else {
              Observe(observable3, bindObservable(elm, prop));
            }
          }
          elm[prop] = targetValue;
        }
      }
    }
    this.$renderElms = [];
    window["Render"] = r;
  }
  flattenArray(arr) {
    return arr.reduce((result, item) => {
      if (Array.isArray(item)) {
        const temp = this.flattenArray(item);
        result = result.concat(temp);
      } else {
        result.push(item);
      }
      return result;
    }, []);
  }
  _render(...params) {
    let tag = params[0];
    let options = params[1];
    let elm = this.createElement(tag);
    if (options) {
      this.$renderElms.push({
        elm,
        options
      });
      elm.attrs = options;
      for (let v in options) {
        if (v == "id") {
          this[options[v]] = elm;
          elm.id = options[v];
        } else if (typeof options[v] == "function")
          elm[v] = options[v].bind(this);
        else if (typeof options[v] != "object")
          elm.setAttribute(v, options[v]);
      }
    }
    const newParams = this.flattenArray(params);
    for (let i = 2; i < newParams.length; i++) {
      elm.appendChild(newParams[i]);
    }
    this.appendChild(elm);
    return elm;
  }
  render() {
  }
  onLoad() {
  }
};
Module = __decorateClass([
  customElements2("i-module")
], Module);

// packages/label/src/style/label.css.ts
var Theme17 = theme_exports.ThemeVars;
var captionStyle2 = style({
  display: "inline-block",
  color: Theme17.text.primary,
  fontFamily: Theme17.typography.fontFamily,
  fontSize: Theme17.typography.fontSize,
  $nest: {
    "&.is-ellipsis": {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "inline-block"
    }
  }
});

// packages/label/src/label.ts
var Label = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get caption() {
    return this.captionDiv.innerHTML;
  }
  set caption(value) {
    this.captionDiv.innerHTML = value || "";
  }
  get font() {
    return {
      color: this.captionDiv.style.color,
      name: this.captionDiv.style.fontFamily,
      size: this.captionDiv.style.fontSize,
      bold: this.captionDiv.style.fontStyle.indexOf("bold") >= 0,
      style: this.captionDiv.style.fontStyle
    };
  }
  set font(value) {
    this.captionDiv.style.color = value.color || "";
    this.captionDiv.style.fontSize = value.size || "";
    this.captionDiv.style.fontWeight = value.bold ? "bold" : "";
    this.captionDiv.style.fontFamily = value.name || "";
    this.captionDiv.style.fontStyle = value.style || "";
  }
  set height(value) {
    this.captionDiv.style.height = value + "px";
  }
  set width(value) {
    this.captionDiv.style.width = value + "px";
  }
  get displayType() {
    return this.captionDiv.style.display;
  }
  set displayType(value) {
    this.captionDiv.style.display = value;
    value === "block" && (this.captionDiv.style.width = "100%");
  }
  init() {
    if (!this.captionDiv) {
      this.captionDiv = this.createElement("div", this);
      this.captionDiv.classList.add(captionStyle2);
      this.caption = this.getAttribute("caption", true) || "";
      this.displayType = this.getAttribute("displayType", true);
      const font = this.getAttribute("font", true);
      if (font)
        this.font = font;
      const ellipsisAttr = this.getAttribute("ellipsis", true, false);
      if (ellipsisAttr)
        this.captionDiv.classList.add("is-ellipsis");
      const styleAttr = this.getAttribute("style", true);
      if (styleAttr) {
        let styleObj = {};
        const styleArr = styleAttr.split(";");
        if (styleArr.length) {
          for (let i = 0; i < styleArr.length; i++) {
            const style2 = styleArr[i];
            const splittedStyle = style2.split(":");
            const type = splittedStyle[0];
            const value = splittedStyle[1];
            styleObj[type] = value;
          }
          const customStyle = style(__spreadValues({}, styleObj));
          this.captionDiv.classList.add(customStyle);
        }
      }
      super.init();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.visible)
      this.style.display = this.displayType;
    else
      this.style.display = "none";
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Label = __decorateClass([
  customElements2("i-label")
], Label);

// packages/panel/src/style/panel.css.ts
var panelStyle = style({
  display: "block",
  clear: "both",
  position: "relative"
});
var overflowStyle = style({
  overflow: "hidden"
});
var vStackStyle = style({
  display: "flex",
  flexDirection: "column"
});
var hStackStyle = style({
  display: "flex",
  flexDirection: "row"
});
var justifyContentStartStyle = style({
  justifyContent: "flex-start"
});
var justifyContentCenterStyle = style({
  justifyContent: "center"
});
var justifyContentEndStyle = style({
  justifyContent: "flex-end"
});
var justifyContentSpaceBetweenStyle = style({
  justifyContent: "space-between"
});
var alignItemsStretchStyle = style({
  alignItems: "stretch"
});
var alignItemsStartStyle = style({
  alignItems: "flex-start"
});
var alignItemsCenterStyle = style({
  alignItems: "center"
});
var alignItemsEndStyle = style({
  alignItems: "flex-end"
});

// packages/panel/src/panel.ts
var Panel = class extends Container {
  constructor(parent, options) {
    super(parent, options);
  }
  get float() {
    return this._float || "none";
  }
  set float(value) {
    if (value) {
      this._float = value;
      this.style.float = this._float;
    }
    if (this.float !== "none")
      this.style.clear = "none";
    else
      this.style.clear = "";
  }
  getNumber(value) {
    if (!value)
      return 0;
    const result = value.replace(/[a-zA-Z]/g, "");
    return +result;
  }
  fixDimension(width, height) {
    this.style.width = `${width}px`;
    this.style.height = height + "px";
  }
  updateUI() {
    let width = this.getBoundingClientRect().width;
    let height = this.getBoundingClientRect().height;
    if (this.parentElement) {
      const parentStyle = getComputedStyle(this.parentElement);
      const paddingLeft = parentStyle.paddingLeft;
      const paddingRight = parentStyle.paddingRight;
      const parentWidth = this.parentElement.getBoundingClientRect().width;
      width = parentWidth - (this.getNumber(paddingLeft) + this.getNumber(paddingRight));
    }
    this.fixDimension(width, height);
  }
  init() {
    super.init();
    this.classList.add(panelStyle);
    if (this.dock) {
      this.classList.add(overflowStyle);
    }
    this.float = this.getAttribute("float", true);
  }
  connectedCallback() {
    if (this.connected) {
      return;
    }
    super.connectedCallback();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Panel = __decorateClass([
  customElements2("i-panel")
], Panel);

// packages/panel/src/vStack.ts
var VStack = class extends Panel {
  constructor(parent, options) {
    super(parent, options);
  }
  get horizontalAlignment() {
    return this._horizontalAlignment;
  }
  set horizontalAlignment(value) {
    this._horizontalAlignment = value || "Stretch";
    switch (this._horizontalAlignment) {
      case "Stretch":
        this.classList.add(alignItemsStretchStyle);
        break;
      case "Start":
        this.classList.add(alignItemsStartStyle);
        break;
      case "Center":
        this.classList.add(alignItemsCenterStyle);
        break;
      case "End":
        this.classList.add(alignItemsEndStyle);
        break;
    }
  }
  get verticalAlignment() {
    return this._verticalAlignment;
  }
  set verticalAlignment(value) {
    this._verticalAlignment = value || "Start";
    switch (this._verticalAlignment) {
      case "Start":
        this.classList.add(justifyContentStartStyle);
        break;
      case "Center":
        this.classList.add(justifyContentCenterStyle);
        break;
      case "End":
        this.classList.add(justifyContentEndStyle);
        break;
      case "SpaceBetween":
        this.classList.add(justifyContentSpaceBetweenStyle);
        break;
    }
  }
  get gap() {
    return this._gap;
  }
  set gap(value) {
    this._gap = value || "initial";
    if (typeof this._gap === "number") {
      this.style.gap = this._gap + "px";
    } else {
      this.style.gap = this._gap;
    }
  }
  init() {
    super.init();
    this.classList.add(vStackStyle);
    this.horizontalAlignment = this.getAttribute("horizontalAlignment", true);
    this.verticalAlignment = this.getAttribute("verticalAlignment", true);
    this.gap = this.getAttribute("gap", true);
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
VStack = __decorateClass([
  customElements2("i-vstack")
], VStack);

// packages/panel/src/hStack.ts
var HStack = class extends Panel {
  constructor(parent, options) {
    super(parent, options);
  }
  get horizontalAlignment() {
    return this._horizontalAlignment;
  }
  set horizontalAlignment(value) {
    this._horizontalAlignment = value || "Start";
    switch (this._horizontalAlignment) {
      case "Start":
        this.classList.add(justifyContentStartStyle);
        break;
      case "Center":
        this.classList.add(justifyContentCenterStyle);
        break;
      case "End":
        this.classList.add(justifyContentEndStyle);
        break;
      case "SpaceBetween":
        this.classList.add(justifyContentSpaceBetweenStyle);
        break;
    }
  }
  get verticalAlignment() {
    return this._verticalAlignment;
  }
  set verticalAlignment(value) {
    this._verticalAlignment = value || "Stretch";
    switch (this._verticalAlignment) {
      case "Stretch":
        this.classList.add(alignItemsStretchStyle);
        break;
      case "Start":
        this.classList.add(alignItemsStartStyle);
        break;
      case "Center":
        this.classList.add(alignItemsCenterStyle);
        break;
      case "End":
        this.classList.add(alignItemsEndStyle);
        break;
    }
  }
  get gap() {
    return this._gap;
  }
  set gap(value) {
    this._gap = value || "initial";
    if (typeof this._gap === "number") {
      this.style.gap = this._gap + "px";
    } else {
      this.style.gap = this._gap;
    }
  }
  init() {
    super.init();
    this.classList.add(hStackStyle);
    this.horizontalAlignment = this.getAttribute("horizontalAlignment", true);
    this.verticalAlignment = this.getAttribute("verticalAlignment", true);
    this.gap = this.getAttribute("gap", true);
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
HStack = __decorateClass([
  customElements2("i-hstack")
], HStack);

// packages/toast/src/style/toast.ts
var Theme18 = theme_exports.ThemeVars;
var toastStyle = style({});
cssRule("i-toast", {
  fontFamily: Theme18.typography.fontFamily,
  fontSize: Theme18.typography.fontSize,
  $nest: {
    "*": {
      boxSizing: "border-box"
    },
    ".toast-container": {
      position: "fixed",
      zIndex: 999999,
      pointerEvents: "none",
      $nest: {
        ".toast-title": {
          fontWeight: "bold"
        },
        ".toast-message": {
          wordWrap: "break-word",
          $nest: {
            "a, label": {
              color: "#fff"
            },
            "a:hover": {
              color: "#ccc",
              textDecoration: "none"
            }
          }
        },
        ".toast-close-button": {
          position: "relative",
          right: "-0.3em",
          top: "-0.3em",
          float: "right",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#fff",
          textShadow: "0 1px 0 #fff",
          opacity: 0.8,
          filter: "alpha(opacity=80)"
        },
        ".toast-close-button:hover, .toast-close-button:focus": {
          color: "#000",
          textDecoration: "none",
          cursor: "pointer",
          opacity: 0.4,
          filter: "alpha(opacity=40)"
        },
        "button.toast-close-button": {
          padding: 0,
          cursor: "pointer",
          background: "transparent",
          border: 0
        },
        "> div": {
          position: "relative",
          pointerEvents: "auto",
          overflow: "hidden",
          margin: "0 0 6px",
          padding: "15px 15px 15px 50px",
          width: "300px",
          borderRadius: "3px",
          backgroundPosition: "15px center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0 0 12px #999",
          color: "#fff",
          opacity: 0.95,
          filter: "alpha(opacity=95)"
        },
        "> div:hover": {
          boxShadow: "0 0 12px #000",
          opacity: 1,
          filter: "alpha(opacity=100)",
          cursor: "pointer"
        },
        "> .toast-info": {
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=") !important'
        },
        "> .toast-error": {
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=") !important'
        },
        "> .toast-success": {
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==") !important'
        },
        "> .toast-warning": {
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=") !important'
        },
        ".toast": {
          backgroundColor: "#030303"
        },
        ".toast-success": {
          backgroundColor: "#51a351"
        },
        ".toast-error": {
          backgroundColor: "#bd362f"
        },
        ".toast-info": {
          backgroundColor: "#2f96b4"
        },
        ".toast-warning": {
          backgroundColor: "#f89406"
        }
      }
    },
    ".toast-container.toast-top-center > div, .toast-container.toast-bottom-center > div": {
      width: "300px",
      marginLeft: "auto",
      marginRight: "auto"
    },
    ".toast-container.toast-top-full-width > div, .toast-container.toast-bottom-full-width > div": {
      width: "96%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    ".toast-top-center": {
      top: "12px",
      right: 0,
      width: "100%"
    },
    ".toast-bottom-center": {
      bottom: "12px",
      right: 0,
      width: "100%"
    },
    ".toast-top-full-width": {
      top: 0,
      right: 0,
      width: "100%"
    },
    ".toast-bottom-full-width": {
      bottom: 0,
      right: 0,
      width: "100%"
    },
    ".toast-top-left": {
      top: "12px",
      left: "12px"
    },
    ".toast-top-right": {
      top: "12px",
      right: "12px"
    },
    ".toast-bottom-right": {
      right: "12px",
      bottom: "12px"
    },
    ".toast-bottom-left": {
      bottom: "12px",
      left: "12px"
    },
    ".toast-progress": {
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "4px",
      backgroundColor: "#000",
      opacity: 0.4,
      filter: "alpha(opacity=40)"
    },
    "&.i-toast--stretch": {
      $nest: {
        "@media all and (max-width: 240px)": {
          $nest: {
            ".toast-container > div": {
              padding: "8px 8px 8px 50px",
              width: "11em"
            },
            ".toast-container .toast-close-button": {
              right: "-0.2em",
              top: "-0.2em"
            }
          }
        },
        "@media all and (min-width: 241px) and (max-width: 480px)": {
          $nest: {
            ".toast-container > div": {
              padding: "8px 8px 8px 50px",
              width: "18em"
            },
            ".toast-container .toast-close-button": {
              right: "-0.2em",
              top: "-0.2em"
            }
          }
        },
        "@media all and (min-width: 481px) and (max-width: 768px)": {
          $nest: {
            ".toast-container > div": {
              padding: "15px 15px 15px 50px",
              width: "25em"
            }
          }
        }
      }
    }
  }
});

// packages/toast/src/toast.ts
var ToastType;
(function(ToastType2) {
  ToastType2["error"] = "error";
  ToastType2["info"] = "info";
  ToastType2["success"] = "success";
  ToastType2["warning"] = "warning";
})(ToastType || (ToastType = {}));
var Toast = class extends Control {
  constructor(parent, options) {
    super(parent, options);
    this.toastId = 0;
    this.containerId = `toast-container-${toastStyle}`;
  }
  getDefaults() {
    return {
      tapToDismiss: true,
      toastClass: "toast",
      debug: false,
      showMethod: "fadeIn",
      showDuration: 300,
      showEasing: "swing",
      onShown: void 0,
      hideMethod: "fadeOut",
      hideDuration: 1e3,
      hideEasing: "swing",
      onHidden: void 0,
      closeMethod: false,
      closeDuration: false,
      closeEasing: false,
      closeOnHover: true,
      extendedTimeOut: 1e3,
      iconClasses: {
        error: "toast-error",
        info: "toast-info",
        success: "toast-success",
        warning: "toast-warning"
      },
      iconClass: "toast-info",
      positionClass: "toast-top-right",
      timeOut: 5e3,
      titleClass: "toast-title",
      messageClass: "toast-message",
      escapeHtml: false,
      target: "body",
      closeHtml: null,
      closeClass: "toast-close-button",
      newestOnTop: true,
      preventDuplicates: false,
      progressBar: false,
      progressClass: "toast-progress",
      rtl: false
    };
  }
  getOptions() {
    return Object.assign({}, this.getDefaults(), this.options);
  }
  notify(map) {
    let options = this.getOptions();
    let iconClass = map.iconClass || options.iconClass;
    if (typeof map.optionsOverride !== "undefined") {
      options = Object.assign(options, map.optionsOverride);
      iconClass = map.optionsOverride.iconClass || iconClass;
    }
    this.toastId++;
    const container = document.getElementById(`toast-container-${toastStyle}`);
    if (container) {
      container.className = "";
      container.classList.add("toast-container", options.positionClass);
    }
    let intervalId = null;
    let toastElement = this.createElement("div", this);
    let titleElement = this.createElement("div", this);
    let messageElement = this.createElement("div", this);
    let progressElement = this.createElement("div", this);
    let closeElement = null;
    if (options.closeHtml) {
      closeElement = options.closeHtml;
    } else {
      closeElement = this.createElement("button", this);
      closeElement.setAttribute("type", "button");
      closeElement.innerHTML = "&times;";
    }
    const progressBar = {
      intervalId: null,
      hideEta: null,
      maxHideTime: null
    };
    const response = {
      toastId: this.toastId,
      state: "visible",
      startTime: new Date(),
      endTime: null,
      options,
      map
    };
    const escapeHtml = (source) => {
      if (source == null) {
        source = "";
      }
      return source.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    const personalizeToast = () => {
      setIcon();
      setTitle();
      setMessage();
      setCloseButton();
      setProgressBar();
      setRTL();
      setSequence();
      setAria();
    };
    const setAria = () => {
      let ariaValue = "";
      switch (map.iconClass) {
        case "toast-success":
        case "toast-info":
          ariaValue = "polite";
          break;
        default:
          ariaValue = "assertive";
      }
      toastElement.setAttribute("aria-live", ariaValue);
    };
    const handleEvents = () => {
      if (options.closeOnHover) {
        toastElement.addEventListener("mouseover", function() {
          stickAround();
          delayedHideToast();
        });
      }
      if (!options.onclick && options.tapToDismiss) {
        toastElement.addEventListener("click", hideToast);
      }
      if (options.closeButton && closeElement) {
        closeElement.addEventListener("click", function(event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else if (event.cancelBubble !== void 0 && event.cancelBubble !== true) {
            event.cancelBubble = true;
          }
          if (options.onCloseClick) {
            options.onCloseClick(event);
          }
          hideToast(true);
        });
      }
      if (options.onclick) {
        toastElement.addEventListener("click", function(event) {
          options.onclick(event);
          hideToast();
        });
      }
    };
    const displayToast = () => {
      this.fadeIn(toastElement, options.showDuration, options.onShown);
      if (options.timeOut > 0) {
        intervalId = setTimeout(hideToast, options.timeOut);
        progressBar.maxHideTime = parseFloat(options.timeOut);
        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
        if (options.progressBar) {
          progressBar.intervalId = setInterval(updateProgress, 10);
        }
      }
    };
    const setIcon = () => {
      if (map.iconClass) {
        toastElement.classList.add(options.toastClass, iconClass);
      }
    };
    const setSequence = () => {
      if (container) {
        if (options.newestOnTop) {
          container.prepend(toastElement);
        } else {
          container.append(toastElement);
        }
      }
    };
    const setTitle = () => {
      if (map.title) {
        let suffix = map.title;
        if (options.escapeHtml) {
          suffix = escapeHtml(map.title);
        }
        titleElement.append(suffix);
        titleElement.classList.add(options.titleClass);
        toastElement.append(titleElement);
      }
    };
    const setMessage = () => {
      if (map.message) {
        let suffix = map.message;
        if (options.escapeHtml) {
          suffix = escapeHtml(map.message);
        }
        messageElement.append(suffix);
        messageElement.classList.add(options.messageClass);
        toastElement.append(messageElement);
      }
    };
    const setCloseButton = () => {
      if (closeElement && options.closeButton) {
        closeElement.classList.add(options.closeClass);
        closeElement.setAttribute("role", "button");
        toastElement.prepend(closeElement);
      }
    };
    const setProgressBar = () => {
      if (options.progressBar) {
        progressElement.classList.add(options.progressClass);
        toastElement.prepend(progressElement);
      }
    };
    const setRTL = () => {
      if (options.rtl) {
        toastElement.classList.add("rtl");
      }
    };
    const shouldExit = (options2, map2) => {
    };
    const hideToast = (override) => {
      const duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration;
      clearTimeout(progressBar.intervalId);
      this.fadeOut(toastElement, duration, function() {
        clearTimeout(intervalId);
        if (options.onHidden && response.state !== "hidden") {
          options.onHidden();
        }
        response.state = "hidden";
        response.endTime = new Date();
      });
    };
    const delayedHideToast = () => {
    };
    const stickAround = () => {
    };
    const updateProgress = () => {
      const percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
      progressElement.style.width = percentage + "%";
    };
    personalizeToast();
    displayToast();
    handleEvents();
    return response;
  }
  createContainer(options) {
    this.containerElm = this.createElement("div", this);
    this.containerElm.id = this.containerId;
    this.containerElm.classList.add("toast-container", options.positionClass);
    this.appendChild(this.containerElm);
    return this.containerElm;
  }
  fadeIn(el, time, callback) {
    el.style.opacity = "0";
    let last = new Date().getTime();
    const tick = function() {
      el.style.opacity = (+el.style.opacity + (new Date().getTime() - last) / time).toString();
      last = +new Date();
      if (+el.style.opacity < 1)
        requestAnimationFrame(tick) || setTimeout(tick, 16);
      else if (callback)
        callback();
    };
    tick();
  }
  fadeOut(el, time, callback) {
    el.style.opacity = "1";
    let last = new Date().getTime();
    const tick = function() {
      el.style.opacity = (+el.style.opacity - (new Date().getTime() - last) / time).toString();
      last = +new Date();
      if (+el.style.opacity > 0)
        requestAnimationFrame(tick) || setTimeout(tick, 16);
      else if (callback)
        callback();
    };
    tick();
  }
  info(message, title, optionsOverride) {
    return this.notify({
      type: ToastType.info,
      iconClass: this.getOptions().iconClasses.info,
      title,
      message,
      optionsOverride
    });
  }
  success(message, title, optionsOverride) {
    return this.notify({
      type: ToastType.success,
      iconClass: this.getOptions().iconClasses.success,
      title,
      message,
      optionsOverride
    });
  }
  warning(message, title, optionsOverride) {
    return this.notify({
      type: ToastType.warning,
      iconClass: this.getOptions().iconClasses.warning,
      title,
      message,
      optionsOverride
    });
  }
  error(message, title, optionsOverride) {
    return this.notify({
      type: ToastType.error,
      iconClass: this.getOptions().iconClasses.error,
      title,
      message,
      optionsOverride
    });
  }
  init() {
    if (!this.containerElm) {
      const options = this.getOptions();
      this.containerElm = this.createContainer(options);
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Toast = __decorateClass([
  customElements2("i-toast")
], Toast);

// packages/tooltip/src/style/tooltip.css.ts
var Theme19 = theme_exports.ThemeVars;
var arrowBackgroundColor = "var(--tooltips-arrow-background, rgba(97, 97, 97, 0.92))";
cssRule("body", {
  $nest: {
    ".ii-tooltip": {
      position: "absolute",
      display: "inline-block",
      fontFamily: Theme19.typography.fontFamily,
      backgroundColor: "rgba(97, 97, 97, 0.92)",
      borderRadius: "4px",
      color: "rgb(255, 255, 255)",
      padding: "4px 8px",
      fontSize: "0.6875rem",
      maxWidth: "300px",
      overflowWrap: "break-word",
      fontWeight: 500,
      zIndex: 10
    },
    ".ii-tooltip-top::after": {
      content: "''",
      position: "absolute",
      top: "100%",
      left: "50%",
      marginLeft: "-5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `${arrowBackgroundColor} transparent transparent transparent`
    },
    ".ii-tooltip-topLeft::after": {
      content: "''",
      position: "absolute",
      top: "100%",
      left: "0%",
      marginLeft: "12px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `${arrowBackgroundColor} transparent transparent transparent`
    },
    ".ii-tooltip-topRight::after": {
      content: "''",
      position: "absolute",
      top: "100%",
      right: "0%",
      marginRight: "12px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `${arrowBackgroundColor} transparent transparent transparent`
    },
    ".ii-tooltip-left::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: "100%",
      marginTop: "-5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent transparent transparent ${arrowBackgroundColor}`
    },
    ".ii-tooltip-leftTop::after": {
      content: "''",
      position: "absolute",
      top: "0%",
      left: "100%",
      marginTop: "5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent transparent transparent ${arrowBackgroundColor}`
    },
    ".ii-tooltip-leftBottom::after": {
      content: "''",
      position: "absolute",
      bottom: "0%",
      left: "100%",
      marginBottom: "5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent transparent transparent ${arrowBackgroundColor}`
    },
    ".ii-tooltip-right::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      right: "100%",
      marginTop: "-5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent ${arrowBackgroundColor} transparent transparent`
    },
    ".ii-tooltip-rightTop::after": {
      content: "''",
      position: "absolute",
      top: "0%",
      right: "100%",
      marginTop: "5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent ${arrowBackgroundColor} transparent transparent`
    },
    ".ii-tooltip-rightBottom::after": {
      content: "''",
      position: "absolute",
      bottom: "0%",
      right: "100%",
      marginBottom: "5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent ${arrowBackgroundColor} transparent transparent`
    },
    ".ii-tooltip-bottom::after": {
      content: "''",
      position: "absolute",
      bottom: "100%",
      left: "50%",
      marginLeft: "-5px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent transparent ${arrowBackgroundColor} transparent`
    },
    ".ii-tooltip-bottomLeft::after": {
      content: "''",
      position: "absolute",
      bottom: "100%",
      left: "0%",
      marginLeft: "12px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent transparent ${arrowBackgroundColor} transparent`
    },
    ".ii-tooltip-bottomRight::after": {
      content: "''",
      position: "absolute",
      bottom: "100%",
      right: "0%",
      marginRight: "12px",
      borderWidth: "5px",
      borderStyle: "solid",
      borderColor: `transparent transparent ${arrowBackgroundColor} transparent`
    }
  }
});

// packages/tooltip/src/tooltip.ts
var Tooltip = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  positionAt(parent, tooltip, placement) {
    const parentCoords = parent.getBoundingClientRect();
    let left = 0;
    let top = 0;
    const dist = 10;
    switch (placement) {
      case "top":
        top = parentCoords.top - tooltip.offsetHeight - dist;
        left = parentCoords.left + (parent.offsetWidth - tooltip.offsetWidth) / 2;
        break;
      case "topLeft":
        top = parentCoords.top - tooltip.offsetHeight - dist;
        left = parentCoords.left;
        break;
      case "topRight":
        top = parentCoords.top - tooltip.offsetHeight - dist;
        left = parentCoords.left + parent.offsetWidth - tooltip.offsetWidth;
        break;
      case "left":
        top = (parentCoords.top + parentCoords.bottom) / 2 - tooltip.offsetHeight / 2;
        left = parentCoords.left - dist - tooltip.offsetWidth;
        if (parentCoords.left - tooltip.offsetWidth < 0) {
          left = dist;
        }
        break;
      case "leftTop":
        top = parentCoords.top;
        left = parentCoords.left - dist - tooltip.offsetWidth;
        if (parentCoords.left - tooltip.offsetWidth < 0) {
          left = dist;
        }
        break;
      case "leftBottom":
        top = parentCoords.top + parent.offsetHeight - tooltip.offsetHeight;
        left = parentCoords.left - dist - tooltip.offsetWidth;
        if (parentCoords.left - tooltip.offsetWidth < 0) {
          left = dist;
        }
        break;
      case "right":
        top = (parentCoords.top + parentCoords.bottom) / 2 - tooltip.offsetHeight / 2;
        left = parentCoords.right + dist;
        if (parentCoords.right + tooltip.offsetWidth > document.documentElement.clientWidth) {
          left = document.documentElement.clientWidth - tooltip.offsetWidth - dist;
        }
        break;
      case "rightTop":
        top = parentCoords.top;
        left = parentCoords.right + dist;
        if (parentCoords.right + tooltip.offsetWidth > document.documentElement.clientWidth) {
          left = document.documentElement.clientWidth - tooltip.offsetWidth - dist;
        }
        break;
      case "rightBottom":
        top = parentCoords.top + parent.offsetHeight - tooltip.offsetHeight;
        left = parentCoords.right + dist;
        if (parentCoords.right + tooltip.offsetWidth > document.documentElement.clientWidth) {
          left = document.documentElement.clientWidth - tooltip.offsetWidth - dist;
        }
        break;
      case "bottom":
        top = parentCoords.bottom + dist;
        left = parentCoords.left + (parent.offsetWidth - tooltip.offsetWidth) / 2;
        break;
      case "bottomLeft":
        top = parentCoords.bottom + dist;
        left = parentCoords.left;
        break;
      case "bottomRight":
        top = parentCoords.bottom + dist;
        left = parentCoords.left + parent.offsetWidth - tooltip.offsetWidth;
        break;
    }
    left = left < 0 ? parentCoords.left : left;
    top = top < 0 ? parentCoords.bottom + dist : top;
    tooltip.style.left = left + "px";
    tooltip.style.top = top + pageYOffset + "px";
  }
  renderTooltip(elm) {
    const classAttr = this.getAttribute("popperClass", true);
    const tooltip = document.createElement("div");
    tooltip.classList.add("ii-tooltip");
    if (classAttr)
      tooltip.classList.add(classAttr);
    tooltip.innerHTML = elm.dataset.tooltip || "";
    document.body.appendChild(tooltip);
    const placement = elm.getAttribute("data-placement") || "top";
    tooltip.classList.add(`ii-tooltip-${placement}`);
    this.positionAt(elm, tooltip, placement);
    const color = elm.getAttribute("data-color") || this._color;
    if (color) {
      tooltip.style.backgroundColor = color;
      tooltip.style.setProperty("--tooltips-arrow-background", color);
    }
    const width = elm.getAttribute("data-width");
    if (width) {
      tooltip.style.maxWidth = width;
    }
    return tooltip;
  }
  onHandleClick(elm, event) {
    let tooltip = this.renderTooltip(elm);
    console.log(tooltip);
    setTimeout(function() {
      tooltip.remove();
    }, 500);
  }
  init() {
    if (!this.containerElm) {
      this._color = this.getAttribute("color", true);
      const checkElm = (e) => {
        var _a, _b;
        let elm = e.target;
        const needCheckParent = ["IMG", "svg"];
        if (elm.nodeName === "use") {
          elm = (_a = elm.closest("i-clipboard")) != null ? _a : elm;
        }
        if (needCheckParent.includes(elm.nodeName)) {
          elm = (_b = elm.parentElement) != null ? _b : elm;
        }
        if (!elm.hasAttribute("data-tooltip"))
          return;
        return elm;
      };
      document.body.addEventListener("mouseover", (e) => {
        const elm = checkElm(e);
        if (!elm)
          return;
        const triggerType = elm.getAttribute("data-trigger") || "hover";
        if (triggerType === "hover") {
          const tooltip = this.renderTooltip(elm);
          elm.addEventListener("mouseleave", function(e2) {
            setTimeout(function() {
              tooltip.remove();
            }, 100);
          });
          elm.addEventListener("click", function(e2) {
            setTimeout(function() {
              tooltip.remove();
            }, 100);
          });
        }
      });
      document.body.addEventListener("mousedown", (e) => {
        const elm = checkElm(e);
        if (!elm)
          return;
        const triggerType = elm.getAttribute("data-trigger") || "hover";
        if (triggerType === "click") {
          this.onHandleClick(elm, e);
        }
      });
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Tooltip = __decorateClass([
  customElements2("i-tooltip")
], Tooltip);

// packages/tree-view/src/style/treeView.css.ts
var Theme20 = theme_exports.ThemeVars;
cssRule("i-tree-view", {
  display: "block",
  overflowY: "auto",
  fontFamily: Theme20.typography.fontFamily,
  fontSize: Theme20.typography.fontSize,
  $nest: {
    ".i-tree-node_content": {
      display: "flex",
      alignItems: "center"
    },
    "i-tree-node": {
      display: "block",
      position: "relative"
    },
    "i-tree-node.is-checked > .i-tree-node_children": {
      display: "block"
    },
    "i-tree-node.is-checked > .i-tree-node_content > .i-tree-node_icon": {
      transform: "rotate(90deg)"
    },
    'input[type="checkbox"]': {
      position: "absolute",
      clip: "rect(0, 0, 0, 0)"
    },
    ".i-tree-node_children": {
      display: "none"
    },
    ".i-tree-node_label": {
      position: "relative",
      display: "inline-block",
      width: "100%",
      color: Theme20.text.primary,
      cursor: "pointer"
    },
    ".i-tree-node_icon": {
      display: "none",
      transition: "all ease 0.4s",
      paddingRight: ".7em",
      $nest: {
        "svg": {
          width: 14,
          height: 14
        }
      }
    },
    "input ~ .i-tree-node_icon": {
      display: "inline-block"
    },
    "input ~ .i-tree-node_label": {
      maxWidth: "calc(100% - 15px)"
    },
    "&.i-tree-view": {
      padding: 0,
      position: "relative",
      $nest: {
        ".is-checked:before": {
          borderLeft: `1px solid ${Theme20.divider}`,
          height: "calc(100% - 1em)",
          top: "1em"
        },
        ".i-tree-node_children > .is-checked:before": {
          height: "calc(100% - 25px)",
          top: 25
        },
        "i-tree-node.active > .i-tree-node_content": {
          backgroundColor: Theme20.action.selected,
          border: `1px solid ${Theme20.colors.info.dark}`,
          color: Theme20.text.primary
        },
        ".i-tree-node_content:hover": {
          backgroundColor: Theme20.action.hover
        },
        'input[type="checkbox"]': {
          margin: 0
        },
        ".i-tree-node_label": {
          padding: ".2rem .3rem"
        }
      }
    },
    "&.shown-line": {
      $nest: {
        "> i-tree-node.has-children": {
          marginLeft: "1em"
        },
        "input ~ .i-tree-node_label:before": {
          background: Theme20.colors.primary.main,
          color: Theme20.colors.primary.contrastText,
          position: "relative",
          zIndex: "1",
          float: "left",
          margin: "0 1em 0 -2em",
          width: "1em",
          height: "1em",
          borderRadius: "0.2em",
          content: "'+'",
          textAlign: "center",
          lineHeight: ".9em"
        },
        "input:checked ~ .i-tree-node_label:before": {
          content: "'\u2013'"
        },
        "i-tree-node": {
          padding: "0 0 1em 1em",
          $nest: {
            "&.active": {
              $nest: {
                "> .i-tree-node_label": {
                  color: "#55f"
                }
              }
            }
          }
        },
        ".i-tree-node_children i-tree-node": {
          padding: ".5em 0 0 .9em"
        },
        "i-tree-node:last-of-type:before": {
          height: "1em",
          bottom: "auto"
        },
        " i-tree-node:before": {
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "-.1em",
          display: "block",
          width: "1px",
          borderLeft: `1px solid ${Theme20.divider}`,
          content: "''"
        },
        ".i-tree-node_icon": {
          display: "none"
        },
        ".i-tree-node_content": {
          paddingLeft: `0 !important`
        },
        "i-tree-node .i-tree-node_label:after": {
          position: "absolute",
          top: ".25em",
          left: "-1em",
          display: "block",
          height: "0.5em",
          width: "1em",
          borderBottom: `1px solid ${Theme20.divider}`,
          borderLeft: `1px solid ${Theme20.divider}`,
          borderRadius: " 0 0 0 0",
          content: "''"
        },
        "i-tree-node input:checked ~ .i-tree-node_label:after": {
          borderRadius: "0 .1em 0 0",
          borderTop: `1px solid ${Theme20.divider}`,
          borderRight: `0.5px solid ${Theme20.divider}`,
          borderBottom: "0",
          borderLeft: "0",
          bottom: "0",
          height: "auto",
          top: ".5em"
        }
      }
    },
    ".text-input": {
      border: "none",
      outline: "0",
      height: "100%",
      width: "100%",
      $nest: {
        "&:focus": {
          borderBottom: `2px solid ${Theme20.colors.primary.main}`
        }
      }
    }
  }
});

// packages/tree-view/src/treeView.ts
var Theme21 = theme_exports.ThemeVars;
var TreeView = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      editable: false
    });
    this._items = [];
  }
  get activeItem() {
    return this._activeItem;
  }
  set activeItem(value) {
    this._activeItem = value;
    const treeNodes = Array.from(this.querySelectorAll("i-tree-node"));
    treeNodes.forEach((treeNode) => treeNode.active = false);
    if (value)
      value.active = true;
  }
  get dataSource() {
    return this._data || [];
  }
  set dataSource(value) {
    this._data = value;
    this.renderTree();
  }
  get items() {
    return this._items || [];
  }
  get editable() {
    return this._editable;
  }
  set editable(value) {
    this._editable = value;
  }
  async add(parentNode, caption) {
    const childData = { caption, children: [] };
    const childNode = await TreeNode.create(__spreadValues({}, childData));
    childNode.nodeLevel = parentNode.nodeLevel + 1;
    childNode.editable = this.editable;
    if (this.onRenderNode && typeof this.onRenderNode === "function")
      this.onRenderNode(this, childNode);
    parentNode.appendNode(childNode);
    return childNode;
  }
  delete(node) {
    if ((node == null ? void 0 : node.nodeLevel) === 0) {
      const findedIndex = this.dataSource.findIndex((nodeItem) => nodeItem.order === node.order);
      findedIndex !== -1 && this.dataSource.splice(findedIndex, 1);
      node.remove();
    } else {
      const parentNode = node.closest("i-tree-node");
      parentNode && parentNode.removeNode(node);
    }
  }
  async renderTreeNode(node, level = 0) {
    const treeNode = await TreeNode.create(__spreadValues({}, node));
    treeNode.nodeLevel = level;
    treeNode.editable = this.editable;
    if (this.onRenderNode && typeof this.onRenderNode === "function")
      this.onRenderNode(this, treeNode);
    if (node.children && !node.isLazyLoad) {
      for (const child2 of node.children) {
        const childNode = await this.renderTreeNode(child2, level + 1);
        const childWrapper = treeNode.querySelector(".i-tree-node_children");
        childWrapper && childWrapper.appendChild(childNode);
      }
    }
    return treeNode;
  }
  async renderTree() {
    for (const node of this.dataSource) {
      let treeNode = await this.renderTreeNode(node, 0);
      this.appendChild(treeNode);
      const activedNode = treeNode.querySelector(".active");
      if (activedNode) {
        treeNode.classList.add("is-checked");
        const inputArr = Array.from(treeNode.querySelectorAll('input[type="checkbox"]'));
        inputArr.forEach((input) => input.checked = true);
        this.activeItem = activedNode;
      }
      this._items.push(treeNode);
    }
  }
  init() {
    if (!this.initialized) {
      super.init();
      this.classList.add("i-tree-view");
      this.editable = this.getAttribute("editable", true);
      this.dataSource = this.attrs["data"];
      const activeAttr = this.attrs["activeItem"];
      activeAttr && (this.activeItem = activeAttr);
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
TreeView = __decorateClass([
  customElements2("i-tree-view")
], TreeView);
var beforeExpandEvent = new Event("beforeExpand");
var TreeNode = class extends Control {
  constructor(parent, options) {
    super(parent, options);
    this._nodeLevel = 0;
    this._editable = false;
    options && (this.nodeData = options);
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    if (this._captionElm)
      this._captionElm.innerHTML = value;
  }
  get collapsible() {
    return this._collapsible;
  }
  set collapsible(value) {
    if (typeof value === "boolean") {
      this._collapsible = value;
    } else {
      this._collapsible = true;
    }
  }
  get expanded() {
    return this._expanded;
  }
  set expanded(value) {
    if (typeof value === "boolean") {
      this._expanded = value;
    } else {
      this._expanded = false;
    }
  }
  get active() {
    return this._active;
  }
  set active(value) {
    if (typeof value === "boolean") {
      this._active = value;
      this.active ? this.classList.add("active") : this.classList.remove("active");
    } else {
      this._active = false;
      this.classList.remove("active");
    }
  }
  get isLazyLoad() {
    return this._isLazyLoad;
  }
  set isLazyLoad(value) {
    this._isLazyLoad = value;
  }
  get nodeLevel() {
    return this._nodeLevel || 0;
  }
  set nodeLevel(value) {
    this._nodeLevel = value;
    if (this._wrapperElm)
      this._wrapperElm.style.paddingLeft = `${this.nodeLevel}em`;
  }
  get order() {
    return this._order;
  }
  set order(value) {
    this._order = value;
  }
  get editable() {
    return this._editable;
  }
  set editable(value) {
    this._editable = value;
    if (value)
      this.addEventListener("dblclick", this.handleEdit.bind(this));
    else
      this.removeEventListener("dblclick", this.handleEdit.bind(this));
  }
  get rootParent() {
    return this.closest("i-tree-view");
  }
  handleLazyLoad() {
    const fn = this.rootParent.onLazyLoad;
    if (fn && typeof fn === "function")
      fn(this.rootParent, this);
  }
  handleEdit(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const captionInput = this.createElement("input");
    captionInput.value = this.caption;
    captionInput.classList.add("text-input");
    this._captionElm.innerHTML = "";
    this._captionElm.appendChild(captionInput);
    captionInput.focus();
    this.click();
    captionInput.addEventListener("blur", (event2) => {
      event2.preventDefault();
      const newValue = captionInput.value;
      this.handleChange(this, this.caption, newValue);
      this._captionElm.innerHTML = "";
      this._captionElm.textContent = newValue;
    });
  }
  edit() {
    this.editable = true;
  }
  handleActive(source, event) {
    event.stopPropagation();
    const fn = this.rootParent.onActiveChange;
    if (fn && typeof fn === "function")
      fn(this.rootParent, this.rootParent.activeItem);
    this.rootParent.activeItem = this;
  }
  handleChange(target, oldValue, newValue) {
    const fn = this.rootParent.onChange;
    if (fn && typeof fn === "function")
      fn(this.rootParent, target, oldValue, newValue);
  }
  handleContextMenu() {
    const fn = this.rootParent.onContextMenu;
    if (fn && typeof fn === "function")
      fn(this.rootParent, this);
  }
  handleMouseEnter() {
    const fn = this.rootParent.onMouseEnterNode;
    if (fn && typeof fn === "function")
      fn(this.rootParent, this);
  }
  handleMouseLeave() {
    const fn = this.rootParent.onMouseLeaveNode;
    if (fn && typeof fn === "function")
      fn(this.rootParent, this);
  }
  registerEvents() {
    this.onClick = this.handleActive.bind(this);
    this.addEventListener("contextmenu", () => this.handleContextMenu());
    this.addEventListener("mouseenter", () => this.handleMouseEnter());
    this.addEventListener("mouseleave", () => this.handleMouseLeave());
    this.addEventListener("beforeExpand", (event) => this.handleLazyLoad());
  }
  appendNode(childNode) {
    if (!this._childNodeElm)
      this.initChildNodeElm();
    this._childNodeElm.appendChild(childNode);
    if (!this.nodeData.children)
      this.nodeData.children = [];
    this.nodeData.children.push(childNode.nodeData);
  }
  removeNode(node) {
    const children = node.nodeData.children || [];
    if (children.length) {
      const index = children.findIndex((item) => item.order === node.order);
      index !== -1 && children.splice(index, 1);
    }
    node.remove();
  }
  initChildNodeElm() {
    this.classList.add("has-children");
    this._expandElm = this.createElement("input", this._wrapperElm);
    this._expandElm.type = "checkbox";
    if (this.expanded)
      this._expandElm.checked = true;
    if (this._iconElm)
      this._wrapperElm.insertBefore(this._expandElm, this._iconElm);
    else
      this._wrapperElm.insertBefore(this._expandElm, this._captionElm);
    this._childNodeElm = this.createElement("div", this);
    this._childNodeElm.classList.add("i-tree-node_children");
  }
  init() {
    var _a, _b;
    if (!this._captionElm) {
      let caption = this.getAttribute("caption", true);
      let iconAttr = this.attrs["icon"] || this.getAttribute("icon", true);
      let imageAttr = this.attrs["image"] || this.getAttribute("image", true);
      let collapsible = this.getAttribute("collapsible", true);
      let expanded = this.getAttribute("expanded", true);
      let active = this.getAttribute("active", true);
      let isLazyLoad = this.getAttribute("isLazyLoad", true);
      let orderAttr = this.getAttribute("order", true);
      this.collapsible = collapsible;
      this.expanded = expanded;
      this.active = active;
      this.isLazyLoad = isLazyLoad;
      this.order = orderAttr;
      if (this.collapsible) {
        this.onclick = (event) => {
          event.stopPropagation();
          if (this._expandElm) {
            this._expandElm.checked = !this._expandElm.checked;
            if (this._expandElm.checked)
              this.classList.add("is-checked");
            else
              this.classList.remove("is-checked");
          }
          if (this.isLazyLoad)
            this.dispatchEvent(beforeExpandEvent);
        };
      }
      this._wrapperElm = this.createElement("div", this);
      this._wrapperElm.classList.add("i-tree-node_content");
      this._captionElm = this.createElement("label", this._wrapperElm);
      this._captionElm.classList.add("i-tree-node_label");
      this.caption = caption;
      const defaultIcon = new Icon(this, {
        name: "caret-right",
        fill: Theme21.text.secondary,
        width: 12,
        height: 12
      });
      this._iconElm = iconAttr || imageAttr || defaultIcon;
      this.classList.add("i-tree-node");
      this._iconElm.classList.add("i-tree-node_icon");
      this._captionElm.appendChild(this._iconElm);
      this._wrapperElm.insertBefore(this._iconElm, this._captionElm);
      if ((_b = (_a = this.nodeData) == null ? void 0 : _a.children) == null ? void 0 : _b.length)
        this.initChildNodeElm();
      this.registerEvents();
    }
    super.init();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
TreeNode = __decorateClass([
  customElements2("i-tree-node")
], TreeNode);

// packages/search/src/style/search.css.ts
var Theme22 = theme_exports.ThemeVars;
cssRule("i-search", {
  fontFamily: Theme22.typography.fontFamily,
  fontSize: Theme22.typography.fontSize,
  position: "relative",
  $nest: {
    ".search": {
      position: "relative",
      display: "inline-block",
      direction: "ltr"
    },
    "i-icon": {
      position: "absolute",
      top: "50%",
      left: "10px",
      display: "inline-block",
      width: "18px",
      height: "18px",
      transform: "translateY(-50%)"
    },
    input: {
      position: "relative",
      verticalAlign: "top",
      height: "2.5rem",
      background: "none",
      border: "1px solid #c5d1db",
      color: "#28333d",
      fontWeight: 400,
      fontSize: "15px",
      borderRadius: "20px",
      lineHeight: "20px",
      outline: "none",
      transition: "width .5s ease",
      width: "170px",
      padding: "12px 8px 8px 38px",
      $nest: {
        "&::placeholder": {
          color: "#28333d",
          opacity: 1
        },
        "&:focus": {
          width: "220px"
        }
      }
    },
    ".dropdown": {
      display: "none",
      position: "absolute",
      top: "100%",
      left: "auto",
      right: 0,
      zIndex: 100,
      fontSize: "14px",
      lineHeight: "1.2em",
      minWidth: "600px",
      padding: "1rem",
      margin: "6px 0 0",
      border: "none",
      borderRadius: "1rem",
      boxShadow: "0 4px 16px rgb(0 0 0 / 25%)",
      background: "#fff",
      $nest: {
        "&.show": {
          display: "block"
        }
      }
    },
    ".suggestion": {
      display: "table",
      width: "100%",
      whiteSpace: "normal",
      border: "none",
      color: "#333",
      cursor: "pointer",
      overflow: "hidden",
      $nest: {
        ".header": {
          display: "block",
          fontSize: "14px",
          fontWeight: 400,
          background: "#ebeff3",
          color: "#28333d",
          borderRadius: "1rem",
          padding: "5px 10px"
        },
        ".column": {
          display: "table-cell",
          borderRight: "1px solid rgba(57,57,57,.3)",
          color: "#555",
          overflow: "hidden",
          padding: "5px 7px 5px 5px",
          textAlign: "right",
          textOverflow: "ellipsis",
          verticalAlign: "top",
          width: "135px",
          maxWidth: "135px",
          minWidth: "135px"
        },
        ".content": {
          display: "table-cell",
          padding: "5px 10px",
          width: "100%"
        },
        ".content-text": {
          display: "block",
          fontWeight: 600
        },
        ".content-paragraph-text": {
          display: "-webkit-box",
          "-webkit-line-clamp": 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        },
        ".highlight": {
          color: "#55f",
          padding: 0,
          background: "none",
          fontWeight: 600
        }
      }
    }
  }
});

// packages/search/src/search.ts
var Search = class extends Control {
  constructor() {
    super(...arguments);
    this.isDropdownShown = false;
    this._keyword = "";
  }
  get keyword() {
    return this._keyword;
  }
  set keyword(value) {
    this._keyword = value;
  }
  buildIndex(documents, fields, storeFields) {
    this.miniSearch = new this.MiniSearch({
      fields,
      storeFields,
      searchOptions: {
        fuzzy: 0.2
      }
    });
    this.miniSearch.addAll(documents);
  }
  search(keyword) {
    return this.miniSearch.search(keyword).slice(0, 5);
  }
  autoSuggest(keyword) {
    return this.miniSearch.autoSuggest(keyword);
  }
  renderSuggestion(data) {
    if (data.length) {
      if (!this.dropdownElm) {
        this.dropdownElm = this.createElement("span", this.wrapperElm);
        this.dropdownElm.classList.add("dropdown", "dataset");
      }
      this.dropdownElm.innerHTML = "";
      const suggestionElm = this.createElement("div", this.dropdownElm);
      suggestionElm.classList.add("suggestion");
      data.map((row) => {
        const suggestionHeader = this.createElement("div", suggestionElm);
        suggestionHeader.classList.add("header");
        suggestionHeader.innerText = row[0].title;
        row.map((item) => {
          const suggestionWrapper = this.createElement("div", suggestionElm);
          suggestionWrapper.classList.add("wrapper");
          suggestionWrapper.addEventListener("click", () => {
            window.location.hash = item.slug;
            this.dropdownElm.classList.remove("show");
          });
          const suggestionColumn = this.createElement("div", suggestionWrapper);
          suggestionColumn.classList.add("column");
          const suggestionColumnText = this.createElement("span", suggestionColumn);
          suggestionColumnText.classList.add("column-text");
          suggestionColumnText.innerHTML = item.subTitle;
          const suggestionContent = this.createElement("div", suggestionWrapper);
          suggestionContent.classList.add("content");
          const suggestionContentText = this.createElement("span", suggestionContent);
          suggestionContentText.classList.add("content-text");
          suggestionContentText.innerHTML = item.subTitle;
          const suggestionParagraphText = this.createElement("span", suggestionContent);
          suggestionParagraphText.classList.add("content-paragraph-text");
          const rgxp = new RegExp("(\\S*.{0,10})?(" + Object.keys(item.match)[0] + ")(.{0,10}\\S*)?", "ig");
          const results = [];
          item.paragraph.replace(rgxp, function(match, $1, $2, $3) {
            results.push(($1 ? "\u2026" + $1 : "") + "<b class='highlight'>" + $2 + "</b>" + ($3 ? $3 + "\u2026" : ""));
          });
          suggestionParagraphText.innerHTML = results.join(" ");
        });
      });
      this.dropdownElm.classList.add("show");
    }
  }
  async initMiniSearch() {
    return new Promise((resolve, reject) => {
      try {
        RequireJS.require([`${LibPath}lib/minisearch/index.min.js`], (minisearch) => {
          this.MiniSearch = minisearch;
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async init() {
    if (!this.wrapperElm) {
      this.wrapperElm = this.createElement("span", this);
      this.wrapperElm.classList.add("search", "autocomplete");
      const icon = new Icon(this, { name: "search", fill: "#55f" });
      this.wrapperElm.appendChild(icon);
      this.inputElm = this.createElement("input", this.wrapperElm);
      this.inputElm.setAttribute("placeholder", "Search");
      this.inputElm.setAttribute("autocomplete", "off");
      this.inputElm.addEventListener("input", () => {
        const input = document.querySelector("i-search input");
        const results = this.search(input.value);
        const groupResult = Object.values(results.reduce((acc, result) => {
          acc[result.id] = acc[result.id] || [];
          acc[result.id].push(result);
          return acc;
        }, Object.create(null)));
        this.renderSuggestion(groupResult);
      });
      await this.initMiniSearch();
      document.addEventListener("click", (e) => {
        if (!this._enabled)
          return false;
        if (!this.contains(e.target)) {
          if (this.dropdownElm)
            this.dropdownElm.classList.remove("show");
        }
      });
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    await component.init();
    return component;
  }
};
Search = __decorateClass([
  customElements2("i-search")
], Search);

// packages/slot/src/slot.ts
var Slot = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  init() {
    super.init();
  }
};
Slot = __decorateClass([
  customElements2("i-slot")
], Slot);

// packages/switch/src/style/switch.css.ts
var Theme23 = theme_exports.ThemeVars;
cssRule("i-switch", {
  display: "block",
  fontFamily: Theme23.typography.fontFamily,
  fontSize: Theme23.typography.fontSize,
  $nest: {
    ".wrapper": {
      width: "48px",
      height: "22px",
      position: "relative",
      display: "inline-flex",
      flexShrink: 0,
      overflow: "hidden",
      zIndex: 0,
      verticalAlign: "middle"
    },
    ".switch-base": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      outline: 0,
      border: 0,
      margin: 0,
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      textDecoration: "none",
      padding: "1px",
      borderRadius: "50%",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      color: "#fff",
      transition: "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      $nest: {
        "&.checked": {
          color: "#1976d2",
          transform: "translateX(26px)",
          $nest: {
            ".thumb:before": {
              backgroundImage: "var(--checked-background)"
            },
            ".thumb-text:before": {
              content: "var(--thumb-checked-text)"
            },
            "+.track": {
              backgroundColor: "#1976d2",
              $nest: {
                "&::before": {
                  opacity: 1
                },
                "&::after": {
                  opacity: 0
                }
              }
            }
          }
        }
      }
    },
    input: {
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "300%",
      height: "100%",
      opacity: 0,
      margin: 0,
      padding: 0,
      cursor: "inherit",
      zIndex: 1
    },
    ".thumb": {
      width: "16px",
      height: "16px",
      margin: "2px",
      backgroundColor: "currentColor",
      borderRadius: "50%",
      boxShadow: "none"
    },
    ".thumb:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "14px",
      backgroundImage: "var(--background)"
    },
    ".thumb.thumb-text:before": {
      content: "var(--thumb-text)",
      position: "absolute",
      width: "inherit",
      height: "inherit",
      top: "auto",
      left: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff"
    },
    ".track": {
      width: "100%",
      height: "100%",
      zIndex: -1,
      borderRadius: "11px",
      backgroundColor: "#000",
      transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      $nest: {
        "&::before": {
          content: "var(--checked-text)",
          position: "absolute",
          left: "4px",
          top: "calc(50% - 0.6px)",
          transform: "translateY(-50%)",
          fontSize: "10px",
          color: "white",
          opacity: 0
        },
        "&::after": {
          content: "var(--text)",
          position: "absolute",
          right: "6px",
          top: "calc(50% - 0.6px)",
          transform: "translateY(-50%)",
          fontSize: "10px",
          color: "white",
          opacity: 1
        }
      }
    }
  }
});

// packages/switch/src/switch.ts
var Switch = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (this._checked === value)
      return;
    this._checked = value;
    this._checked ? this.switchBaseElm.classList.add("checked") : this.switchBaseElm.classList.remove("checked");
    if (this._checked) {
      if (this.checkedThumbColor)
        this.switchBaseElm.style.color = this.checkedThumbColor;
      if (this.checkedTrackColor)
        this.trackElm.style.backgroundColor = this.checkedTrackColor;
    } else {
      if (this.uncheckedThumbColor)
        this.switchBaseElm.style.color = this.uncheckedThumbColor;
      if (this.uncheckedTrackColor)
        this.trackElm.style.backgroundColor = this.uncheckedTrackColor;
    }
  }
  init() {
    if (!this.wrapperElm) {
      const checkedThumbIcon = this.getAttribute("checkedThumbIcon", true);
      const uncheckedThumbIcon = this.getAttribute("uncheckedThumbIcon", true);
      this.checkedThumbColor = this.getAttribute("checkedThumbColor", true);
      this.uncheckedThumbColor = this.getAttribute("uncheckedThumbColor", true);
      const checkedTrackColor = this.getAttribute("checkedTrackColor", true);
      const uncheckedTrackColor = this.getAttribute("uncheckedTrackColor", true);
      const checkedText = this.getAttribute("checkedText", true);
      const uncheckedText = this.getAttribute("uncheckedText", true);
      const checkedThumbText = this.getAttribute("checkedThumbText", true);
      const uncheckedThumbText = this.getAttribute("uncheckedThumbText", true);
      this.wrapperElm = this.createElement("div", this);
      this.wrapperElm.classList.add("wrapper");
      this.switchBaseElm = this.createElement("div");
      this.switchBaseElm.classList.add("switch-base");
      this.wrapperElm.appendChild(this.switchBaseElm);
      this.trackElm = this.createElement("div");
      this.trackElm.classList.add("track");
      this.wrapperElm.appendChild(this.trackElm);
      if (uncheckedText) {
        this.trackElm.style.setProperty("--text", `"${uncheckedText}"`);
      }
      if (checkedText) {
        this.trackElm.style.setProperty("--checked-text", `"${checkedText}"`);
      }
      this.inputElm = this.createElement("input");
      this.inputElm.setAttribute("type", "checkbox");
      this.switchBaseElm.appendChild(this.inputElm);
      this.thumbElm = this.createElement("div");
      this.thumbElm.classList.add("thumb");
      this.switchBaseElm.appendChild(this.thumbElm);
      if (uncheckedThumbIcon) {
        this.thumbElm.style.setProperty("--background", `url(${encodeURI(uncheckedThumbIcon)})`);
      }
      if (checkedThumbIcon) {
        this.thumbElm.style.setProperty("--checked-background", `url(${encodeURI(checkedThumbIcon)})`);
      }
      if (checkedThumbText || uncheckedThumbText) {
        this.thumbElm.classList.add("thumb-text");
        this.thumbElm.style.setProperty("--thumb-text", `'${checkedThumbText || ""}'`);
        this.thumbElm.style.setProperty("--thumb-checked-text", `'${uncheckedThumbText || ""}'`);
      }
      this.rippleElm = this.createElement("div");
      this.rippleElm.classList.add("ripple");
      this.switchBaseElm.appendChild(this.rippleElm);
      this.switchBaseElm.style.color = this.uncheckedThumbColor;
      this.trackElm.style.backgroundColor = uncheckedTrackColor;
      this.checked = this.getAttribute("checked", true) || false;
      this.wrapperElm.addEventListener("click", () => {
        if (!this.onClick)
          this.checked = !this.checked;
      });
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Switch = __decorateClass([
  customElements2("i-switch")
], Switch);

// packages/modal/src/style/modal.css.ts
var Theme24 = theme_exports.ThemeVars;
var wrapperStyle = style({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(12, 18, 52, 0.7)",
  opacity: 0,
  visibility: "hidden",
  transform: "scale(1.1)",
  transition: "visibility 0s linear .25s,opacity .25s 0s,transform .25s",
  zIndex: 10,
  overflow: "auto"
});
var visibleStyle = style({
  opacity: "1",
  visibility: "visible",
  transform: "scale(1)",
  transition: "visibility 0s linear 0s,opacity .25s 0s,transform .25s"
});
var modalStyle = style({
  fontFamily: "Helvetica",
  fontSize: "14px",
  padding: "10px 10px 5px 10px",
  backgroundColor: Theme24.background.modal,
  position: "relative",
  margin: "100px auto 30px",
  borderRadius: "2px",
  minWidth: "300px"
});
var titleStyle = style({
  fontSize: "18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  $nest: {
    "span": {
      color: Theme24.colors.primary.main
    },
    "i-icon": {
      display: "inline-block",
      cursor: "pointer"
    }
  }
});

// packages/modal/src/modal.ts
var Theme25 = theme_exports.ThemeVars;
var showEvent = new Event("show");
var Modal = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      showClose: true
    });
  }
  get visible() {
    return this.wrapperDiv.classList.contains(visibleStyle);
  }
  set visible(value) {
    if (value) {
      this.wrapperDiv.classList.add(visibleStyle);
      this.dispatchEvent(showEvent);
      document.body.style.overflow = "hidden";
    } else {
      this.wrapperDiv.classList.remove(visibleStyle);
      document.body.style.overflow = "overlay";
      if (this.onClose)
        this.onClose(this);
    }
  }
  get onShow() {
    return this._onShow;
  }
  set onShow(callback) {
    this._onShow = callback;
  }
  get title() {
    const titleElm = this.titleSpan.querySelector("span");
    return (titleElm == null ? void 0 : titleElm.innerHTML) || "";
  }
  set title(value) {
    const titleElm = this.titleSpan.querySelector("span");
    titleElm && (titleElm.innerHTML = value || "");
  }
  set width(value) {
    this.setPosition("width", value);
    if (this.modalDiv)
      this.modalDiv.style.width = `${value}`;
  }
  _handleOnShow(event) {
    if (this.enabled && this._onShow) {
      event.preventDefault();
      this._onShow(this, event);
    }
  }
  init() {
    if (!this.wrapperDiv) {
      this.wrapperDiv = this.createElement("div", this);
      this.wrapperDiv.classList.add(wrapperStyle);
      this.modalDiv = this.createElement("div", this.wrapperDiv);
      this.titleSpan = this.createElement("div", this.modalDiv);
      this.titleSpan.classList.add(titleStyle, "i-modal_header");
      const titleElm = this.createElement("span", this.titleSpan);
      this.title = this.getAttribute("title", true);
      const showCloseAttr = this.getAttribute("showClose", true);
      const closeIconAttr = this.getAttribute("closeIcon", true);
      if (showCloseAttr) {
        const closeIcon = new Icon();
        closeIcon.init();
        closeIcon.fill = Theme25.colors.secondary.main;
        closeIcon.name = closeIconAttr || "times";
        closeIcon.width = 20;
        closeIcon.height = 20;
        closeIcon.classList.add("i-modal-close");
        this.titleSpan.appendChild(closeIcon);
        closeIcon.onClick = () => this.visible = false;
      }
      while (this.childNodes.length > 1) {
        this.modalDiv.appendChild(this.childNodes[0]);
      }
      this.modalDiv.classList.add(modalStyle);
      this.modalDiv.classList.add("modal");
      this.addEventListener("show", this._handleOnShow.bind(this));
      this.wrapperDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!this.modalDiv.contains(e.target) && this.visible)
          this.visible = false;
      });
      window.addEventListener("keydown", (event) => {
        if (!this.visible)
          return;
        if (event.key === "Escape") {
          this.visible = false;
        }
      });
      super.init();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.maxWidth)
      this.modalDiv.style.width = this.maxWidth;
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Modal = __decorateClass([
  customElements2("i-modal")
], Modal);

// packages/divider/src/style/divider.css.ts
var Theme26 = theme_exports.ThemeVars;
cssRule("i-divider", {
  display: "inline-block",
  $nest: {
    ".i-divider": {
      position: "relative"
    },
    ".i-divider_horizontal": {
      display: "block",
      borderTopColor: Theme26.divider,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      width: "100%",
      height: 1
    },
    ".i-divider_vertical": {
      display: "inline-block",
      borderLeftColor: Theme26.divider,
      borderLeftStyle: "solid",
      borderLeftWidth: 1,
      width: 1,
      height: "100%"
    },
    ".i-divider_text": {
      position: "absolute",
      color: Theme26.text.primary,
      fontFamily: Theme26.typography.fontFamily,
      fontSize: Theme26.typography.fontSize,
      display: "inline-flex",
      padding: "0 15px",
      backgroundColor: "white"
    },
    ".i-divider_vertical .i-divider_text": {
      top: 0
    },
    ".i-divider_horizontal .i-divider_text": {
      top: "-50%"
    },
    ".i-divider_horizontal .is-left": {
      left: 0,
      transform: "translateY(-50%)"
    },
    ".i-divider_horizontal .is-right": {
      right: 0,
      transform: "translateY(-50%)"
    },
    ".i-divider_horizontal .is-center": {
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  }
});

// packages/divider/src/divider.ts
var defaultValue = {
  direction: "horizontal",
  borderStyle: "solid",
  contentPosition: "center"
};
var defaultHWidth = 100;
var defaultVHeight = 20;
var Divider = class extends Control {
  constructor(parent, options) {
    super(parent, options, __spreadValues({}, defaultValue));
  }
  set borderStyle(value) {
    this.wrapperElm.style.setProperty(`border-${this.borderTypePos}-style`, value);
  }
  get borderStyle() {
    return this.wrapperElm.style.getPropertyValue(`border-${this.borderTypePos}-style`);
  }
  set borderRadius(value) {
    this._borderRadius = value;
    let radius = typeof value === "number" ? value + "px" : value;
    this.wrapperElm.style.borderRadius = radius;
  }
  get borderRadius() {
    return this._borderRadius;
  }
  set fill(color) {
    this.wrapperElm.style.setProperty(`border-${this.borderTypePos}-color`, color);
  }
  get fill() {
    return this.wrapperElm.style.getPropertyValue(`border-${this.borderTypePos}-color`);
  }
  set direction(value) {
    this._direction = value;
    this.wrapperElm.classList.add(`i-divider_${value}`);
  }
  get direction() {
    return this._direction;
  }
  get height() {
    const defaultHeight = this.direction === "horizontal" ? 1 : this.offsetHeight;
    return !isNaN(this._height) ? this._height : defaultHeight;
  }
  set height(value) {
    this.setPosition("height", value);
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this.setPosition("width", value);
  }
  get borderTypePos() {
    return this.direction === "horizontal" ? "top" : "left";
  }
  connectedCallback() {
    super.connectedCallback();
    this.childNodes.forEach((node) => {
      if (this.wrapperElm !== node && this.contentElm)
        this.contentElm.appendChild(node);
    });
  }
  init() {
    super.init();
    if (!this.wrapperElm) {
      if (this.hasChildNodes()) {
        this.contentElm = this.createElement("div");
        this.contentElm.classList.add("i-divider_text");
        const contentPosAttr = this.getAttribute("contentPosition");
        this.contentElm.classList.add(`is-${contentPosAttr}`);
      }
      this.wrapperElm = this.createElement("div", this);
      this.wrapperElm.classList.add("i-divider");
      this.contentElm && this.wrapperElm.appendChild(this.contentElm);
      this.direction = this.getAttribute("direction", true);
      this.borderStyle = this.getAttribute("borderStyle", true);
      this.borderRadius = this.getAttribute("borderRadius", true);
      const borderColor = this.getAttribute("fill");
      this.fill = borderColor;
      if (this.direction === "horizontal") {
        !this.width && (this.width = defaultHWidth);
        this.height && (this.wrapperElm.style.borderTopWidth = this.height + "px");
      } else {
        !this.height && (this.height = defaultVHeight);
        this.width && (this.wrapperElm.style.borderLeftWidth = this.width + "px");
      }
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Divider = __decorateClass([
  customElements2("i-divider")
], Divider);

// packages/clipboard/src/style/clipboard.css.ts
var Theme27 = theme_exports.ThemeVars;
cssRule("i-clipboard", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: Theme27.typography.fontFamily,
  fontSize: Theme27.typography.fontSize,
  cursor: "pointer",
  position: "relative",
  outline: "none",
  "$nest": {
    "&.i-clipboard_border": {
      width: 30,
      height: 30,
      padding: 5,
      border: `1px solid ${Theme27.divider}`,
      borderRadius: "50%",
      transition: "all 0.3s ease 0s",
      $nest: {
        ":hover": {
          transitionDuration: "300ms"
        }
      }
    },
    ".i-clipboard_msg": {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      transition: "all .5s ease-in",
      maxWidth: "500px",
      minWidth: 30
    },
    ".i-clipboard_msg-cnt": {
      color: Theme27.text.primary,
      wordWrap: "break-word",
      backgroundColor: "rgba(0,0,0,.75)",
      borderRadius: 4,
      boxShadow: "0 2px 8px rgb(0 0 0 / 15%)",
      display: "none"
    }
  }
});

// packages/clipboard/src/clipboard.ts
var defaultValues = {
  hasBorder: true,
  succeedCaption: "Succeed!",
  failedCaption: "Failed!"
};
var Clipboard = class extends Control {
  constructor(parent, options) {
    super(parent, options, __spreadValues({}, defaultValues));
    this.isCopying = false;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value || "";
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    if (!this.iconElm)
      this._createIcon();
    this.iconElm.name = value;
  }
  _createIcon() {
    this.iconElm = new Icon();
    this.iconElm.init();
    this.iconElm.fill = ThemeVars.text.primary;
    this.iconElm.width = 16;
    this.iconElm.height = 16;
    this.appendChild(this.iconElm);
  }
  updateIcon(name, color) {
    if (this.iconElm) {
      this.iconElm.name = name;
      this.iconElm.fill = color;
    }
  }
  get succeedCaption() {
    return this._succeedCaption;
  }
  set succeedCaption(value) {
    this._succeedCaption = value || "";
  }
  get failedCaption() {
    return this._failedCaption;
  }
  set failedCaption(value) {
    this._failedCaption = value || "";
  }
  get hasBorder() {
    return this._hasBorder;
  }
  set hasBorder(value) {
    this._hasBorder = value;
    if (this._hasBorder)
      this.classList.add("i-clipboard_border");
    else
      this.classList.remove("i-clipboard_border");
  }
  set succeedIcon(value) {
    this._succeedIcon = value;
  }
  get succeedIcon() {
    return this._succeedIcon;
  }
  async _handleCopy(source, event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("click in clipboard");
    try {
      const result = await this._setCopy();
      this._showMessage(result);
    } catch (e) {
      this._showMessage(false);
    }
  }
  async _setCopy() {
    const value = this.value;
    if (!value)
      return false;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value);
        return true;
      } else {
        const input = document.createElement("input");
        input.value = this.value;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus();
        input.select();
        const result = document.execCommand("copy");
        document.body.removeChild(input);
        return result;
      }
    } catch (err) {
      console.log("debug: copy", err);
      return false;
    }
  }
  _showMessage(result) {
    result ? this.succeedIcon && this.updateIcon(this.succeedIcon, "green") : this.updateIcon("times", "red");
    if (!result)
      this.setAttribute("data-tooltip", this.failedCaption);
    this.updateIcon(this._copyIcon, ThemeVars.text.primary);
  }
  disconnectCallback() {
    if (this.timer)
      clearTimeout(this.timer);
  }
  init() {
    if (!this.initialized) {
      super.init();
      const iconAttr = this.getAttribute("icon", true) || "copy";
      iconAttr && (this._copyIcon = this.icon = iconAttr);
      const valueAttr = this.getAttribute("value", true);
      valueAttr && (this.value = valueAttr);
      const borderAttr = this.getAttribute("hasBorder", true);
      borderAttr && (this.hasBorder = borderAttr);
      const msgElm = this.createElement("div", this);
      msgElm.classList.add("i-clipboard_msg");
      this.lbElm = this.createElement("span");
      this.lbElm.classList.add("i-clipboard_msg-cnt");
      this.lbElm.textContent = this.succeedCaption;
      msgElm.appendChild(this.lbElm);
      const succedAttr = this.getAttribute("succeedCaption", true);
      succedAttr && (this.succeedCaption = succedAttr);
      const failedAttr = this.getAttribute("failedCaption", true);
      failedAttr && (this.failedCaption = failedAttr);
      this.succeedIcon = this.getAttribute("succeedIcon", true);
      this.setAttribute("data-tooltip", this.succeedCaption);
      this.setAttribute("data-trigger", "click");
      this.onClick = this._handleCopy.bind(this);
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("value")
], Clipboard.prototype, "_value", 2);
Clipboard = __decorateClass([
  customElements2("i-clipboard")
], Clipboard);

// packages/collapse/src/style/collapse.css.ts
var Theme28 = theme_exports.ThemeVars;
cssRule("i-collapse", {
  fontFamily: Theme28.typography.fontFamily,
  fontSize: Theme28.typography.fontSize,
  display: "block",
  "$nest": {
    "*": {
      boxSizing: "border-box"
    },
    "&.i-collapse--border": {
      borderBottom: `1px solid ${Theme28.divider}`
    },
    "i-collapse-summary": {
      cursor: "pointer",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "1rem",
      justifyContent: "space-between",
      outline: 0,
      backgroundColor: Theme28.background.paper,
      position: "relative"
    },
    ".i-collapse-details": {
      height: "auto",
      whiteSpace: "normal",
      padding: 0,
      display: "block",
      maxHeight: 0,
      overflow: "hidden",
      transition: "max-height 0.3s ease-out"
    },
    "i-collapse-details": {
      padding: "1rem",
      display: "block",
      maxWidth: "100%",
      backgroundColor: Theme28.background.paper
    },
    "&.is-active .i-collapse-details": {
      transition: "max-height 0.3s ease-in"
    },
    ".collapse-icon": {
      transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    "&.is-active .collapse-icon": {
      transform: "rotate(90deg)",
      transitionDuration: "300ms"
    },
    "&.disabled i-collapse-summary": {
      backgroundColor: Theme28.background.default,
      cursor: "default",
      opacity: 0.9
    }
  }
});

// packages/collapse/src/collapse.ts
var defaultValues2 = {
  expanded: false,
  enabled: true,
  hasBorder: false
};
var Collapse = class extends Control {
  constructor(parent, options) {
    super(parent, options, __spreadValues({}, defaultValues2));
  }
  get expanded() {
    return this._expanded;
  }
  set expanded(value) {
    this._expanded = value;
    this.setAttribute("expanded", `${value}`);
    if (value === true) {
      this.classList.add("is-active");
      this.wrapperElm && (this.wrapperElm.style.maxHeight = this.wrapperElm.scrollHeight ? this.wrapperElm.scrollHeight + "px" : "100%");
    } else {
      this.classList.remove("is-active");
      this.wrapperElm && (this.wrapperElm.style.maxHeight = "0px");
    }
    const summaryElm = this.querySelector("i-collapse-summary");
    if (summaryElm)
      summaryElm.updateIcon();
  }
  get hasBorder() {
    return this._hasBorder;
  }
  set hasBorder(value) {
    this._hasBorder = value;
    if (value)
      this.classList.add("i-collapse--border");
    else
      this.classList.remove("i-collapse--border");
  }
  _handleChange(source, event) {
    if (!this.enabled)
      return;
    const expanded = this.expanded;
    this.expanded = !expanded;
    if (this.onChange)
      this.onChange(this, this.expanded);
  }
  init() {
    if (!this.wrapperElm) {
      super.init();
      let childNodes = [];
      for (let i = 0; i < this.childNodes.length; i++)
        childNodes.push(this.childNodes[i]);
      if (childNodes.length) {
        this.wrapperElm = this.createElement("div", this);
        this.wrapperElm.style.backgroundColor = this.color;
        this.wrapperElm.classList.add("i-collapse-details");
        childNodes.forEach((node) => {
          if (node.nodeName === "I-COLLAPSE-SUMMARY") {
            node.addEventListener("click", this._handleChange.bind(this));
          } else {
            this.wrapperElm.appendChild(node);
          }
        });
      }
      this.expanded = this.getAttribute("expanded");
      this.hasBorder = this.getAttribute("hasBorder", true);
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("expanded")
], Collapse.prototype, "onChange", 2);
Collapse = __decorateClass([
  customElements2("i-collapse")
], Collapse);
var CollapseSummary = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    this.updateIcon();
  }
  updateIcon() {
    if (!this.icon)
      return;
    if (!this.iconElm)
      this._createIcon();
    if (typeof this.icon === "string") {
      this.iconElm.name = this.icon;
    } else {
      const parent = this.closest("i-collapse.is-active");
      this.iconElm.name = parent ? this.icon.active : this.icon.inactive;
    }
  }
  _createIcon() {
    this.iconElm = new Icon();
    this.iconElm.init();
    this.iconElm.fill = ThemeVars.text.primary;
    this.iconElm.width = 16;
    this.iconElm.height = 16;
    this.iconElm.classList.add("collapse-icon");
    this.appendChild(this.iconElm);
  }
  init() {
    super.init();
    if (this.attrs.icon)
      this.icon = this.attrs.icon;
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
CollapseSummary = __decorateClass([
  customElements2("i-collapse-summary")
], CollapseSummary);
var CollapseDetails = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  init() {
    super.init();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
CollapseDetails = __decorateClass([
  customElements2("i-collapse-details")
], CollapseDetails);

// packages/chart/src/lineChart.ts
var LineChart = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
    this.drawChart();
  }
  get dataObj() {
    try {
      return JSON.parse(this.datas);
    } catch (e) {
      return null;
    }
  }
  showLoading() {
    this._chartIns && this._chartIns.showLoading();
  }
  drawChart() {
    if (this._chartIns) {
      this.updateChartOptions();
      return;
    }
    RequireJS.require([`${LibPath}lib/echarts/echarts.min.js`], (echart) => {
      const chartDom = document.getElementById(`main-${this._timeCreated}`);
      if (chartDom) {
        this._chartIns = echart.init(chartDom);
        this.updateChartOptions();
      }
    });
  }
  updateChartOptions() {
    this._chartIns.hideLoading();
    this.dataObj && this._chartIns.setOption(this.dataObj);
  }
  init() {
    this._timeCreated = Date.now();
    super.init();
    this.style.display = "inline-block";
    let captionDiv = this.createElement("div", this);
    captionDiv.id = `main-${this._timeCreated}`;
    captionDiv.style.display = "inline-block";
    captionDiv.style.height = "100%";
    captionDiv.style.width = "100%";
    this.datas = this.getAttribute("data", true);
  }
};
LineChart = __decorateClass([
  customElements2("i-line-chart")
], LineChart);

// packages/chart/src/barChart.ts
var BarChart = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
    this.drawChart();
  }
  get dataObj() {
    try {
      return JSON.parse(this.datas);
    } catch (e) {
      return null;
    }
  }
  showLoading() {
    this._chartIns && this._chartIns.showLoading();
  }
  drawChart() {
    if (this._chartIns) {
      this.updateChartOptions();
      return;
    }
    RequireJS.require([`${LibPath}lib/echarts/echarts.min.js`], (echart) => {
      const chartDom = document.getElementById(`main-${this._timeCreated}`);
      if (chartDom) {
        this._chartIns = echart.init(chartDom);
        this.updateChartOptions();
      }
    });
  }
  updateChartOptions() {
    this._chartIns.hideLoading();
    this.dataObj && this._chartIns.setOption(this.dataObj);
  }
  resize() {
    this.dataObj && this._chartIns.resize();
  }
  init() {
    this._timeCreated = Date.now();
    super.init();
    this.style.display = "inline-block";
    let captionDiv = this.createElement("div", this);
    captionDiv.id = `main-${this._timeCreated}`;
    captionDiv.style.display = "inline-block";
    captionDiv.style.height = "100%";
    captionDiv.style.width = "100%";
    this.datas = this.getAttribute("data", true);
  }
};
BarChart = __decorateClass([
  customElements2("i-bar-chart")
], BarChart);

// packages/chart/src/pieChart.ts
var PieChart = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
    this.drawChart();
  }
  get dataObj() {
    try {
      return JSON.parse(this.datas);
    } catch (e) {
      return null;
    }
  }
  showLoading() {
    this._chartIns && this._chartIns.showLoading();
  }
  drawChart() {
    if (this._chartIns) {
      this.updateChartOptions();
      return;
    }
    RequireJS.require([`${LibPath}lib/echarts/echarts.min.js`], (echart) => {
      const chartDom = document.getElementById(`main-${this._timeCreated}`);
      if (chartDom) {
        this._chartIns = echart.init(chartDom);
        this.updateChartOptions();
      }
    });
  }
  updateChartOptions() {
    this._chartIns.hideLoading();
    this.dataObj && this._chartIns.setOption(this.dataObj);
  }
  init() {
    this._timeCreated = Date.now();
    super.init();
    this.style.display = "inline-block";
    let captionDiv = this.createElement("div", this);
    captionDiv.id = `main-${this._timeCreated}`;
    captionDiv.style.display = "inline-block";
    captionDiv.style.height = "100%";
    captionDiv.style.width = "100%";
    this.datas = this.getAttribute("data", true);
  }
};
PieChart = __decorateClass([
  customElements2("i-pie-chart")
], PieChart);

// packages/chart/src/scatterChart.ts
var ScatterChart = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
    this.drawChart();
  }
  get dataObj() {
    try {
      return JSON.parse(this.datas);
    } catch (e) {
      return null;
    }
  }
  showLoading() {
    this._chartIns && this._chartIns.showLoading();
  }
  drawChart() {
    if (this._chartIns) {
      this.updateChartOptions();
      return;
    }
    RequireJS.require([`${LibPath}lib/echarts/echarts.min.js`], (echart) => {
      const chartDom = document.getElementById(`main-${this._timeCreated}`);
      if (chartDom) {
        this._chartIns = echart.init(chartDom);
        this.updateChartOptions();
      }
    });
  }
  updateChartOptions() {
    this._chartIns.hideLoading();
    this.dataObj && this._chartIns.setOption(this.dataObj);
  }
  init() {
    this._timeCreated = Date.now();
    super.init();
    this.style.display = "inline-block";
    let captionDiv = this.createElement("div", this);
    captionDiv.id = `main-${this._timeCreated}`;
    captionDiv.style.display = "inline-block";
    captionDiv.style.height = "100%";
    captionDiv.style.width = "100%";
    this.datas = this.getAttribute("data", true);
  }
};
ScatterChart = __decorateClass([
  customElements2("i-scatter-chart")
], ScatterChart);

// packages/chart/src/scatterLineChart.ts
var ScatterLineChart = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
    this.drawChart();
  }
  get dataObj() {
    try {
      return JSON.parse(this.datas);
    } catch (e) {
      return null;
    }
  }
  showLoading() {
    this._chartIns && this._chartIns.showLoading();
  }
  drawChart() {
    if (this._chartIns) {
      this.updateChartOptions();
      return;
    }
    RequireJS.require([`${LibPath}lib/echarts/echarts.min.js`], (echart) => {
      const chartDom = document.getElementById(`main-${this._timeCreated}`);
      if (chartDom) {
        this._chartIns = echart.init(chartDom);
        this.updateChartOptions();
      }
    });
  }
  updateChartOptions() {
    this._chartIns.hideLoading();
    this.dataObj && this._chartIns.setOption(this.dataObj);
  }
  init() {
    this._timeCreated = Date.now();
    super.init();
    this.style.display = "inline-block";
    let captionDiv = this.createElement("div", this);
    captionDiv.id = `main-${this._timeCreated}`;
    captionDiv.style.display = "inline-block";
    captionDiv.style.height = "100%";
    captionDiv.style.width = "100%";
    this.datas = this.getAttribute("data", true);
  }
};
ScatterLineChart = __decorateClass([
  customElements2("i-scatter-line-chart")
], ScatterLineChart);

// packages/chart/src/barStackChart.ts
var BarStackChart = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
    this.drawChart();
  }
  get dataObj() {
    try {
      return JSON.parse(this.datas);
    } catch (e) {
      return null;
    }
  }
  showLoading() {
    this._chartIns && this._chartIns.showLoading();
  }
  drawChart() {
    if (this._chartIns) {
      this.updateChartOptions();
      return;
    }
    RequireJS.require([`${LibPath}lib/echarts/echarts.min.js`], (echart) => {
      const chartDom = document.getElementById(`main-${this._timeCreated}`);
      if (chartDom) {
        this._chartIns = echart.init(chartDom);
        this.updateChartOptions();
      }
    });
  }
  updateChartOptions() {
    this._chartIns.hideLoading();
    this.dataObj && this._chartIns.setOption(this.dataObj);
  }
  init() {
    this._timeCreated = Date.now();
    super.init();
    this.style.display = "inline-block";
    let captionDiv = this.createElement("div", this);
    captionDiv.id = `main-${this._timeCreated}`;
    captionDiv.style.display = "inline-block";
    captionDiv.style.height = "100%";
    captionDiv.style.width = "100%";
    this.datas = this.getAttribute("data", true);
  }
};
BarStackChart = __decorateClass([
  customElements2("i-bar-stack-chart")
], BarStackChart);

// packages/upload/src/style/upload.css.ts
var Theme29 = theme_exports.ThemeVars;
cssRule("i-upload", {
  margin: "1rem 0",
  listStyle: "none",
  minHeight: 200,
  minWidth: 200,
  height: "100%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  $nest: {
    ".i-upload-wrapper": {
      position: "relative",
      border: `2px dashed ${Theme29.divider}`,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "1rem"
    },
    "i-upload-drag": {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    ".i-upload-drag_area": {
      marginTop: "4rem"
    },
    ".i-upload-dragger_active": {
      border: `2px dashed ${Theme29.colors.primary.main}`,
      backgroundColor: Theme29.colors.info.light,
      opacity: "0.8"
    },
    'input[type="file"]': {
      display: "none"
    },
    ".i-upload_preview": {
      display: "none",
      minHeight: 200,
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100%"
    },
    ".i-upload_preview img": {
      maxHeight: "inherit",
      maxWidth: "100%"
    },
    ".i-upload_preview-img": {
      maxHeight: "inherit",
      maxWidth: "100%",
      display: "table"
    },
    ".i-upload_preview-crop": {
      position: "absolute",
      border: `1px dashed ${Theme29.background.paper}`,
      width: 150,
      height: 150,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      boxSizing: "border-box",
      boxShadow: "0 0 0 9999em",
      color: "rgba(0, 0, 0, 0.5)",
      overflow: "hidden",
      cursor: "crosshair"
    },
    ".i-upload_preview-remove": {
      position: "absolute",
      top: 0,
      left: 0,
      visibility: "hidden",
      opacity: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.58)",
      cursor: "pointer",
      $nest: {
        "> span": {
          padding: "1rem",
          border: "2px solid #fff",
          borderRadius: "5px",
          color: "#fff",
          fontWeight: "bold"
        }
      }
    },
    ".i-upload_preview:hover .i-upload_preview-remove.active": {
      visibility: "visible",
      opacity: 1
    },
    ".i-upload_list": {
      margin: "1rem 0 2rem",
      display: "flex",
      gap: 7,
      width: "100%"
    },
    ".i-upload_list.i-upload_list-picture": {
      flexDirection: "row"
    },
    ".i-upload_list.i-upload_list-text": {
      flexDirection: "column",
      alignContent: "center"
    },
    ".i-upload_list.i-upload_list-text i-icon": {
      position: "unset"
    },
    ".i-upload_list-item": {
      display: "inline-flex",
      position: "relative",
      justifyContent: "space-between"
    },
    ".i-upload_list-item:hover i-icon": {
      display: "block"
    },
    ".i-upload_list.i-upload_list-text .i-upload_list-item:hover": {
      backgroundColor: ThemeVars.background.default
    },
    ".i-upload_list.i-upload_list-text .i-upload_list-item": {
      width: "100%",
      padding: ".25rem"
    },
    ".i-upload_list-item .i-upload_list-img": {
      width: 100,
      height: 50,
      objectFit: "cover"
    },
    ".i-upload_list-item i-icon": {
      cursor: "pointer",
      position: "absolute",
      right: -5,
      top: -5,
      display: "none"
    }
  }
});

// packages/upload/src/upload.ts
var Theme30 = theme_exports.ThemeVars;
var UploadDrag = class extends Control {
  constructor(parent, options) {
    super(parent, options, {});
    this.counter = 0;
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    this._labelElm.textContent = this._caption || "";
    if (!value)
      this._labelElm.style.display = "none";
    else
      this._labelElm.style.display = "";
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  handleOnDragEnter(source, event) {
    var _a;
    source.preventDefault();
    if (this.disabled)
      return;
    this.counter++;
    (_a = this.parentElement) == null ? void 0 : _a.classList.add("i-upload-dragger_active");
  }
  handleOnDragOver(source, event) {
    source.preventDefault();
  }
  handleOnDragLeave(source, event) {
    var _a;
    if (this.disabled)
      return;
    this.counter--;
    if (this.counter === 0) {
      (_a = this.parentElement) == null ? void 0 : _a.classList.remove("i-upload-dragger_active");
    }
  }
  handleOnDrop(source, event) {
    var _a, _b;
    source.preventDefault();
    if (this.disabled)
      return;
    this.counter = 0;
    (_a = this.parentElement) == null ? void 0 : _a.classList.remove("i-upload-dragger_active");
    const accept = (_b = this.parentElement) == null ? void 0 : _b.getAttribute("accept");
    if (!accept) {
      if (this.onDrop)
        this.onDrop(this, source.dataTransfer.files);
      return;
    }
    const valids = [].slice.call(source.dataTransfer.files).filter((file) => {
      const { type, name } = file;
      const extension = name.indexOf(".") > -1 ? `.${name.split(".").pop()}` : "";
      const baseType = type.replace(/\/.*$/, "");
      return accept.split(",").map((type2) => type2.trim()).filter((type2) => type2).some((acceptedType) => {
        if (/\..+$/.test(acceptedType)) {
          return extension === acceptedType;
        }
        if (/\/\*$/.test(acceptedType)) {
          return baseType === acceptedType.replace(/\/\*$/, "");
        }
        if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
          return type === acceptedType;
        }
        return false;
      });
    });
    if (this.onDrop)
      this.onDrop(this, valids);
  }
  init() {
    if (!this._wrapperElm) {
      super.init();
      this._wrapperElm = this.createElement("div", this);
      this._wrapperElm.classList.add("i-upload-drag_area");
      this._labelElm = this.createElement("span", this._wrapperElm);
      this._labelElm.style.color = Theme30.text.primary;
      this.caption = this.getAttribute("caption", true);
      this.disabled = this.getAttribute("disabled", true);
      this.addEventListener("dragenter", this.handleOnDragEnter.bind(this));
      this.addEventListener("dragover", this.handleOnDragOver.bind(this));
      this.addEventListener("dragleave", this.handleOnDragLeave.bind(this));
      this.addEventListener("drop", this.handleOnDrop.bind(this));
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
UploadDrag = __decorateClass([
  customElements2("i-upload-drag")
], UploadDrag);
var defaultValues3 = {
  multiple: false,
  listType: "text",
  showFileList: true
};
var Upload = class extends Control {
  constructor(parent, options) {
    super(parent, options, __spreadValues({}, defaultValues3));
    this._dt = new DataTransfer();
    this.toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    this.handleRemoveImagePreview = (event) => {
      if (!this.showPreviewInDropzone || !this.canRemovePreview || !this.isPreviewing || !this.enabled)
        return;
      event.stopPropagation();
      const file = this.uploadedFiles.length ? this.uploadedFiles[0] : null;
      this.resetInput();
      if (this.onRemove)
        this.onRemove(this, file);
    };
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
  }
  get accept() {
    return this._accept;
  }
  set accept(value) {
    this._accept = value;
    this._fileElm && value && this._fileElm.setAttribute("accept", `${value}`);
  }
  get drag() {
    return this._drag;
  }
  set drag(value) {
    this._drag = value;
    if (value)
      this.classList.add("el-upload-dragger");
    else
      this.classList.remove("el-upload-dragger");
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = value;
    if (this._fileElm && value)
      this._fileElm.setAttribute("multiple", `${value}`);
  }
  get listType() {
    return this._listType;
  }
  set listType(value) {
    this._listType = value;
  }
  get fileList() {
    return this._fileList;
  }
  get uploadedFiles() {
    return this._dt.files;
  }
  set fileList(value) {
    this._fileList = value;
    Promise.all(this.parsedFileList).then((fileList) => {
      if (fileList && fileList.length) {
        fileList.forEach((f) => {
          const file = f;
          this._dt.items.add(file);
        });
        if (this._fileElm) {
          this._fileElm.files = this._dt.files;
          this.updateFileListUI(this._fileElm.files);
        }
      }
    });
  }
  get parsedFileList() {
    try {
      const parseData = JSON.parse(this._fileList);
      const promiseArr = parseData.map((data) => {
        if (!data.url)
          return;
        return fetch(data.url).then((r) => r.blob()).then((blob) => new File([blob], data.name));
      });
      return promiseArr;
    } catch (err) {
      return [];
    }
  }
  get limit() {
    return this._limit;
  }
  set limit(value) {
    this._limit = value;
  }
  get showPreviewInDropzone() {
    return this._showPreviewInDropzone;
  }
  set showPreviewInDropzone(value) {
    this._showPreviewInDropzone = value;
    if (value) {
      this._previewElm = this.createElement("div", this._wrapperElm);
      this._previewElm.classList.add("i-upload_preview");
      this._wrapImgElm = this.createElement("div", this._previewElm);
      this._wrapImgElm.classList.add("i-upload_preview-img");
      this._previewRemoveElm = this.createElement("div", this._previewElm);
      if (this.canRemovePreview && this.enabled) {
        this._previewRemoveElm.classList.add("active");
      } else {
        this._previewRemoveElm.classList.remove("active");
      }
      this._previewRemoveElm.classList.add("i-upload_preview-remove");
      this._previewRemoveElm.onclick = this.handleRemoveImagePreview;
      const span = this.createElement("span", this._previewRemoveElm);
      span.innerHTML = "Click to remove";
    } else {
      this._previewElm && (this._previewElm.style.display = "none");
    }
  }
  get showedPreview() {
    return this.showPreviewInDropzone && this.isPreviewing;
  }
  set crop(value) {
    this._crop = value;
  }
  get crop() {
    return this._crop;
  }
  get canRemovePreview() {
    return this._canRemovePreview;
  }
  set canRemovePreview(value) {
    this._canRemovePreview = value;
    if (!this._previewRemoveElm)
      return;
    if (value) {
      this._previewRemoveElm.classList.add("active");
    } else {
      this._previewRemoveElm.classList.remove("active");
    }
  }
  get enabled() {
    return super.enabled;
  }
  set enabled(value) {
    super.enabled = value;
    if (this._uploadDragElm) {
      this._uploadDragElm.disabled = !value || !this.drag;
    }
    if (this._previewRemoveElm && !value) {
      this._previewRemoveElm.classList.remove("active");
    }
  }
  previewFile(files) {
    if (!files || !files.length)
      return;
    const imgUrl = URL.createObjectURL(files[0]);
    this.previewImage(imgUrl);
  }
  previewImage(uri) {
    if (!uri)
      return;
    this.isPreviewing = true;
    this._wrapImgElm.innerHTML = "";
    this._previewImgElm = new Image2();
    this._wrapImgElm.appendChild(this._previewImgElm);
    this._previewImgElm.url = uri;
    this.crop && (this._previewImgElm.crop = this.crop);
    this._previewElm.style.display = "block";
    this._wrapperFileElm.style.display = "none";
    if (this._uploadDragElm)
      this._uploadDragElm.style.display = "none";
  }
  handleUpload(source, event) {
    const files = source.target.files;
    this.proccessFiles(files);
  }
  proccessFiles(files) {
    if (!files || !files.length)
      return;
    if (this.limit && files.length > this.limit)
      return;
    if (this.limit && this.fileList.length + files.length > this.limit) {
      this.onExceed && this.onExceed(files, this.fileList);
      return;
    }
    if (!this.fileList)
      this._dt = new DataTransfer();
    for (let file of files) {
      if (this.beforeUpload)
        this.checkBeforeUpload(file);
      else
        this._dt.items.add(file);
    }
    this.updateFileListUI(this._dt.files);
    if (this.showPreviewInDropzone)
      this.previewFile(this._dt.files);
    if (this.onChange)
      this.onChange(this, this._dt.files);
  }
  checkBeforeUpload(file) {
    const before = this.beforeUpload(file);
    if (before && before.then) {
      before.then((processedFile) => {
        const fileType = Object.prototype.toString.call(processedFile);
        if (fileType === "[object File]" || fileType === "[object Blob]") {
          if (fileType === "[object Blob]") {
            processedFile = new File([processedFile], file.name, {
              type: file.type
            });
          }
          const mergeObj = Object.assign({}, processedFile, file);
          this._dt.items.add(mergeObj);
          this.post(mergeObj);
        } else {
          this._dt.items.add(file);
          this.post(file);
        }
      }, () => {
        if (this.onRemove)
          this.onRemove(this, file);
      });
    } else if (before !== false) {
      this._dt.items.add(file);
      this.post(file);
    } else {
      if (this.onRemove)
        this.onRemove(this, file);
    }
  }
  post(rawFile) {
  }
  updateFileListUI(files) {
    if (this._fileListElm) {
      this._fileListElm.innerHTML = "";
      for (let file of files) {
        const itemElm = this.createElement("div", this._fileListElm);
        itemElm.classList.add("i-upload_list-item");
        if (this.listType === "text") {
          this._fileListElm.classList.add("i-upload_list-text");
          const spanElm = this.createElement("span", itemElm);
          spanElm.textContent = file.name;
        } else if (this.listType === "picture") {
          this._fileListElm.classList.add("i-upload_list-picture");
          const imgElm = new Image();
          imgElm.src = URL.createObjectURL(file);
          imgElm.classList.add("i-upload_list-img");
          imgElm.onload = function() {
            URL.revokeObjectURL(imgElm.src);
          };
          itemElm.appendChild(imgElm);
        }
        const removeIcon = new Icon();
        removeIcon.init();
        removeIcon.width = 12;
        removeIcon.height = 12;
        removeIcon.fill = Theme30.action.active;
        removeIcon.name = "trash";
        itemElm.appendChild(removeIcon);
        removeIcon.addEventListener("click", () => this.handleRemove(file));
      }
      this._fileListElm.style.display = files.length ? "flex" : "none";
    }
  }
  handleRemove(file) {
    for (let i = 0; i < this._dt.items.length; i++) {
      if (file.name === this._dt.files[i].name) {
        this._dt.items.remove(i);
        if (this.onRemove)
          this.onRemove(this, file);
        break;
      }
    }
    this._fileElm.files = this._dt.files;
    this.updateFileListUI(this._dt.files);
    if (!this._dt.items.length)
      this.resetInput();
  }
  resetInput() {
    this._fileElm.value = "";
    this._wrapperFileElm.style.display = "block";
    if (this._uploadDragElm)
      this._uploadDragElm.style.display = this.drag ? "flex" : "none";
    if (this._previewElm)
      this._previewElm.style.display = "none";
    this._wrapImgElm && (this._wrapImgElm.innerHTML = "");
    if (this._fileListElm)
      this._fileListElm.style.display = "none";
    this._dt = new DataTransfer();
    this.isPreviewing = false;
  }
  cropImage(file) {
    const url = URL.createObjectURL(file);
    return this._previewImgElm.cropImage(url);
  }
  init() {
    if (!this.initialized) {
      super.init();
      this._wrapperElm = this.createElement("div", this);
      this._wrapperElm.classList.add("i-upload-wrapper");
      this._wrapperFileElm = this.createElement("div", this._wrapperElm);
      this.caption = this.getAttribute("caption", true);
      const dragAttr = this.getAttribute("drag", true);
      this.drag = dragAttr;
      this._uploadDragElm = new UploadDrag();
      this._wrapperElm.appendChild(this._uploadDragElm);
      this._uploadDragElm.caption = this.caption;
      this._uploadDragElm.disabled = !this.enabled || !this.drag;
      this._uploadDragElm.onDrop = (source, value) => {
        value && this.proccessFiles(value);
      };
      this._fileElm = this.createElement("input", this._wrapperFileElm);
      this._fileElm.type = "file";
      this.multiple = this.getAttribute("multiple", true);
      this.accept = this.getAttribute("accept");
      if (!this.enabled)
        this._fileElm.setAttribute("disabled", "");
      this.listType = this.getAttribute("listType", true);
      const btn = new Button();
      btn.init();
      btn.caption = "Choose an image";
      btn.className = `i-upload_btn ${!this.enabled && "disabled"}`;
      this._wrapperFileElm.appendChild(btn);
      const fileListAttr = this.getAttribute("showFileList", true);
      if (fileListAttr && !this._fileListElm) {
        this._fileListElm = this.createElement("div", this);
        this._fileListElm.classList.add("i-upload_list");
        this._fileListElm.style.display = "none";
      }
      this.limit = this.getAttribute("limit", true);
      this.showPreviewInDropzone = this.getAttribute("showPreviewInDropzone", true);
      this.canRemovePreview = this.getAttribute("canRemovePreview", true);
      this.fileList = this.getAttribute("fileList", true);
      const cropAttr = this.getAttribute("crop", true);
      cropAttr && (this.crop = cropAttr);
      this._wrapperElm.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!this.enabled)
          return;
        if (!this.showedPreview) {
          this._fileElm.click();
        }
        ;
      });
      this._fileElm.addEventListener("change", this.handleUpload.bind(this));
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
__decorateClass([
  observable("fileList")
], Upload.prototype, "_fileList", 2);
Upload = __decorateClass([
  customElements2("i-upload")
], Upload);

// packages/iframe/src/iframe.ts
var Iframe = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      width: 800,
      height: 600
    });
  }
  get url() {
    return this._url;
  }
  set url(value) {
    this._url = value;
    if (value) {
      if (!this.iframeElm)
        this.iframeElm = this.createElement("iframe", this);
    }
    if (this.iframeElm) {
      this.iframeElm.src = value;
      this.iframeElm.width = "100%";
      this.iframeElm.height = "100%";
      this.iframeElm.setAttribute("frameBorder", "0");
    }
  }
  init() {
    super.init();
    this.url = this.getAttribute("url", true);
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Iframe = __decorateClass([
  customElements2("i-iframe")
], Iframe);

// packages/timeline/src/style/timeline.css.ts
var Theme31 = theme_exports.ThemeVars;
cssRule("i-timeline", {
  display: "block",
  maxWidth: "100%",
  verticalAlign: "baseline",
  fontFamily: Theme31.typography.fontFamily,
  fontSize: Theme31.typography.fontSize,
  lineHeight: "25px",
  color: Theme31.text.primary,
  $nest: {
    ".section": {
      width: "100%",
      position: "relative",
      top: "200px"
    },
    ".time-line": {
      width: "100%",
      position: "absolute",
      left: 0,
      top: "30px"
    },
    ".arrow-left": {
      width: "0px",
      height: "0px",
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
      position: "absolute",
      left: "-5px",
      top: "13px"
    },
    ".arrow-right": {
      width: "0px",
      height: "0px",
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
      position: "absolute",
      right: "-5px",
      top: "13px"
    },
    ".point": {
      width: "25px",
      height: "25px",
      position: "absolute",
      top: "20px",
      borderRadius: " 50%"
    },
    ".label": {
      position: "absolute",
      left: "50%",
      width: "max-content",
      transform: "translate(-50%, 0)"
    },
    ".point:nth-child(odd) .label": {
      top: "30px"
    },
    ".point:nth-child(even) .label": {
      top: "-30px"
    },
    ".point:hover .wrapper": {
      opacity: "1"
    },
    ".point:nth-child(odd) .wrapper": {
      top: "60px"
    },
    ".point:nth-child(even) .wrapper": {
      bottom: "60px"
    },
    ".wrapper": {
      position: "absolute",
      borderRadius: "5px",
      padding: "20px",
      width: "max-content",
      height: "max-content",
      opacity: "0",
      pointerEvents: "none",
      left: "-20px"
    },
    ".title": {
      fontWeight: "bold"
    }
  }
});

// packages/timeline/src/timeline.ts
var Timeline = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      height: 200
    });
  }
  get datas() {
    return this._data;
  }
  set datas(value) {
    this._data = value;
  }
  init() {
    super.init();
    this._data = this.getAttribute("data", true);
    var pointColor = this.getAttribute("pointColor", true);
    var titleColor = this.getAttribute("titleColor", true);
    var textColor = this.getAttribute("textColor", true);
    var popupColor = this.getAttribute("popupColor", true);
    let html = `<div class="section">
                <div class="time-line" style="border-bottom: 6px solid ${pointColor}"></div>
                <div class="arrow-left" style="border-right: 20px solid ${pointColor}"></div>
                <div class="arrow-right" style="border-left: 20px solid ${pointColor}"></div>`;
    if (this._data) {
      var dataTimeline = JSON.parse(this._data);
      dataTimeline.forEach((element, index) => {
        var positon = "";
        var positionPopup = "";
        if (index == 0) {
          positon = "left: 40px;";
        } else if (index == dataTimeline.length - 1) {
          positon = "right: 40px";
        } else {
          positon = `left: calc(100% / ${dataTimeline.length - 1} * ${index})`;
        }
        if (index > (dataTimeline.length - 1) / 2) {
          positionPopup = "left: auto; right: -20px";
        }
        html += `
                    <div class="point" style="${positon};background: ${pointColor}">
                        <div class="timeline_bar"></div>
                        <span class="label">
                            ${element.label}
                        </span>
                        <div class="wrapper" style="${positionPopup}; background:${popupColor}">
                            <div class="title" style="color:${titleColor}">${element.label}</div>
                            <ul>
                        `;
        if (element.list.length) {
          element.list.forEach((e) => {
            html += `<li style="color:${textColor}">${e}</li>`;
          });
        }
        html += `   </ul>
                        </div>
                    </div>`;
      });
    }
    html += `</div>`;
    this.innerHTML = html;
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Timeline = __decorateClass([
  customElements2("i-timeline")
], Timeline);

// packages/layout/src/card.ts
var CardLayout = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get cardMinWidth() {
    return this._cardMinWidth;
  }
  set cardMinWidth(value) {
    this._cardMinWidth = value || "0px";
    this.style.gridTemplateColumns = `repeat(auto-fill, minmax(min(${this._cardMinWidth}, 100%), 1fr))`;
  }
  init() {
    super.init();
    this.style.display = "grid";
    this.style.gridAutoRows = "1fr";
    this.cardMinWidth = this.attrs.cardMinWidth;
  }
};
CardLayout = __decorateClass([
  customElements2("i-card-layout")
], CardLayout);

// packages/pagination/src/style/pagination.css.ts
var Theme32 = theme_exports.ThemeVars;
cssRule("i-pagination", {
  display: "block",
  width: "100%",
  maxWidth: "100%",
  verticalAlign: "baseline",
  fontFamily: Theme32.typography.fontFamily,
  fontSize: Theme32.typography.fontSize,
  lineHeight: "25px",
  color: Theme32.text.primary,
  "$nest": {
    ".pagination": {
      display: "inline-flex"
    },
    ".pagination a": {
      color: Theme32.text.primary,
      float: "left",
      padding: "8px 16px",
      textDecoration: "none",
      transition: "background-color .3s",
      border: "1px solid #ddd"
    },
    ".pagination a.active": {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "1px solid #4CAF50"
    },
    ".pagination a.disabled": {
      color: Theme32.text.disabled,
      pointerEvents: "none"
    },
    ".pagination-main": {
      display: "flex"
    }
  }
});

// packages/pagination/src/pagination.ts
var Pagination = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      pagerCount: 7
    });
    this._showPrevMore = false;
    this._showNextMore = false;
    this.pageItems = [];
  }
  get pagerCount() {
    return this._pagerCount;
  }
  set pagerCount(value) {
    this._pagerCount = value;
  }
  get totalPage() {
    return this._totalPage;
  }
  set totalPage(value) {
    if (this._totalPage === value)
      return;
    this._totalPage = value;
    this.hideNexPrev();
    this.renderPageItem(value);
  }
  get currentPage() {
    return this._curPage;
  }
  set currentPage(value) {
    this._curPage = value;
    const index = value - 1;
    this.pageItems[index] && this.onActiveItem(this.pageItems[index]);
    if (this.onChange)
      this.onChange(this, value);
  }
  onActiveItem(item) {
    if (this.activeItem) {
      this.activeItem.classList.remove("active");
    }
    if (item) {
      item.classList.add("active");
      this.activeItem = item;
    }
  }
  onDisablePrevNext() {
    if (this._prevElm)
      this.currentPage <= 1 ? this._prevElm.classList.add("disabled") : this._prevElm.classList.remove("disabled");
    if (this._nextElm)
      this.currentPage >= this.totalPage ? this._nextElm.classList.add("disabled") : this._nextElm.classList.remove("disabled");
  }
  _handleOnClickIndex(value, event) {
    if (!this.enabled)
      return;
    this.currentPage = value;
    this.onActiveItem(event.target);
    this.onDisablePrevNext();
    if (this.onSelectIndex) {
      event.preventDefault();
      this.onSelectIndex(this, event);
    }
  }
  _handleOnClickMore(value, event) {
    this.currentPage = this.currentPage + value * (this.pagerCount - 2);
    this.renderPageItem(this.totalPage);
  }
  _handleOnNext(event) {
    if (!this.enabled || this.currentPage >= this.totalPage)
      return;
    const nextPage = Number(this._curPage) <= 0 ? 1 : Number(this._curPage) + 1;
    this.currentPage = nextPage;
    this.renderPageItem(this.totalPage);
    this.onDisablePrevNext();
    if (this.onNext) {
      event.preventDefault();
      this.onNext(this, event);
    }
  }
  _handleOnPrev(event) {
    if (!this.enabled || this.currentPage <= 1)
      return;
    const prevPage = Number(this._curPage) - 1;
    this.currentPage = prevPage;
    this.renderPageItem(this.totalPage);
    this.onDisablePrevNext();
    if (this.onPrevious) {
      event.preventDefault();
      this.onPrevious(this, event);
    }
  }
  onMouseenter(direction, event) {
    if (!this.enabled)
      return;
    const target = event.target;
    target.innerHTML = direction === -1 ? "<<" : ">>";
  }
  renderEllipsis(step) {
    let item = this.createElement("a", this._mainPagiElm);
    item.id = step === -1 ? "prevMoreElm" : "nextMoreElm";
    item.setAttribute("href", "#");
    item.innerHTML = "...";
    item.classList.add("paginate_button");
    item.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleOnClickMore(step, e);
    });
    item.addEventListener("mouseenter", (e) => {
      e.preventDefault();
      this.onMouseenter(step, e);
    });
    item.addEventListener("mouseout", (e) => {
      e.preventDefault();
      item.innerHTML = "...";
    });
  }
  renderPage(index) {
    let item = this.createElement("a", this._mainPagiElm);
    this.pageItems.push(item);
    item.setAttribute("href", "#");
    item.innerHTML = `${index}`;
    item.classList.add("paginate_button");
    item.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleOnClickIndex(index, e);
    });
    if (index === this.currentPage)
      this.onActiveItem(item);
  }
  updatePagers() {
    const pagerCount = this.pagerCount;
    const halfPagerCount = (pagerCount - 1) / 2;
    const currentPage = Number(this.currentPage);
    const pageCount = Number(this.totalPage);
    let showPrevMore = false;
    let showNextMore = false;
    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - halfPagerCount) {
        showPrevMore = true;
      }
      if (currentPage < pageCount - halfPagerCount) {
        showNextMore = true;
      }
    }
    const array = [];
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2);
      for (let i = startPage; i < pageCount; i++) {
        array.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1;
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i);
      }
    }
    this.pagers = array;
    this._showPrevMore = showPrevMore;
    this._showNextMore = showNextMore;
  }
  renderPageItem(size) {
    this._mainPagiElm.innerHTML = "";
    this.pageItems = [];
    if (size > 0) {
      if (size > this.pagerCount) {
        this.updatePagers();
        this.renderPage(1);
        this._showPrevMore && this.renderEllipsis(-1);
        for (let i = 0; i < this.pagers.length; i++) {
          this.renderPage(this.pagers[i]);
        }
        this._showNextMore && this.renderEllipsis(1);
        this.renderPage(size);
      } else {
        for (let i = 1; i <= size; i++) {
          this.renderPage(i);
        }
      }
    } else if (size < 0) {
      const _s = this.pageItems.length + size;
      for (let i = this.pageItems.length - 1; i >= _s; i--) {
        this._mainPagiElm.removeChild(this.pageItems[i]);
        this.pageItems.pop();
      }
    }
  }
  hideNexPrev() {
    if (this.totalPage >= 1) {
      this._prevElm && this._prevElm.classList.remove("hidden");
      this._nextElm && this._nextElm.classList.remove("hidden");
      this.onDisablePrevNext();
    }
  }
  init() {
    if (!this._paginationDiv) {
      this._paginationDiv = this.createElement("div", this);
      this._paginationDiv.classList.add("pagination");
      this._prevElm = this.createElement("a", this._paginationDiv);
      this._prevElm.setAttribute("href", "#");
      this._prevElm.innerHTML = "&laquo;";
      this._prevElm.classList.add("paginate_button", "previous", "hidden");
      this._prevElm.addEventListener("click", (e) => {
        e.preventDefault();
        this._handleOnPrev(e);
      });
      this._mainPagiElm = this.createElement("div", this._paginationDiv);
      this._mainPagiElm.classList.add("pagination-main");
      const defaultCurrent = 1;
      this.currentPage = +this.getAttribute("currentPage", true) || defaultCurrent;
      this.pagerCount = +this.getAttribute("pagerCount", true);
      this.totalPage = +this.getAttribute("totalPage", true) || 0;
      this._nextElm = this.createElement("a", this._paginationDiv);
      this._nextElm.setAttribute("href", "#");
      this._nextElm.innerHTML = "&raquo;";
      this._nextElm.classList.add("paginate_button", "next", "hidden");
      this._nextElm.addEventListener("click", (e) => {
        e.preventDefault();
        this._handleOnNext(e);
      });
      this.onDisablePrevNext();
    }
    super.init();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Pagination = __decorateClass([
  customElements2("i-pagination")
], Pagination);

// packages/progress/src/style/progress.css.ts
var Theme33 = theme_exports.ThemeVars;
cssRule("i-progress", {
  display: "block",
  maxWidth: "100%",
  verticalAlign: "baseline",
  fontFamily: Theme33.typography.fontFamily,
  fontSize: Theme33.typography.fontSize,
  color: Theme33.text.primary,
  position: "relative",
  $nest: {
    ".i-progress": {
      boxSizing: "border-box",
      margin: 0,
      minWidth: 0,
      width: "100%",
      display: "block"
    },
    ".i-progress--grid": {
      display: "grid",
      gap: 20,
      gridTemplateColumns: "auto 1fr 80px",
      alignItems: "center"
    },
    ".i-progress--exception": {
      $nest: {
        "> .i-progress_wrapbar > .i-progress_overlay": {
          backgroundColor: Theme33.colors.error.light
        },
        "> .i-progress_wrapbar > .i-progress_bar .i-progress_bar-item": {
          backgroundColor: Theme33.colors.error.light
        },
        ".i-progress_item.i-progress_item-start": {
          borderColor: Theme33.colors.error.light
        },
        ".i-progress_item.i-progress_item-end": {},
        ".status-circle": {
          display: "inline-block",
          border: `1px solid ${Theme33.colors.error.light}`,
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: `${Theme33.colors.error.light} 0px 0px 2px 0px, ${Theme33.colors.error.light} 0px 0px 8px 0px, ${Theme33.colors.error.light} 0px 0px 12px 0px`
        }
      }
    },
    ".i-progress--success": {
      $nest: {
        "> .i-progress_wrapbar > .i-progress_overlay": {
          backgroundColor: Theme33.colors.success.light
        },
        "> .i-progress_wrapbar > .i-progress_bar .i-progress_bar-item": {
          backgroundColor: Theme33.colors.success.light
        },
        ".i-progress_item.i-progress_item-start": {
          borderColor: Theme33.colors.success.light
        },
        ".i-progress_item.i-progress_item-end": {},
        ".status-circle": {
          display: "inline-block",
          border: `1px solid ${Theme33.colors.success.light}`,
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: `${Theme33.colors.success.light} 0px 0px 2px 0px, ${Theme33.colors.success.light} 0px 0px 8px 0px, ${Theme33.colors.success.light} 0px 0px 12px 0px`
        }
      }
    },
    ".i-progress--warning": {
      $nest: {
        "> .i-progress_wrapbar > .i-progress_overlay": {
          backgroundColor: Theme33.colors.warning.light
        },
        "> .i-progress_wrapbar > .i-progress_bar .i-progress_bar-item": {
          backgroundColor: Theme33.colors.warning.light
        },
        ".i-progress_item.i-progress_item-start": {
          borderColor: Theme33.colors.warning.light
        },
        ".i-progress_item.i-progress_item-end": {},
        ".status-circle": {
          display: "inline-block",
          border: `1px solid ${Theme33.colors.warning.light}`,
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: `${Theme33.colors.warning.light} 0px 0px 2px 0px, ${Theme33.colors.warning.light} 0px 0px 8px 0px, ${Theme33.colors.warning.light} 0px 0px 12px 0px`
        }
      }
    },
    ".i-progress--active": {
      $nest: {
        "> .i-progress_wrapbar > .i-progress_overlay": {
          backgroundColor: Theme33.colors.primary.light
        },
        "> .i-progress_wrapbar > .i-progress_bar .i-progress_bar-item": {
          backgroundColor: Theme33.colors.primary.light
        },
        ".i-progress_item.i-progress_item-start": {
          backgroundColor: "transparent",
          borderColor: Theme33.colors.primary.light
        },
        ".status-circle": {
          display: "inline-block",
          border: `1px solid ${Theme33.colors.primary.light}`,
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: `${Theme33.colors.primary.light} 0px 0px 2px 0px, ${Theme33.colors.primary.light} 0px 0px 8px 0px, ${Theme33.colors.primary.light} 0px 0px 12px 0px`
        }
      }
    },
    ".i-progress_wrapbar": {
      position: "relative",
      boxSizing: "border-box",
      minWidth: 0,
      order: 2,
      minHeight: 2,
      $nest: {
        ".i-progress_bar": {
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          gap: "1px",
          $nest: {
            "&.has-bg": {
              backgroundColor: Theme33.divider
            },
            ".i-progress_bar-item": {
              flex: "auto",
              backgroundColor: Theme33.divider
            }
          }
        },
        ".i-progress_overlay": {
          position: "absolute",
          minWidth: 0,
          height: "100%"
        }
      }
    },
    ".i-progress_item": {
      boxSizing: "border-box",
      margin: "0px -1.2px 0px 0px",
      minWidth: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      $nest: {
        "&.i-progress_item-start": {
          borderWidth: 1,
          borderStyle: "solid",
          borderImage: "initial",
          borderRadius: 14,
          borderColor: Theme33.divider,
          padding: "4px 12px",
          order: 1
        },
        "&.i-progress_item-end": {
          boxSizing: "border-box",
          margin: 0,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          cursor: "default",
          position: "relative",
          order: 3,
          alignItems: "flex-start"
        },
        "&:hover > .info-wrapper, &:hover > i-slot[name=tooltip]": {
          opacity: 1
        },
        ".lb-start, .lb-end": {
          fontSize: "10px",
          color: Theme33.text.secondary
        },
        ".lb-end--number": {
          fontSize: "14px",
          color: Theme33.text.primary
        }
      }
    },
    ".info-wrapper, i-slot[name=tooltip]": {
      opacity: 0,
      backgroundColor: Theme33.background.paper,
      border: `1px solid ${Theme33.divider}`,
      position: "absolute",
      borderRadius: "4px",
      padding: "1rem 1rem .5rem",
      width: "max-content",
      height: "max-content",
      bottom: "3rem"
    },
    ".info-wrapper": {
      maxWidth: 300,
      $nest: {
        ".info-item": {
          display: "flex",
          justifyContent: "space-between",
          minWidth: 250,
          flexWrap: "wrap",
          marginBottom: ".5rem"
        },
        ".info-item--child": {
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10
        },
        ".scroll-srap": {
          maxHeight: 200,
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          zIndex: 999,
          paddingRight: "1rem",
          $nest: {
            "&::-webkit-scrollbar": {
              width: 5,
              borderRadius: 20
            },
            "&::-webkit-scrollbar-track": {
              background: Theme33.colors.info.contrastText
            },
            "&::-webkit-scrollbar-thumb": {
              background: Theme33.colors.info.contrastText
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: Theme33.colors.info.contrastText
            }
          }
        },
        ".info-title": {
          color: Theme33.text.secondary,
          textTransform: "uppercase"
        },
        ".info-icon i-icon": {
          display: "inline-block",
          width: 20,
          height: 20
        },
        ".info-wrapper_header": {
          marginBottom: "1rem",
          textTransform: "uppercase"
        },
        ".mb-1": {
          marginBottom: ".5rem"
        }
      }
    },
    ".info-wrapper--custom": {
      padding: "2rem 2rem 1rem"
    },
    ".status-circle": {
      position: "relative",
      marginRight: 6,
      width: 6,
      height: 6,
      marginBottom: 2,
      transform: "inherit",
      borderRadius: "50%",
      display: "none"
    },
    ".hidden": {
      display: "none"
    },
    "i-slot": {
      opacity: 0
    },
    ".lb-label": {
      fontSize: "10px",
      color: Theme33.text.secondary
    },
    ".lb-value": {
      fontSize: "14px",
      color: Theme33.text.primary
    },
    ".is-mobile": {
      display: "none",
      paddingLeft: ".25rem"
    },
    "&.i-progress--stretch": {
      $nest: {
        "@media only screen and (max-width: 768px)": {
          $nest: {
            ".i-progress_wrapbar": {
              display: "none !important"
            },
            ".i-progress_item-end": {
              display: "none !important"
            },
            ".is-mobile": {
              display: "inline-block"
            },
            ".i-progress--grid": {
              gridTemplateColumns: "auto",
              justifyContent: "center"
            },
            ".lb-start": {
              fontSize: "10px",
              color: Theme33.text.primary,
              textTransform: "uppercase"
            }
          }
        }
      }
    },
    ".i-progress--circle ~ .i-progress_text": {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      textAlign: "center",
      transform: "translateY(-50%)"
    },
    ".i-progress--line ~ .i-progress_text": {
      display: "inline-block",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)"
    }
  }
});
cssRule("i-progress-item", {
  display: "inline-flex",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: Theme33.colors.primary.dark,
  boxSizing: "border-box",
  margin: 0,
  minWidth: 0,
  height: 24,
  width: 24,
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  $nest: {
    "&.is-exception": {
      backgroundColor: Theme33.colors.error.dark
    },
    "&.is-success": {
      backgroundColor: Theme33.colors.success.dark
    },
    "&.is-warning": {
      backgroundColor: Theme33.colors.warning.dark
    },
    "&:hover > .info-wrapper, &:hover > i-slot[name=tooltip]": {
      opacity: 1
    },
    "&:last-child .info-wrapper, &:last-child i-slot[name=tooltip]": {
      right: "-2rem"
    }
  }
});

// packages/progress/src/progress.ts
var Theme34 = theme_exports.ThemeVars;
var defaultVals = {
  percent: 0,
  height: 20,
  showInfo: true,
  loading: false,
  steps: 1,
  type: "line"
};
var Progress = class extends Control {
  constructor(parent, options) {
    super(parent, options, __spreadValues({}, defaultVals));
    if (options == null ? void 0 : options.onRenderStart)
      this.onRenderStart = options.onRenderStart;
    if (options == null ? void 0 : options.onRenderEnd)
      this.onRenderEnd = options.onRenderEnd;
  }
  get percent() {
    return this._percent;
  }
  set percent(value) {
    this._percent = +value < 0 ? 0 : +value > 100 ? 100 : +value;
    const overlayElm = this.querySelector(".i-progress_overlay");
    if (overlayElm)
      overlayElm.style.width = `${this._percent}%`;
    if (this._percent > 0 && this._percent < 100)
      this._wrapperElm.classList.add("i-progress--active");
    else if (this._percent === 100)
      this._wrapperElm.classList.add("i-progress--success");
    if (this._textElm)
      this._textElm.textContent = this.format ? this.format(this._percent) : this.percent + "%";
    if (this.type === "circle") {
      this.updateCircleInner();
      return;
    }
    if (this.percent) {
      this.updateUI();
    } else {
      const itemElms = Array.from(this.getElementsByTagName("i-progress-item"));
      itemElms.forEach((elm) => {
        elm.classList.add("hidden");
      });
    }
  }
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
    this._wrapperElm.classList.add("i-progress--" + value);
  }
  get showInfo() {
    return this._showInfo;
  }
  set showInfo(value) {
    this._showInfo = value;
    if (this.type === "line") {
      if (value) {
        this._wrapperElm.classList.add("i-progress--grid");
        this._startElm = this.createElement("div", this._wrapperElm);
        this._startElm.classList.add("i-progress_item", "i-progress_item-start");
        if (this.loading) {
          this._startElm.innerHTML = `<span class="lb-start"><img width="100%" height="10px" width="30px" style="object-fit: cover" src="${LibPath}assets/loading.gif" /></span>`;
        } else {
          this._startElm.innerHTML = `<span class="lb-start">${this.labels.defaultLabel}</span>`;
        }
        this._endElm = this.createElement("div", this._wrapperElm);
        this._endElm.classList.add("i-progress_item", "i-progress_item-end");
        this._endElm.innerHTML = `<span><span class="lb-end">LOADING</span><img width="10.5" height="10.5" src="data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.64'%3e%3ccircle cx='6' cy='6' r='5.25' fill='white' fill-opacity='0.16'/%3e%3cpath d='M4.6875 5.34375H6.65625V8.625H7.3125V9.9375H4.6875V8.625H5.34375V6.65625H4.6875V5.34375Z' fill='white'/%3e%3cpath d='M4.6875 3.53906C4.6875 2.9048 5.20167 2.39062 5.83594 2.39062C6.4702 2.39062 6.98438 2.9048 6.98438 3.53906C6.98438 4.17333 6.4702 4.6875 5.83594 4.6875C5.20167 4.6875 4.6875 4.17333 4.6875 3.53906Z' fill='white'/%3e%3c/g%3e%3c/svg%3e" /></span><span class="lb-end--number"></span>`;
      } else {
        this._wrapperElm.classList.remove("i-progress--grid");
      }
    }
    if (value) {
      this._textElm = this.createElement("span", this);
      this._textElm.classList.add("i-progress_text");
      this._textElm.style.fontSize = this.progressTextSize + "px";
    } else {
      this._textElm && (this._textElm.innerHTML = "");
    }
  }
  get popupData() {
    return this._popupData;
  }
  set popupData(value) {
    this._popupData = value;
    const { start, end } = this.parsedData;
    if (this._startElm && start.list) {
      const tooltipElm = this.createElement("div");
      tooltipElm.classList.add("info-wrapper");
      tooltipElm.style.left = 0 + "px";
      tooltipElm.innerHTML = this.createPopupUI(start.list);
      this._startElm.appendChild(tooltipElm);
    }
    if (this._endElm && end.list) {
      const tooltipElm = this.createElement("div");
      tooltipElm.classList.add("info-wrapper");
      tooltipElm.style.right = 0 + "px";
      tooltipElm.innerHTML = this.createPopupUI(end.list);
      this._endElm.appendChild(tooltipElm);
    }
  }
  get parsedData() {
    try {
      return JSON.parse(this.popupData);
    } catch (e) {
      return { start: {}, end: {} };
    }
  }
  get loading() {
    return this._loading;
  }
  set loading(value) {
    this._loading = value;
  }
  get steps() {
    return this._steps;
  }
  set steps(value) {
    this._steps = +value;
    const wrapbarElm = this.querySelector(".i-progress_bar");
    const overlayElm = this.querySelector(".i-progress_overlay");
    wrapbarElm.innerHTML = "";
    if (this._steps > 1) {
      const unitStep = 100 / this._steps;
      const percentStep = Math.ceil(this.percent / unitStep);
      const remainder = this.percent % unitStep;
      for (let i = 0; i < this._steps; i++) {
        const barItem = this.createElement("div");
        barItem.style.width = unitStep + "%";
        barItem.style.height = `${i + 1}px`;
        if (i === percentStep - 1 && remainder !== 0) {
          const childElm = this.createElement("div");
          childElm.classList.add("i-progress_bar-item");
          childElm.style.width = remainder * 100 / unitStep + "%";
          childElm.style.height = `${i + 1}px`;
          barItem.appendChild(childElm);
        } else if (i < percentStep) {
          barItem.classList.add("i-progress_bar-item");
        }
        wrapbarElm.appendChild(barItem);
      }
      wrapbarElm.classList.remove("has-bg");
      overlayElm && (overlayElm.style.display = "none");
    } else {
      wrapbarElm.classList.add("has-bg");
      overlayElm && (overlayElm.style.display = "block");
    }
  }
  get labels() {
    const {
      start: {
        defaultLabel = "NOT INDEXES",
        progressingLabel = "INDEXING",
        succeedLabel = "SYNCED",
        failedLabel = "FAILED"
      }
    } = this.parsedData;
    return {
      defaultLabel,
      progressingLabel,
      succeedLabel,
      failedLabel
    };
  }
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
    if (value === "circle") {
      this.renderCircle();
    } else {
      this.renderLine();
    }
  }
  get strokeWidth() {
    return this._strokeWidth;
  }
  set strokeWidth(value) {
    this._strokeWidth = value || 2;
    const overlayElm = this.querySelector(".i-progress_wrapbar");
    if (overlayElm)
      overlayElm.style.height = `${this._strokeWidth}px`;
  }
  get relativeStrokeWidth() {
    return (this.strokeWidth / +this.width * 100).toFixed(1);
  }
  get radius() {
    if (this.type === "circle") {
      const value = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return parseInt(value.toFixed(1), 10);
    } else {
      return 0;
    }
  }
  get trackPath() {
    const radius = this.radius;
    return `
          M 50 50
          m 0 -${radius}
          a ${radius} ${radius} 0 1 1 0 ${radius * 2}
          a ${radius} ${radius} 0 1 1 0 -${radius * 2}
          `;
  }
  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
  get rate() {
    return 1;
  }
  get strokeDashoffset() {
    const offset = -1 * this.perimeter * (1 - this.rate) / 2;
    return `${offset}px`;
  }
  get trailPathStyle() {
    const strokeDasharray = `${this.perimeter * this.rate}px, ${this.perimeter}px`;
    const strokeDashoffset = this.strokeDashoffset;
    return `stroke-dasharray: ${strokeDasharray}; stroke-dashoffset: ${strokeDashoffset};`;
  }
  get circlePathStyle() {
    const strokeDasharray = `${this.perimeter * this.rate * (this.percent / 100)}px, ${this.perimeter}px`;
    const strokeDashoffset = this.strokeDashoffset;
    const transition = "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease";
    return `stroke-dasharray: ${strokeDasharray}; stroke-dashoffset: ${strokeDashoffset}; transition: ${transition};`;
  }
  get stroke() {
    let ret = "";
    switch (this.status) {
      case "success":
        ret = Theme34.colors.success.main;
        break;
      case "exception":
        ret = Theme34.colors.error.main;
        break;
      case "warning":
        ret = Theme34.colors.warning.main;
        break;
      default:
        ret = Theme34.colors.primary.main;
    }
    if (this.percent === 100 && !this.status)
      ret = Theme34.colors.success.main;
    return ret;
  }
  get trackColor() {
    let ret = "";
    switch (this.status) {
      case "success":
        ret = Theme34.colors.success.light;
        break;
      case "exception":
        ret = Theme34.colors.error.light;
        break;
      case "warning":
        ret = Theme34.colors.warning.light;
        break;
      default:
        ret = Theme34.divider;
    }
    if (this.percent === 100 && !this.status)
      ret = Theme34.colors.success.light;
    return ret;
  }
  get progressTextSize() {
    return this.type === "line" ? 12 + this.strokeWidth * 0.4 : +this.width * 0.111111 + 2;
  }
  createPopupUI(list) {
    if (!list.length)
      return "";
    let html = "";
    for (let item of list) {
      html += `<div class="info-item">
                <div class="info-title lb-label">${item.label || ""}</div>
                <div class="lb-value">${item.value || ""}</div>
            </div>`;
    }
    return html;
  }
  updateUI() {
    const lbStart = this.querySelector(".lb-start");
    const text = this.status === "exception" ? this.labels.failedLabel : this.status === "success" ? this.labels.succeedLabel : this.labels.progressingLabel;
    lbStart && (lbStart.innerHTML = `<span class="status-circle"></span> ${text} <span class="is-mobile">\u2022 ${this.percent}%</span>`);
    const lbEnd = this.querySelector(".lb-end");
    lbEnd && (lbEnd.innerHTML = "PROGRESS ");
    const endNumElm = this.querySelector(".lb-end--number");
    endNumElm && (endNumElm.innerHTML = `${this.percent}%`);
  }
  renderLine() {
    this._wrapperElm.classList.add("i-progress--line");
    this._barElm = this.createElement("div", this._wrapperElm);
    this._barElm.classList.add("i-progress_wrapbar");
    this._barElm.innerHTML = '<div class="i-progress_bar"></div><div class="i-progress_overlay"></div>';
  }
  renderCircle() {
    this._wrapperElm.classList.add("i-progress--circle");
    if (this.width)
      this.height = this.width;
  }
  renderCircleInner() {
    const templateHtml = `<svg viewBox="0 0 100 100">
            <path class="i-progress-circle__track"
            d="${this.trackPath}"
            stroke="${this.status ? this.trackColor : Theme34.divider}"
            stroke-width="${this.relativeStrokeWidth}"
            fill="${this.status ? this.trackColor : "none"}"
            style="${this.trailPathStyle}"></path>
            <path
            class="i-progress-circle__path"
            d="${this.trackPath}"
            stroke="${this.stroke}"
            fill="none"
            stroke-linecap="round"
            stroke-width="${this.percent ? this.relativeStrokeWidth : 0}"
            style="${this.circlePathStyle}"></path>
        </svg>`;
    this._wrapperElm.innerHTML = "";
    this._wrapperElm.innerHTML = templateHtml;
  }
  updateCircleInner() {
    const svgPath = this._wrapperElm.querySelector(".i-progress-circle__path");
    if (svgPath) {
      svgPath.style.strokeDasharray = `${this.perimeter * this.rate * (this.percent / 100)}px, ${this.perimeter}px`;
      svgPath.setAttribute("stroke-width", `${this.percent ? this.relativeStrokeWidth : 0}`);
    }
  }
  init() {
    if (!this.initialized) {
      super.init();
      this.loading = this.getAttribute("loading", true);
      let childNodes = [];
      for (let i = 0; i < this.childNodes.length; i++)
        childNodes.push(this.childNodes[i]);
      this._wrapperElm = this.createElement("div", this);
      this._wrapperElm.classList.add("i-progress");
      const statusAttr = this.getAttribute("status", true);
      statusAttr && (this.status = statusAttr);
      this.type = this.getAttribute("type", true);
      this.showInfo = this.getAttribute("showInfo", true);
      this.percent = this.getAttribute("percent", true);
      this.strokeWidth = this.getAttribute("strokeWidth", true);
      if (this.type === "line") {
        const childLength = childNodes.length;
        if (childLength && this.type === "line") {
          for (let i = 0; i < childLength; i++) {
            const elm = childNodes[i];
            this._barElm && this._barElm.appendChild(elm);
          }
        }
        const dataAttr = this.getAttribute("data", true);
        dataAttr && (this.popupData = dataAttr);
        this.steps = this.getAttribute("steps", true);
        if (this.onRenderStart && typeof this.onRenderStart === "function") {
          this._startElm.innerHTML = "";
          this.onRenderStart(this._startElm);
        }
        if (this.onRenderEnd && typeof this.onRenderEnd === "function") {
          this._endElm.innerHTML = "";
          this.onRenderEnd(this._endElm);
        }
      }
      if (this.type === "circle")
        this.renderCircleInner();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Progress = __decorateClass([
  customElements2("i-progress")
], Progress);
var ProgressItem = class extends Control {
  constructor(parent, options) {
    super(parent, options);
    if (options == null ? void 0 : options.onRenderTooltip)
      this.onRenderTooltip = options.onRenderTooltip;
  }
  get percent() {
    return this._percent;
  }
  set percent(value) {
    this._percent = value || 0;
    this.style.left = `calc(${this._percent}% - ${this.width}px)`;
  }
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
    this.classList.add("is-" + value);
  }
  get popupData() {
    return this._popupData;
  }
  set popupData(value) {
    this._popupData = value;
    if (value) {
      this._popupElm = this.createElement("div", this);
      this._popupElm.classList.add("info-wrapper", "info-wrapper--custom");
      const { label, heading, list } = this.parsedData;
      let html = "";
      if (label) {
        const lbElm = this.createElement("div", this);
        lbElm.classList.add("lb-label");
        lbElm.textContent = label;
      }
      if (heading)
        html += `<div class="info-wrapper_header lb-label">${heading}</div>`;
      if (list) {
        html += '<div class="scroll-srap">';
        html += this.createPopupUI(list);
        html += "</div>";
      }
      this._popupElm.innerHTML = html;
    }
  }
  get parsedData() {
    try {
      return JSON.parse(this.popupData);
    } catch (e) {
      return {};
    }
  }
  createPopupUI(list) {
    if (!list.length)
      return "";
    let html = "";
    for (let item of list) {
      html += `<div class="info-item info-item--child">
                <div class="info-icon">${item.icon || ""}</div>
                <div class="info-content">${item.value}</div>
            </div>`;
    }
    return html;
  }
  init() {
    if (!this.initialized) {
      super.init();
      this.percent = this.getAttribute("percent", true);
      const statusAttr = this.getAttribute("status", true);
      statusAttr && (this.status = statusAttr);
      const dataAttr = this.getAttribute("data", true);
      dataAttr && (this.popupData = dataAttr);
      if (this.onRenderTooltip && typeof this.onRenderTooltip === "function") {
        this._popupElm.innerHTML = "";
        this.onRenderTooltip(this._popupElm);
      }
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
ProgressItem = __decorateClass([
  customElements2("i-progress-item")
], ProgressItem);

// packages/link/src/style/link.css.ts
var Theme35 = theme_exports.ThemeVars;
cssRule("i-link", {
  cursor: "pointer",
  $nest: {
    "&:hover *": {
      color: Theme35.colors.primary.dark
    },
    "> a": {
      transition: "all .3s",
      fontSize: "1rem",
      textDecoration: "underline"
    }
  }
});

// packages/link/src/link.ts
var Link = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      target: "_blank"
    });
  }
  get href() {
    return this._href;
  }
  set href(value) {
    this._href = value;
    this._linkElm.href = value;
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    this._linkElm.innerHTML = value;
  }
  get font() {
    return {
      color: this._linkElm.style.color,
      name: this._linkElm.style.fontFamily,
      size: this._linkElm.style.fontSize,
      bold: this._linkElm.style.fontStyle.indexOf("bold") >= 0
    };
  }
  set font(value) {
    this._linkElm.style.color = value.color || "";
    this._linkElm.style.fontSize = value.size || "";
    this._linkElm.style.fontWeight = value.bold ? "bold" : "";
    this._linkElm.style.fontFamily = value.name || "";
  }
  init() {
    if (!this._linkElm) {
      super.init();
      let childNodes = [];
      for (let i = 0; i < this.childNodes.length; i++) {
        childNodes.push(this.childNodes[i]);
      }
      this._linkElm = this.createElement("a", this);
      this.classList.add("i-link");
      const captionAttr = this.getAttribute("caption", true);
      captionAttr && (this.caption = captionAttr);
      const hrefAttr = this.getAttribute("href", true);
      hrefAttr && (this.href = hrefAttr);
      if (childNodes && childNodes.length) {
        for (let i = 0; i < childNodes.length; i++) {
          this._linkElm.appendChild(childNodes[i]);
        }
      }
      const targetAttr = this.getAttribute("target", true);
      if (targetAttr) {
        this._linkElm.target = targetAttr;
      }
      if (this.attrs.font)
        this.font = this.attrs.font;
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Link = __decorateClass([
  customElements2("i-link")
], Link);

// packages/list-view/src/style/listView.css.ts
var Theme36 = theme_exports.ThemeVars;
var fadeInUp = keyframes({
  "0%": {
    opacity: 0,
    transform: "translate3d(0, 100%, 0)"
  },
  "100%": {
    opacity: 1,
    transform: "translate3d(0, 0, 0)"
  }
});
cssRule("i-list-view", {
  display: "block",
  marginTop: "1.5rem",
  $nest: {
    "*": {
      boxSizing: "border-box"
    },
    "&.list-group": {
      display: "flex",
      position: "relative",
      paddingLeft: 0,
      marginBottom: 0,
      borderRadius: "0.25rem",
      $nest: {
        "&:not(.grid)": {
          flexDirection: "column"
        },
        "&.grid": {
          gridTemplateColumns: "repeat(auto-fill, 450px)",
          gap: "35px",
          flexWrap: "wrap",
          flexGrow: 0,
          justifyContent: "center"
        }
      }
    },
    ".list-item": {
      position: "relative",
      display: "flex",
      backgroundColor: Theme36.action.hover,
      border: `1px solid ${Theme36.divider}`,
      borderRadius: "0.25rem",
      flexDirection: "row",
      padding: "0.75rem 1.25rem",
      overflow: "hidden"
    },
    ".list-item:focus, .list-item:hover": {
      zIndex: 1,
      backgroundColor: Theme36.action.selected,
      transform: "scale(1.06)",
      transformOrigin: "center",
      cursor: "pointer"
    },
    "&.list-group:not(.grid) .list-item": {
      width: "100%",
      animation: `0.4s ease-in 0s 1 normal both running ${fadeInUp}`,
      $nest: {
        "&:hover": {
          transform: "scale(1.02) !important"
        },
        "&:not(:first-child)": {
          marginTop: "1.5rem"
        },
        "@media only screen and (max-width: 767px)": {
          display: "grid",
          gridTemplateAreas: '". ." "info info"',
          $nest: {
            ">.item-content": {
              marginBottom: "1rem"
            },
            ".--info": {
              width: "auto",
              paddingRight: 0,
              gridArea: "info"
            }
          }
        }
      }
    },
    "&.list-group.grid .list-item": {
      width: 450
    },
    "&.list-group:not(.grid).--columns": {
      display: "block",
      columnFill: "auto",
      $nest: {
        ".list-item": {
          display: "block",
          pageBreakInside: "avoid",
          breakInside: "avoid"
        }
      }
    },
    "&.list-group.grid.--columns": {
      display: "inline-block",
      columnFill: "auto",
      $nest: {
        ".list-item": {
          display: "inline-block",
          pageBreakInside: "avoid",
          breakInside: "avoid",
          width: "100%"
        }
      }
    },
    ".list-item.borderless": {
      border: 0
    },
    ".list-item i-image": {
      display: "flex",
      justifyContent: "center",
      marginRight: "1rem",
      width: 150,
      height: 150
    },
    "&.list-group:not(.grid) .--info": {
      display: "inline-flex",
      width: 500,
      paddingRight: "2rem",
      marginTop: "auto",
      marginBottom: "auto",
      textAlign: "center",
      $nest: {
        "&>.item-content": {
          marginLeft: "1.5rem"
        }
      }
    },
    ".--info": {
      display: "none"
    },
    ".item-content": {
      display: "block",
      color: Theme36.text.primary,
      fontFamily: Theme36.typography.fontFamily,
      fontSize: Theme36.typography.fontSize,
      marginRight: "auto"
    },
    ".item-content > *:last-child": {
      marginBottom: 0
    },
    ".item-title, .item-subtitle, .item-small, .item-small-title": {
      marginTop: 0,
      marginBottom: "0.5rem",
      color: Theme36.text.primary
    },
    ".item-title": {
      fontSize: "1.1em",
      fontWeight: 600
    },
    ".item-subtitle": {
      fontSize: "0.95em"
    },
    ".item-small": {
      fontSize: "0.85em"
    },
    ".item-small-title": {
      fontSize: "0.85em",
      fontWeight: 600
    },
    ".item-link": {
      color: Theme36.colors.primary.main,
      textDecoration: "underline",
      cursor: "pointer"
    },
    ".item-summary": {
      height: "3rem",
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      textOverflow: "ellipsis",
      maxWidth: "500px",
      marginBottom: "0.5rem",
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      WebkitBoxOrient: "vertical"
    },
    ".blur": {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: -1,
      display: "block",
      "-webkit-filter": "blur(80px)",
      "-ms-filter": "blur(80px)",
      filter: "blur(80px)",
      backgroundSize: "300%",
      backgroundPosition: "center",
      opacity: 0.6
    }
  }
});

// packages/list-view/src/listView.ts
var ListView = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get type() {
    return this._type;
  }
  set type(value) {
    if (this._type === value)
      return;
    this._type = value;
    if (value === "grid") {
      this.classList.add("grid");
    } else {
      this.classList.remove("grid");
    }
    const items = this.querySelectorAll("i-list-view-item.--custom-background");
    items.forEach((itemNode) => {
      itemNode.updateBackground(value);
    });
  }
  get columns() {
    return this._columns;
  }
  set columns(value) {
    this._columns = value;
    if (value > 0) {
      this.style.columnCount = value.toString();
      this.classList.add("--columns");
    } else {
      this.style.columnCount = "";
      this.classList.remove("--columns");
    }
  }
  set marginTop(value) {
    if (value == null || value == void 0)
      return;
    this.style.marginTop = value + "px";
  }
  propComparator(prop, asc, ignoreCase) {
    return (a, b) => {
      let prop1 = a.getPropValue(prop);
      let prop2 = b.getPropValue(prop);
      if (ignoreCase && typeof prop1 === "string") {
        prop1 = prop1.toLowerCase();
        prop2 = prop2.toLowerCase();
      }
      if (prop1 < prop2)
        return asc ? -1 : 1;
      if (prop1 > prop2)
        return asc ? 1 : -1;
      return 0;
    };
  }
  sort(prop, asc, ignoreCase) {
    asc = asc != null ? asc : true;
    ignoreCase = ignoreCase != null ? ignoreCase : true;
    const items = this.querySelectorAll("i-list-view-item");
    var itemsArray = Array.from(items);
    const sortedElm = itemsArray.sort(this.propComparator(prop, asc, ignoreCase));
    sortedElm.forEach((e) => this.appendChild(e));
  }
  search(value) {
    const items = this.querySelectorAll("i-list-view-item");
    items.forEach((itemNode) => {
      if (!value) {
        itemNode.style.display = "";
      } else {
        let res;
        if (Array.isArray(itemNode.data)) {
          res = itemNode.data.find((_d) => {
            return _d.content.toUpperCase().includes(value.toUpperCase());
          });
        } else {
          res = Object.values(itemNode.data).find((_d) => {
            return _d.toUpperCase().includes(value.toUpperCase());
          });
        }
        if (res) {
          itemNode.style.display = "";
        } else {
          itemNode.style.display = "none";
        }
      }
    });
  }
  init() {
    this.classList.add("list-group");
    this.type = this.getAttribute("type", true) || "list";
    const columns = this.getAttribute("columns", true);
    if (columns) {
      this.columns = columns;
    }
    this.marginTop = this.getAttribute("marginTop", true);
    super.init();
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
ListView = __decorateClass([
  customElements2("i-list-view")
], ListView);
var ListViewItem = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  set background(value) {
    if (typeof value === "object") {
      this._listBackground = value.list;
      this._gridBackground = value.grid;
      this.style.background = value.list;
    } else {
      this._listBackground = this._gridBackground = value;
      this.style.background = value;
    }
    this.classList.add("--custom-background");
  }
  updateBackground(type) {
    if (!this._listBackground && !this._gridBackground)
      return;
    if (type === "list") {
      this.style.background = this._listBackground;
    } else if (type === "grid") {
      this.style.background = this._gridBackground;
    }
  }
  parseValue(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  getContentStyle(contentType) {
    if (contentType) {
      return `item-${contentType}`;
    }
    return "item-text";
  }
  setContent(data, parentElm) {
    if (!Array.isArray(data))
      data = [data];
    const contentDiv = this.createElement("div", parentElm || this);
    contentDiv.classList.add("item-content");
    data.forEach((_d) => {
      const contentChild = this.createElement(_d.url ? "a" : "div", contentDiv);
      switch (typeof _d) {
        case "string":
          contentChild.innerHTML = _d.trim();
          break;
        case "object":
          let prefix = _d.prefix || "";
          let content = _d.content || "";
          contentChild.innerHTML = (prefix + content).trim();
          const contentStyle = this.getContentStyle(_d.contentType);
          contentChild.classList.add(contentStyle);
          if (_d.url) {
            contentChild.href = _d.url;
            contentChild.onclick = (event) => {
              event.stopPropagation();
            };
          }
          if (_d.name) {
            contentChild.setAttribute("name", _d.name);
          }
          break;
        default:
          contentChild.innerHTML = _d || "";
          break;
      }
    });
  }
  setInfoContent(title, fieldName, value, parentElm) {
    const data = [
      {
        content: title.toUpperCase(),
        contentType: "small-title"
      },
      {
        name: fieldName,
        content: `${this._unit} ${this.abbreviateNum(value)}`,
        contentType: "small"
      }
    ];
    this.setContent(data, parentElm);
  }
  abbreviateNum(value) {
    let newValue = value;
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixIdx = 0;
    while (newValue >= 1e3) {
      newValue /= 1e3;
      suffixIdx++;
    }
    if (suffixIdx >= suffixes.length) {
      return value.toString();
    }
    return Number(newValue).toFixed(1) + suffixes[suffixIdx];
  }
  getPropValue(prop) {
    if (Array.isArray(this.data)) {
      const _d = this.data.find((_d2) => _d2.name == prop);
      return _d.content || "";
    } else {
      const _key = Object.keys(this.data).find((_d) => _d == prop);
      return _key ? this.data[_key] : "";
    }
  }
  init() {
    if (!this.imageElm) {
      this.classList.add("list-item");
      const borderless = this.getAttribute("borderless", true) || false;
      if (borderless) {
        this.classList.add("borderless");
      }
      const background = this.parseValue(this.getAttribute("background", true));
      if (background) {
        this.background = background;
      }
      const imgUrl = this.getAttribute("imgUrl", true);
      if (imgUrl) {
        this.imageElm = new Image2(this, {
          width: 120,
          height: 120
        });
        this.imageElm.url = imgUrl;
      } else {
        if (this.firstChild && this.firstChild.nodeName === "I-IMAGE")
          this.imageElm = this.firstChild;
      }
      if (this.imageElm) {
        const imageContainerElm = this.createElement("div", this);
        imageContainerElm.classList.add("image-container");
        this.prepend(imageContainerElm);
        imageContainerElm.appendChild(this.imageElm);
      }
      const blurredOverlay = this.getAttribute("blurredOverlay", true) || false;
      if (blurredOverlay && imgUrl) {
        this.blurElm = this.createElement("div", this);
        this.blurElm.classList.add("blur");
        this.blurElm.style.backgroundImage = `url(${imgUrl})`;
        this.prepend(this.blurElm);
      }
      const data = this.parseValue(this.getAttribute("data", true));
      const autoRender = this.getAttribute("autoRender", true);
      if (data) {
        this.data = data;
        if (autoRender)
          this.setContent(this.data);
      }
      this._stake = this.getAttribute("stake", true);
      this._queryFee = this.getAttribute("queryFee", true);
      this._unit = this.getAttribute("unit", true);
      if (this._stake || this._queryFee) {
        const infoDiv = this.createElement("div", this);
        infoDiv.classList.add("--info");
        if (this._stake) {
          this.setInfoContent("Stake", "stake", this._stake, infoDiv);
        }
        if (this._queryFee) {
          this.setInfoContent("Query Fees", "queryFee", this._queryFee, infoDiv);
        }
      }
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
ListViewItem = __decorateClass([
  customElements2("i-list-view-item")
], ListViewItem);

// packages/count-down/src/style/countDown.css.ts
var Theme37 = theme_exports.ThemeVars;
cssRule("i-count-down", {
  display: "inline-flex",
  $nest: {
    ".wrapper-count-down": {
      width: "100%",
      height: "100%",
      position: "relative",
      $nest: {
        "a": {
          color: Theme37.text.primary,
          fontFamily: Theme37.typography.fontFamily
        },
        ".title": {
          color: Theme37.text.primary,
          margin: "20px",
          display: "inline-block"
        },
        ".count-number": {
          color: Theme37.text.primary,
          fontFamily: Theme37.typography.fontFamily
        }
      }
    }
  }
});

// packages/count-down/src/countDown.ts
var CountDown = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get font() {
    return {
      color: this.style.color,
      name: this.style.fontFamily,
      size: this.style.fontSize,
      bold: this.style.fontStyle.indexOf("bold") >= 0
    };
  }
  set font(value) {
    this.style.color = value.color || "";
    this.style.fontSize = value.size || "";
    this.style.fontWeight = value.bold ? "bold" : "";
    this.style.fontFamily = value.name || "";
  }
  updateValue(value) {
    if (typeof this.onFormat === "function")
      value = this.onFormat(value);
    return value;
  }
  animateValue(elm, value, duration) {
    if (!value) {
      elm.textContent = `${this.updateValue(0)}`;
      return;
    }
    let startTimestamp = 0;
    const intValue = Math.floor(value);
    const decimal = value - intValue;
    const step = (timestamp) => {
      if (!startTimestamp)
        startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const newVal = Math.floor(progress * value);
      const val = intValue === newVal ? intValue + decimal : newVal;
      elm.textContent = `${this.updateValue(val)}`;
      if (progress < 1)
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }
  init() {
    super.init();
    this.value = this.getAttribute("value");
    this._title = this.getAttribute("title");
    this._link = this.getAttribute("link");
    let wrapper = this.createElement("div", this);
    wrapper.classList.add("wrapper-count-down");
    if (this._title) {
      let span;
      if (this._link) {
        let link = this.createElement("a", wrapper);
        link.setAttribute("href", this._link);
        span = this.createElement("span", link);
      } else {
        span = this.createElement("span", wrapper);
      }
      span.innerHTML = this._title;
      span.classList.add("title");
    }
    this.numberElm = this.createElement("div", wrapper);
    this.numberElm.classList.add("count-number");
    this.animateValue(this.numberElm, this.value, 1e3);
    if (this.attrs.font)
      this.font = this.attrs.font;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.numberElm && this.animateValue(this.numberElm, value, 1e3);
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
CountDown = __decorateClass([
  customElements2("i-count-down")
], CountDown);

// packages/loading/src/style/loading.css.ts
var Theme38 = theme_exports.ThemeVars;
var spinnerAnim3 = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
cssRule("i-loading", {
  display: "block",
  $nest: {
    ".i-loading-spinner": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "inline-block",
      textAlign: "center",
      opacity: "1 !important",
      zIndex: 9999
    },
    "&.i-loading--large": {
      $nest: {
        ".i-loading-spinner_text": {
          fontSize: "2rem"
        },
        ".i-loading-spinner_icon": {
          width: 36,
          height: 36
        }
      }
    },
    "&.i-loading--small": {
      $nest: {
        ".i-loading-spinner_text": {
          fontSize: ".75rem"
        },
        ".i-loading-spinner_icon": {
          width: 20,
          height: 20
        }
      }
    },
    "&.i-loading--active": {
      backgroundColor: "transparent",
      position: "relative",
      width: "100%",
      height: "100%",
      $nest: {
        ":not(.i-loading-spinner *)": {
          opacity: 0.5
        },
        "&.i-loading--full": {
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 999,
          width: "100vw",
          height: "100vh"
        },
        "&.i-loading--full:before": {
          content: '""',
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          opacity: 0.8,
          position: "absolute",
          backgroundColor: Theme38.background.default
        }
      }
    },
    "&.i-loading--active .i-loading-spinner_icon": {
      animation: `${spinnerAnim3} 2s linear infinite`,
      opacity: 1
    },
    ".i-loading-spinner_text": {
      fontSize: "1rem",
      display: "block",
      color: Theme38.text.primary,
      fontFamily: Theme38.typography.fontFamily,
      opacity: 1
    },
    ".i-loading-spinner_icon": {
      display: "inline-block",
      marginBottom: ".5rem",
      width: 24,
      height: 24,
      maxWidth: "100%",
      maxHeight: "100%"
    },
    ".i-loading-spinner_icon i-icon": {
      display: "initial"
    },
    ".i-loading-overlay": {
      position: "absolute",
      $nest: {
        "&.--active": {
          width: "100%",
          height: "100%",
          zIndex: 999
        }
      }
    }
  }
});

// packages/loading/src/loading.ts
var Theme39 = theme_exports.ThemeVars;
var defaultValues4 = {
  spinning: true,
  caption: "Loading...",
  size: "default",
  icon: "spinner",
  body: false
};
var Loading = class extends Control {
  constructor(parent, options) {
    super(parent, options, __spreadValues({}, defaultValues4));
  }
  get spinning() {
    return this._spinning;
  }
  set spinning(value) {
    this._spinning = value;
    if (value) {
      this._wrapperElm.style.display = "inline-block";
      if (this.overlay) {
        this._overlayElm.classList.add("--active");
      } else {
        this.style.display = "block";
      }
      this.classList.add("i-loading--active");
      this.body && (document.body.style.overflow = "hidden");
    } else {
      this._wrapperElm.style.display = "none";
      if (this.overlay) {
        this._overlayElm.classList.remove("--active");
      } else {
        this.style.display = "none";
      }
      this.classList.remove("i-loading--active");
      this.body && (document.body.style.overflow = "unset");
    }
  }
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = value;
    this.classList.add(`i-loading--${value}`);
  }
  get caption() {
    return this._caption;
  }
  set caption(value) {
    this._caption = value;
    if (value) {
      const spanElm = this.createElement("span", this._wrapperElm);
      spanElm.classList.add("i-loading-spinner_text");
      spanElm.textContent = value;
    }
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    this._iconWrapperElm.innerHTML = "";
    if (value) {
      if (!this._iconElm) {
        this._iconElm = new Icon();
        this._iconElm.init();
        this._iconElm.fill = Theme39.text.primary;
      }
      this._iconElm.name = value;
      this._iconWrapperElm.appendChild(this._iconElm);
    }
  }
  get imageUrl() {
    return this._imageUrl;
  }
  set imageUrl(value) {
    this._imageUrl = value;
    this._iconWrapperElm.innerHTML = "";
    if (value) {
      const imgElm = new Image();
      imgElm.src = value;
      imgElm.style.width = "100%";
      imgElm.style.height = "100%";
      const self = this;
      imgElm.onerror = function() {
        self.icon = self.getAttribute("icon", true);
      };
      imgElm.onload = function() {
        self._iconWrapperElm.appendChild(imgElm);
      };
    }
  }
  get body() {
    return this._body;
  }
  set body(value) {
    this._body = value;
    if (value)
      this.classList.add("i-loading--full");
    else
      this.classList.remove("i-loading--full");
  }
  get textColor() {
    const spinnerTxt = this._wrapperElm.querySelector(".i-loading-spinner_text");
    return spinnerTxt ? spinnerTxt.style.color : "";
  }
  set textColor(value) {
    const spinnerTxt = this._wrapperElm.querySelector(".i-loading-spinner_text");
    spinnerTxt && value && (spinnerTxt.style.color = value);
  }
  get overlay() {
    return this._overlay;
  }
  set overlay(value) {
    this._overlay = value;
  }
  init() {
    if (!this.initialized) {
      super.init();
      this.classList.add("i-loading");
      this._overlayElm = this.createElement("div", this);
      this.prepend(this._overlayElm);
      this._overlayElm.classList.add("i-loading-overlay");
      this._wrapperElm = this.createElement("div", this);
      this._wrapperElm.classList.add("i-loading-spinner");
      this._iconWrapperElm = this.createElement("div", this._wrapperElm);
      this._iconWrapperElm.classList.add("i-loading-spinner_icon");
      this.body = this.getAttribute("body", true);
      this.size = this.getAttribute("size", true);
      this.overlay = this.getAttribute("overlay", true);
      this.spinning = this.getAttribute("spinning", true);
      this.caption = this.getAttribute("caption", true);
      this.textColor = this.getAttribute("textColor", true);
      const imgAttr = this.getAttribute("imageUrl", true);
      if (imgAttr) {
        this.imageUrl = imgAttr;
      } else {
        this.icon = this.getAttribute("icon", true);
      }
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Loading = __decorateClass([
  customElements2("i-loading")
], Loading);

// packages/table/src/style/table.css.ts
var Theme40 = theme_exports.ThemeVars;
cssRule("i-table", {
  fontFamily: Theme40.typography.fontFamily,
  fontSize: Theme40.typography.fontSize,
  color: Theme40.text.primary,
  display: "block",
  $nest: {
    "> .i-table-container": {
      overflowX: "auto"
    },
    ".i-table-cell": {
      padding: "1rem",
      overflowWrap: "break-word",
      position: "relative",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "normal"
    },
    "> .i-table-container > table": {
      width: "100%",
      textAlign: "left",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    ".i-table-header>tr>th": {
      fontWeight: 600,
      transition: "background .3s ease",
      borderBottom: `1px solid ${Theme40.divider}`
    },
    ".i-table-body>tr>td": {
      borderBottom: `1px solid ${Theme40.divider}`,
      transition: "background .3s ease"
    },
    "tr:hover td": {
      background: Theme40.background.paper,
      color: Theme40.text.secondary
    },
    "&.i-table--bordered": {
      $nest: {
        "> .i-table-container > table": {
          borderTop: `1px solid ${Theme40.divider}`,
          borderLeft: `1px solid ${Theme40.divider}`,
          borderRadius: "2px"
        },
        "> .i-table-container > table .i-table-cell": {
          borderRight: `1px solid ${Theme40.divider} !important`,
          borderBottom: `1px solid ${Theme40.divider}`
        }
      }
    },
    ".i-table-header i-table-column": {
      display: "inline-flex",
      gap: 10,
      alignItems: "center"
    },
    ".i-table-sort": {
      position: "relative",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      width: 20,
      $nest: {
        ".sort-icon": {
          display: "block",
          cursor: "pointer"
        },
        ".sort-icon.sort-icon--active > svg": {
          fill: Theme40.colors.primary.main
        },
        ".sort-icon.sort-icon--desc": {
          marginTop: -5
        }
      }
    },
    ".i-table-pagi": {
      display: "flex",
      $nest: {
        "&.is--left": {
          justifyContent: "flex-start"
        },
        "&.is--right": {
          justifyContent: "flex-end"
        },
        "&.is--center": {
          justifyContent: "center"
        }
      }
    },
    ".i-table-cell--expand": {
      cursor: "pointer",
      $nest: {
        "i-icon": {
          display: "inline-block"
        },
        "i-icon svg": {
          fill: Theme40.text.primary
        }
      }
    },
    ".i-table-row--child > td": {
      borderRight: `1px solid ${Theme40.divider}`
    },
    "@media (max-width: 767px)": {
      $nest: {
        ".hidden-mobile": {
          display: "none !important"
        }
      }
    },
    "@media (min-width: 768px)": {
      $nest: {
        ".hidden-desktop": {
          display: "none !important"
        }
      }
    }
  }
});

// packages/table/src/tableColumn.ts
var Theme41 = theme_exports.ThemeVars;
var TableColumn = class extends Control {
  constructor(parent, options) {
    super(parent, options);
    if (options.column)
      this.column = options.column;
    this.isHeader = options.header || false;
  }
  get dataSource() {
    return this._columnData;
  }
  set dataSource(value) {
    this._columnData = value;
    this.columnElm.innerHTML = `${value}`;
  }
  get column() {
    return this._column;
  }
  set column(value) {
    this._column = value;
  }
  get rowData() {
    return this._rowData;
  }
  set rowData(value) {
    this._rowData = value;
  }
  get sortable() {
    return this._sortable;
  }
  set sortable(value) {
    this._sortable = value;
  }
  get sorter() {
    return this._sorter;
  }
  set sorter(value) {
    this._sorter = value;
  }
  get sortOrder() {
    return this._sortOrder;
  }
  set sortOrder(value) {
    this._sortOrder = value;
    if (value === "asc") {
      this.ascElm && this.ascElm.classList.add("sort-icon--active");
      this.descElm && this.descElm.classList.remove("sort-icon--active");
    } else if (value === "desc") {
      this.ascElm && this.ascElm.classList.remove("sort-icon--active");
      this.descElm && this.descElm.classList.add("sort-icon--active");
    } else {
      this.ascElm && this.ascElm.classList.remove("sort-icon--active");
      this.descElm && this.descElm.classList.remove("sort-icon--active");
    }
    if (typeof this.onSortChange === "function")
      this.onSortChange(this, this.column.dataIndex, value);
  }
  renderSort() {
    if (!this.sortable) {
      this.sortElm && (this.sortElm.style.display = "none");
      return;
    }
    if (!this.sortElm) {
      this.sortElm = this.createElement("div", this);
      this.sortElm.classList.add("i-table-sort");
      this.ascElm = new Icon(this, {
        name: "caret-up",
        width: 14,
        height: 14,
        fill: Theme41.text.primary
      });
      this.ascElm.classList.add("sort-icon", "sort-icon--asc");
      this.ascElm.onClick = () => this.sortOrder = this.sortOrder === "asc" ? null : "asc";
      this.descElm = new Icon(this, {
        name: "caret-down",
        width: 14,
        height: 14,
        fill: Theme41.text.primary
      });
      this.descElm.classList.add("sort-icon", "sort-icon--desc");
      this.descElm.onClick = () => this.sortOrder = this.sortOrder === "desc" ? null : "desc";
      this.sortElm.appendChild(this.ascElm);
      this.sortElm.appendChild(this.descElm);
    }
    this.sortOrder = this.column.sortOrder || null;
    this.sortElm.style.display = "block";
  }
  init() {
    if (!this.columnElm) {
      this.columnElm = this.createElement("div", this);
      this.dataSource = this.getAttribute("data", true);
      if (typeof this.column.render === "function" && !this.isHeader) {
        const renderedElm = this.column.render(this, this.dataSource, this.rowData);
        if (typeof renderedElm === "string") {
          this.columnElm.innerHTML = renderedElm;
        } else {
          this.columnElm.innerHTML = "";
          this.columnElm.appendChild(renderedElm);
        }
      }
      if (this.isHeader) {
        this.columnElm.innerHTML = this.column.title;
        this.sortable = this.column.sortable || false;
        this.renderSort();
      }
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
TableColumn = __decorateClass([
  customElements2("i-table-column")
], TableColumn);

// packages/table/src/utils.ts
var paginate = (array, pageSize2, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize2, pageNumber * pageSize2);
};
var getColumnKey = (columns, columnIdx) => {
  const column = columns[columnIdx];
  return column ? column.dataIndex : "";
};
var getSorter = (columns, key2) => {
  const findedColumn = columns.find((column) => column.dataIndex === key2);
  return findedColumn ? findedColumn.sorter : null;
};
var getValueByPath = function(object, prop) {
  prop = prop || "";
  const paths = prop.split(".");
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current)
      break;
    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};
var orderBy = (list, sortBy, sortValue, sorter) => {
  const getKey = sorter ? null : (value, key2) => {
    console.log(sortBy);
    if (sortBy) {
      if (!Array.isArray(sortBy)) {
        sortBy = [sortBy];
      }
      return sortBy.map((by) => getValueByPath(value, by));
    }
  };
  const compare = (a, b) => {
    if (sorter) {
      return sorter(a.value, b.value);
    }
    for (let i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  const reverse = sortValue === "asc" ? 1 : -1;
  let sortedList = list.map((value, index) => {
    return {
      value,
      index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort((a, b) => {
    let order = compare(a, b);
    if (!order) {
      order = a.index - b.index;
    }
    return order * reverse;
  }).map((data) => data.value);
  return sortedList;
};
var filterBy = (list, value, columnKey) => {
  let searchTerms = [];
  if (value) {
    if (Array.isArray(value) && value.length) {
      searchTerms = value.map((val) => "^" + val + "$");
    } else {
      searchTerms.push("^" + value);
    }
  }
  const searchRegex = new RegExp(searchTerms.join("|"), "g");
  const dataList = [...list];
  return dataList.filter((data) => {
    return data[columnKey].match(searchRegex);
  });
};

// packages/table/src/table.ts
var Theme42 = theme_exports.ThemeVars;
var pageSize = 10;
var Table = class extends Control {
  constructor(parent, options) {
    super(parent, options, {
      bordered: false,
      heading: true,
      tableLayout: "auto"
    });
    this.firstLoad = true;
    this._pagination = {
      totalPage: 0,
      currentPage: 1,
      hideOnSinglePage: true,
      position: "bottomLeft"
    };
    this.expandConfig = {
      showExpandColumn: true,
      expandIcon: (expanded) => {
        return expanded ? `<i-icon name="minus" width=${12} height=${12} fill="#fff"></i-icon>` : `<i-icon name="plus" width=${12} height=${12} fill="#fff"></i-icon>`;
      },
      rowExpandable: true
    };
    this.sortConfig = { key: "", value: null };
    if (options == null ? void 0 : options.onRenderEmptyData)
      this.onRenderEmptyData = options.onRenderEmptyData;
  }
  updatePagination() {
    let size = typeof this.paging === "object" && this.paging.pageSize || pageSize;
    if (typeof size === "object") {
      size = pageSize;
    }
    const total = this.dataSource ? Math.ceil(this.dataSource.length / size) : 0;
    let totalPage = typeof this.paging === "object" && this.paging.totalPage || total;
    if (typeof totalPage === "object") {
      totalPage = total;
    }
    this._pagination.totalPage = totalPage;
    if (this.pagingElm) {
      this.pagingElm.totalPage = totalPage;
      this.pagingElm.visible = totalPage > 1 || totalPage === 1 && !this._pagination.hideOnSinglePage;
      if (this.pagingElm.currentPage > 1 && this.pagingElm.currentPage > totalPage) {
        this.pagingElm.currentPage = totalPage;
      }
    }
  }
  get dataSource() {
    var _a;
    if (this.sortConfig.key && this.sortConfig.value !== null) {
      const sorter = getSorter(this.columns, (_a = this.sortConfig) == null ? void 0 : _a.key);
      const orderList = orderBy([...this._data], this.sortConfig.key, this.sortConfig.value, sorter);
      return orderList;
    }
    return this._data;
  }
  set dataSource(value) {
    this._data = value;
    this.updatePagination();
    this.renderBody();
  }
  get columns() {
    return this._columns;
  }
  set columns(value) {
    this._columns = value;
    this._heading && this.renderHeader();
  }
  get bordered() {
    return this._bordered;
  }
  set bordered(value) {
    this._bordered = value;
    if (value)
      this.classList.add("i-table--bordered");
    else
      this.classList.remove("i-table--bordered");
  }
  get paging() {
    return this._paging;
  }
  set paging(value) {
    this._paging = value === void 0 ? true : value;
    if (value === false) {
      this.pagingElm && (this.pagingElm.visible = false);
    } else {
      if (this.pagingElm) {
        const pagingConfig2 = typeof value === "boolean" ? {} : value;
        if (value && pagingConfig2.currentPage)
          this.pagingElm.currentPage = pagingConfig2.currentPage;
        return;
      }
      ;
      const pagingConfig = typeof value === "boolean" ? {} : value;
      this._pagination = __spreadValues(__spreadValues({}, this._pagination), pagingConfig);
      const { totalPage, currentPage } = this._pagination;
      this.pagingElm = new Pagination(this, {
        marginTop: 20,
        totalPage,
        currentPage,
        style: {
          display: "flex"
        }
      });
      if (this.onChange) {
        this.pagingElm.onChange = this.onChange;
      } else {
        this.pagingElm.onChange = this.onPageChange.bind(this);
      }
      this.wrapperElm.appendChild(this.pagingElm);
      const inTop = this._pagination.position.includes("top");
      inTop && this.wrapperElm.insertBefore(this.pagingElm, this.tableElm);
      const position = this._pagination.position.replace(/top|bottom/g, "").toLowerCase();
      this.pagingElm.classList.add("i-table-pagi", `is--${position}`);
    }
  }
  get expandable() {
    return this._expandable;
  }
  set expandable(value) {
    this._expandable = value;
    this.expandConfig = value && __spreadValues(__spreadValues({}, this.expandConfig), value);
  }
  get hasExpandColumn() {
    return this.expandable && this.expandConfig.showExpandColumn !== false;
  }
  get mobileColumn() {
    return this._mobileColumn;
  }
  set mobileColumn(value) {
    this._mobileColumn = value || [];
  }
  updateExpandColumn() {
    if (this.hasExpandColumn) {
      const trHeader = this.tHeadElm.querySelector("tr");
      const firstHeader = trHeader == null ? void 0 : trHeader.firstElementChild;
      if (firstHeader && firstHeader.classList.contains("i-table-cell--expand"))
        return;
      const thElm = this.createElement("th");
      thElm.classList.add("i-table-cell", "i-table-cell--expand", "text-center");
      if (firstHeader && firstHeader.parentNode)
        firstHeader.parentNode.insertBefore(thElm, firstHeader);
      const trBody = this.tBodyElm.querySelectorAll("tr");
      trBody.forEach((trElm) => {
        const tdElm = this.createElement("td");
        tdElm.classList.add("i-table-cell", "i-table-cell--expand", "text-center");
        tdElm.innerHTML = this.expandConfig.expandIcon(false);
        const tdFirst = trElm == null ? void 0 : trElm.firstChild;
        if (tdFirst && tdFirst.parentNode)
          tdFirst.parentNode.insertBefore(tdElm, tdFirst);
      });
    } else {
      const expandedTd = this.querySelectorAll(".i-table-cell--expand");
      expandedTd.forEach((td) => td.remove());
    }
  }
  get columnLength() {
    return this.columns.length;
  }
  onPageChange(source, value) {
    this._pagination.currentPage = value;
    !this.firstLoad && this.renderBody();
  }
  onSortChange(source, key2, value) {
    console.log(key2, value);
    this.sortConfig = { key: key2, value };
    if (this.dataSource)
      this.renderBody();
  }
  filter(values, columnIdx) {
    const columnKey = getColumnKey(this.columns, columnIdx);
    if (!columnKey)
      return;
    this.dataSource = filterBy(this.dataSource, values, columnKey);
  }
  addClasses(parent, className) {
    if (!className)
      return;
    const classes = className.split(" ");
    classes.forEach((className2) => {
      parent.classList.add(className2);
    });
  }
  renderColGroup() {
    const colgroupElm = this.createElement("colgroup", this.tableElm);
  }
  renderHeader() {
    this.tHeadElm.innerHTML = "";
    const rowElm = this.createElement("tr", this.tHeadElm);
    if (this.hasExpandColumn) {
      const thElm = this.createElement("th", rowElm);
      thElm.classList.add("i-table-cell", "i-table-cell--expand", "text-center");
    }
    var mobileColumn = this.mobileColumn;
    this.columns.forEach((column, colIndex) => {
      let hiddenMobileClass = "";
      if (mobileColumn.length) {
        if (!mobileColumn.includes(colIndex))
          hiddenMobileClass = "hidden-mobile";
      }
      const thElm = this.createElement("th", rowElm);
      thElm.classList.add("i-table-cell");
      hiddenMobileClass && thElm.classList.add(hiddenMobileClass);
      if (column.width) {
        thElm.style.width = typeof column.width === "number" ? `${column.width}px` : column.width;
      }
      const className = column.className || "";
      className && this.addClasses(thElm, className);
      const columnElm = new TableColumn(this, {
        column,
        header: true
      });
      columnElm.onSortChange = this.onSortChange.bind(this);
      thElm.appendChild(columnElm);
      rowElm.appendChild(thElm);
    });
  }
  renderRow(rowElm, rowData, rowIndex) {
    if (this.hasExpandColumn) {
      const expandTd = this.createElement("td", rowElm);
      const expandIcon = this.expandConfig.expandIcon;
      expandTd.innerHTML = expandIcon(false);
      expandTd.classList.add("i-table-cell", "i-table-cell--expand", "text-center");
      expandTd.addEventListener("click", (event) => {
        event.stopPropagation();
        const expandElm = rowElm.nextElementSibling;
        if (expandElm) {
          const hidden = expandElm.style.display === "none";
          expandTd.innerHTML = expandIcon(hidden);
          expandElm.style.display = hidden ? "table-row" : "none";
        }
      });
    }
    var mobileColumn = this.mobileColumn;
    this.columns.forEach((column, colIndex) => {
      let hiddenMobileClass = "";
      if (mobileColumn.length) {
        if (!mobileColumn.includes(colIndex))
          hiddenMobileClass = "hidden-mobile";
      }
      let spanData;
      if (typeof column.onCell === "function")
        spanData = column.onCell(rowData, rowIndex);
      if ((spanData == null ? void 0 : spanData.rowSpan) === 0)
        return;
      if ((spanData == null ? void 0 : spanData.colSpan) === 0)
        return;
      const tdElm = this.createElement("td", rowElm);
      tdElm.classList.add("i-table-cell");
      if (hiddenMobileClass)
        tdElm.classList.add(hiddenMobileClass);
      const className = column.className;
      className && this.addClasses(tdElm, className);
      const colSpan = this.getAttribute("colSpan", true) || 1;
      tdElm.setAttribute("colspan", colSpan);
      (spanData == null ? void 0 : spanData.colSpan) !== void 0 && tdElm.setAttribute("colspan", spanData == null ? void 0 : spanData.colSpan);
      (spanData == null ? void 0 : spanData.rowSpan) !== void 0 && tdElm.setAttribute("rowspan", spanData == null ? void 0 : spanData.rowSpan);
      if (column.width) {
        tdElm.style.width = typeof column.width === "number" ? `${column.width}px` : column.width;
      }
      const columnData = rowData[column.dataIndex];
      const columnElm = new TableColumn(this, {
        column,
        data: columnData != null ? columnData : "--"
      });
      columnElm.rowData = rowData;
      tdElm.appendChild(columnElm);
      tdElm.addEventListener("click", (event) => {
        event.stopPropagation();
        if (typeof this.onRowClick === "function") {
          this.onRowClick(rowElm, rowData, event);
        }
        if (typeof this.onCellClick === "function") {
          this.onCellClick(tdElm, rowData, event);
        }
      });
    });
  }
  renderBody() {
    this.tBodyElm.innerHTML = "";
    if (this.dataSource && this.dataSource.length) {
      const size = typeof this.paging === "object" && this.paging.pageSize || pageSize;
      const dataList = this.paging ? paginate(this.dataSource, size, this._pagination.currentPage) : this.dataSource;
      dataList.forEach((row, rowIndex) => {
        const rowElm = this.createElement("tr", this.tBodyElm);
        rowElm.classList.add("i-table-row");
        const orderClass = (rowIndex + 1) % 2 === 0 ? "even" : "odd";
        rowElm.classList.add(orderClass);
        this.renderRow(rowElm, row, rowIndex);
        const hasExpanded = this.expandable && this.expandConfig.rowExpandable !== false;
        if (hasExpanded) {
          const childElm = this.createElement("tr", this.tBodyElm);
          childElm.classList.add("i-table-row--child");
          childElm.style.display = "none";
          if (this.expandable.expandedReponsive) {
            !this.expandable.expandedReponsive.desktop && childElm.classList.add("hidden-desktop");
            !this.expandable.expandedReponsive.mobile && childElm.classList.add("hidden-mobile");
          }
          const tdChild = this.createElement("td", childElm);
          tdChild.setAttribute("colspan", `${this.columnLength + (this.hasExpandColumn ? 1 : 0)}`);
          const expandElm = this.expandable.expandedRowRender(row);
          if (typeof expandElm === "string")
            tdChild.innerHTML = expandElm;
          else
            tdChild.appendChild(expandElm);
        }
      });
    } else {
      const rowElm = this.createElement("tr", this.tBodyElm);
      const tdElm = this.createElement("td", rowElm);
      tdElm.setAttribute("colspan", `${this.columnLength + (this.hasExpandColumn ? 1 : 0)}`);
      tdElm.classList.add("text-center");
      if (this.onRenderEmptyData && typeof this.onRenderEmptyData === "function") {
        this.onRenderEmptyData(tdElm);
      } else {
        const label = this.createElement("span");
        label.textContent = "No data";
        tdElm.appendChild(label);
      }
    }
    this.firstLoad = false;
  }
  createTable() {
    const tableClasses = this.getAttribute("tableClasses", true);
    const tableID = "TTable_" + Date.now();
    this._tableID = tableID;
    this.tableElm = this.createElement("table", this.wrapperElm);
    this.tableElm.id = tableID;
    this.tableElm.style.width = "100%";
    if (tableClasses)
      this.addClasses(this.tableElm, tableClasses);
    const tableLayout = this.getAttribute("tableLayout", true, "auto");
    this.tableElm.style.tableLayout = tableLayout;
    this.renderColGroup();
    if (this._heading) {
      this.tHeadElm = this.createElement("thead", this.tableElm);
      this.tHeadElm.classList.add("i-table-header");
    }
    this.tBodyElm = this.createElement("tbody", this.tableElm);
    this.tBodyElm.classList.add("i-table-body");
    this.bordered = this.getAttribute("bordered", true) || "";
  }
  init() {
    if (!this.tableElm) {
      this.classList.add("i-table");
      this.wrapperElm = this.createElement("div", this);
      this.wrapperElm.classList.add("i-table-container");
      this._heading = this.getAttribute("heading", true, false);
      this.mobileColumn = this.attrs.mobileColumn || [];
      this.createTable();
      this.expandable = this.attrs.expandable;
      this.columns = this.attrs.columns || [];
      this.paging = this.attrs.paging;
      this.dataSource = this.attrs.dataSource || [];
      this.firstLoad = false;
      super.init();
    }
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
Table = __decorateClass([
  customElements2("i-table")
], Table);

// packages/carousel/src/style/carousel.css.ts
var Theme43 = theme_exports.ThemeVars;
cssRule("i-carousel-slider", {
  display: "block",
  position: "relative",
  width: "100%",
  overflow: "hidden",
  margin: 0,
  padding: 0,
  $nest: {
    ".slider-list": {
      display: "flex",
      position: "relative",
      transition: "transform 500ms ease"
    },
    ".slider-list > *": {
      flexShrink: "0"
    },
    ".dots-pagination": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1rem",
      listStyle: "none",
      $nest: {
        ".--dot": {
          display: "flex",
          margin: "0 0.4rem",
          cursor: "pointer"
        },
        ".--dot > span": {
          display: "inline-block",
          width: "0.8rem",
          height: "0.8rem",
          backgroundColor: "transparent",
          border: `2px solid ${Theme43.colors.primary.main}`,
          borderRadius: "50%",
          transition: "background-color 0.35s ease-in-out"
        },
        ".--active > span": {
          backgroundColor: Theme43.colors.primary.main
        }
      }
    }
  }
});

// packages/carousel/src/carousel.ts
var CarouselSlider = class extends Control {
  constructor(parent, options) {
    super(parent, options);
  }
  get slidesToShow() {
    return this._slidesToShow;
  }
  set slidesToShow(value) {
    this._slidesToShow = value;
  }
  get speed() {
    return this._speed;
  }
  set speed(value) {
    this._speed = value;
    this.sliderListElm.style.transitionDuration = value + "ms";
  }
  get autoplay() {
    return this._autoplay;
  }
  set autoplay(value) {
    this._autoplay = value;
    this.setAutoplay();
  }
  get autoplaySpeed() {
    return this._autoplaySpeed;
  }
  set autoplaySpeed(value) {
    this._autoplaySpeed = value;
    this.setAutoplay();
  }
  set items(nodes) {
    this.sliderListElm.innerHTML = "";
    for (let node of nodes) {
      node.style.width = 100 / this.slidesToShow + "%";
      this.sliderListElm.appendChild(node);
    }
    this.renderDotPagination();
    this.setAutoplay();
  }
  renderDotPagination() {
    this.dotPagination.innerHTML = "";
    this.dotsElm = [];
    if (this.hasChildNodes() && this.sliderListElm.childNodes.length) {
      const childLength = this.sliderListElm.childNodes.length;
      const totalDots = this.slidesToShow > 0 ? Math.ceil(childLength / this.slidesToShow) : childLength;
      for (let i = 0; i < totalDots; i++) {
        const dotElm = this.createElement("li", this.dotPagination);
        dotElm.classList.add("--dot");
        if (i == 0) {
          dotElm.classList.add("--active");
          this._activeDotIndex = i;
        }
        this.createElement("span", dotElm);
        dotElm.addEventListener("click", () => {
          this.onDotClick(i);
          this.setAutoplay();
        });
        this.dotsElm.push(dotElm);
      }
    }
  }
  onDotClick(index) {
    const currentActive = this.dotPagination.querySelector("li.--active");
    const dot = this.dotsElm[index];
    if (currentActive) {
      currentActive.classList.remove("--active");
    }
    dot.classList.add("--active");
    this._activeDotIndex = index;
    const tx = -this.offsetWidth * index;
    this.sliderListElm.style.transform = `translateX(${tx}px)`;
  }
  setAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.autoplay && this.dotsElm.length > 1) {
      this.timer = setInterval(() => {
        const index = this._activeDotIndex + 1 >= this.dotsElm.length ? 0 : this._activeDotIndex + 1;
        this.onDotClick(index);
      }, this.autoplaySpeed);
    }
  }
  init() {
    super.init();
    this.slidesToShow = this.getAttribute("slidesToShow", true) || 1;
    this.sliderListElm = this.createElement("div", this);
    this.sliderListElm.classList.add("slider-list");
    const childNodes = this.querySelectorAll(":not(.slider-list)");
    if (childNodes.length)
      this.sliderListElm.append(...childNodes);
    this.speed = this.getAttribute("speed", true) || 500;
    this.dotPagination = this.createElement("ul", this);
    this.dotPagination.classList.add("dots-pagination");
    this.renderDotPagination();
    this.autoplaySpeed = this.getAttribute("autoplaySpeed", true) || 3e3;
    this.autoplay = this.getAttribute("autoplay", true);
  }
  static async create(options, parent) {
    let component = new this(parent, options);
    component.init();
    return component;
  }
};
CarouselSlider = __decorateClass([
  customElements2("i-carousel-slider")
], CarouselSlider);
  
});