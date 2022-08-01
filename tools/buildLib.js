const { promises: Fs } = require("fs")
const Path = require('path');

async function mkdir(path) {
    try {
        await Fs.mkdir(path, { recursive: true });
    }
    catch (err) { }
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
    try {
        let dir = Path.dirname(fileName);
        await mkdir(dir);
        await Fs.writeFile(fileName, content, 'utf8');
    }
    catch (err) { }
}
async function bundle() {
    await mkdir(Path.resolve(__dirname, '../bundle'));
    let es5 = await readFile(Path.resolve(__dirname, '../node_modules/typescript/lib/lib.es5.d.ts'));
    es5 = es5.replace(/\`/g, '"')
    let dom = await readFile(Path.resolve(__dirname, '../node_modules/typescript/lib/lib.dom.d.ts'));
    dom = dom.replace(/\`/g, '"')
    await writeFile(Path.resolve(__dirname, '../bundle/lib.ts'), `
declare var global:any;
${es5}
${dom}
`);
};
bundle();