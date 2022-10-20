const http = require('http');
const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, '../dist');
const port = 8080;

http.createServer(function (request, response) {    
    var url = request.url;
    var filePath;
    let files = url.split('/');    
    if (url == '/')
        filePath = path.join(distPath, files[1] || 'index.html')
    else
        filePath = path.join(distPath, url);   
    filePath = path.resolve(filePath);    
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            console.dir('File not found!');
            console.dir(request.url);
            if(error.code == 'ENOENT'){
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('404 not found!', 'utf-8');
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log(`Server running at http://localhost:${port}`);