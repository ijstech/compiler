const { promises: Fs} = require("fs")
const Path = require('path');

async function mkdir(path){
    try{
        await Fs.mkdir(path, { recursive: true });
    }
    catch(err){}
}
async function copyDir(src, dest) {
    await mkdir(dest);
    let entries = await Fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = Path.join(src, entry.name);
        let destPath = Path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await Fs.copyFile(srcPath, destPath);
    }
}
async function copyFile(src, dest) {    
    let dir = Path.dirname(dest);
    await mkdir(dir);
    await Fs.copyFile(src, dest);    
};
async function readFile(fileName) {
    let result = await Fs.readFile(fileName, 'utf8');
    return result;
}
async function writeFile(fileName, content) {
    try{        
        await Fs.writeFile(fileName, content, 'utf8');
    }
    catch(err){
        console.dir(err)
    }
}
async function bundle(){
    let content = await readFile(Path.resolve(__dirname, '../src/lib/lib.d.ts'));
    content = content.replace('"$`": string;', '"$\\`": string;');
    await writeFile(Path.resolve(__dirname, '../src/lib.ts'), //`///<amd-module name='@ijstech/compiler/lib'/>
`const Lib:string=\`
${content}\`;
export default Lib;`)
}
bundle();