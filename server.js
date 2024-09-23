const http = require('node:http');
const fs = require('node:fs');
const getHTMLPath = require('./getPath');

const options = {
    // hostname: 0.0.0.0 to make it accessible from phone connected to wifi
    hostname: '127.0.0.1',
    port: 3000,
    path: '/',
    method: 'GET'
};

const server = http.createServer((req, res) => {
    console.log("🚀 ~ server ~ req:", req.url);

    res.writeHead(200, {'Content-Type': 'text/html'});

    // pick the HTML file that user tries to access
    const htmlPage = getHTMLPath(req.url);

    // read the HTML content to include it in the response for client
    fs.readFile(htmlPage, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    });
})

server.listen(options.port, options.hostname, () => {
    console.log(`Listening on ${options.hostname}:${options.port}`);
})

server.on('connection', () => {
    console.log('Someone has connected.');
});