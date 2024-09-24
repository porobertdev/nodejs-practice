const http = require('node:http');
const mockData = require('./static/mockService');

const server = http.createServer( (req, res) => {

    console.log('request received.');

    // set CORS headers
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5050');

    // set content-type header to JSON
    res.writeHead(200, { 'Content-Type': 'application/json'});

    // send data
    res.end(mockData);
});

server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000/');
});

server.on('connection', () => console.log('Someone made a request.'));