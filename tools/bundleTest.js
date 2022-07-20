const { promises: Fs} = require("fs")
const Path = require('path');
const { isFunctionDeclaration } = require("typescript");

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
    let content = await readFile(Path.resolve(__dirname, '../bundle/editor.js'));    
    content = content.replace(/global.\$JSX\("i-/g, 'this.$render("i-');
    await writeFile(Path.resolve(__dirname, '../test/static/editor/editor.js'), content);
}
bundle();