import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import Path from 'path';

const SolcjsPath = Path.resolve(__dirname, 'solcjs');
if (!fs.existsSync(SolcjsPath))
    fs.mkdirSync(SolcjsPath);

function request(url: string): Promise<{statusCode:number, headers:http.IncomingHttpHeaders, body:string}> {
    return new Promise(function(resolve, reject){
        https.get(url,function(res){
            let body = '';
            res.on('data', (chunk) => (body += chunk.toString()));
            res.on('error', reject);
            res.on('end', () => {
                if (res.statusCode && res.statusCode >= 200 && res.statusCode <= 299) {
                    resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
                } else {
                    reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
                }
            });
        });
    });
};
function getCache(version: string): string {
    let files = fs.readdirSync(SolcjsPath).find(e => new RegExp(`soljson-v${version}\\+commit.[0-9a-f]{8}.js`).test(e));
    return files ? (Path.resolve(SolcjsPath, files)) : '';
}
async function downloadSolc(version?: string): Promise<string|undefined> {
    try {
        version = version || '0.8.19';
        let data = await request("https://solc-bin.ethereum.org/bin/list.json");
        let list = JSON.parse(data.body);
        if (list) {
            let file = list.releases[version || list.latestRelease];
            if (file) {
                let build = list.builds.find((e:any) => e.path == file);
                if (build) {
                    let filename = build.path;
                    let solcjs = await request("https://solc-bin.ethereum.org/bin/" + filename);
                    if (!fs.existsSync(SolcjsPath))
                        fs.mkdirSync(SolcjsPath, {recursive:true});
                    let solcjsPath = Path.resolve(SolcjsPath, filename);
                    fs.writeFileSync(solcjsPath, solcjs.body);
                    return solcjsPath;
                }
            }
        }
    } catch (e) { console.log(e); }
}
async function getSolc(version?: string): Promise<any> {
    let solcjsPath: string | undefined;
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
export class Solc {
    private solc: {[version: string]: any} = {};
    async compile(source: string, version?: string): Promise<any> {
        version = version || '0.8.19';
        let solc = this.solc[version] || await getSolc(version);
        this.solc[version] = solc;
        return solc.compile(source);
    };
};