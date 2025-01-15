"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solc = void 0;
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const SolcjsPath = path_1.default.resolve(__dirname, 'solcjs');
if (!fs.existsSync(SolcjsPath))
    fs.mkdirSync(SolcjsPath);
const DEFAULT_VERSION = '0.8.19';
function request(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function (res) {
            let body = '';
            res.on('data', (chunk) => (body += chunk.toString()));
            res.on('error', reject);
            res.on('end', () => {
                if (res.statusCode && res.statusCode >= 200 && res.statusCode <= 299) {
                    resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
                }
                else {
                    reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
                }
            });
        });
    });
}
;
function getCache(version) {
    let files = fs.readdirSync(SolcjsPath).find(e => new RegExp(`soljson-v${version}\\+commit.[0-9a-f]{8}.js`).test(e));
    return files ? (path_1.default.resolve(SolcjsPath, files)) : '';
}
async function downloadSolc(version) {
    try {
        version = version || DEFAULT_VERSION;
        let data = await request("https://solc-bin.ethereum.org/bin/list.json");
        let list = JSON.parse(data.body);
        if (list) {
            let file = list.releases[version || list.latestRelease];
            if (file) {
                let build = list.builds.find((e) => e.path == file);
                if (build) {
                    let filename = build.path;
                    let solcjs = await request("https://solc-bin.ethereum.org/bin/" + filename);
                    if (!fs.existsSync(SolcjsPath))
                        fs.mkdirSync(SolcjsPath, { recursive: true });
                    let solcjsPath = path_1.default.resolve(SolcjsPath, filename);
                    fs.writeFileSync(solcjsPath, solcjs.body);
                    return solcjsPath;
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}
async function getSolc(version) {
    let solcjsPath;
    if (version)
        solcjsPath = getCache(version);
    if (!solcjsPath) {
        solcjsPath = await downloadSolc(version);
    }
    if (!solcjsPath) {
        return null;
    }
    let solc = require("solc/wrapper")(require(solcjsPath));
    return solc;
}
class Solc {
    constructor() {
        this.solc = {};
    }
    async compile(source, version) {
        version = version || DEFAULT_VERSION;
        let solc = this.solc[version] || await getSolc(version);
        this.solc[version] = solc;
        return solc.compile(source);
    }
    ;
}
exports.Solc = Solc;
;
