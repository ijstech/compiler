const http = require('http');
const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, '../dist');
const modulePath = path.join(__dirname, '../test/static');

http.createServer(function (request, response) {
    var url = request.url;
    var filePath;
    let files = url.split('/');
    if (files.length == 2)
        filePath = path.join(modulePath, files[1] || 'index.html')
    else if (url.indexOf('/dist/') >= 0)
        filePath = path.join(__dirname, '..', url)
    else
        filePath = path.join(modulePath, url);
    filePath = path.resolve(filePath);
    if (!filePath.indexOf(distPath) == 0 && !filePath.indexOf(modulePath) == 0) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(content, 'utf-8');
        return;
    }
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

    fs.readFile(filePath, function (error, content) {
        if (error) {
            console.dir('File not found!');
            console.dir(request.url);
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end('404 not found!', 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8081);
console.log('Server running at http://localhost:8081/');