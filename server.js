const http = require('node:http');
const mockData = require('./static/mockService');

const server = http.createServer( (req, res) => {

    console.log('request received.');
    let body = '';

    if (req.method === 'POST') {
      req.on('data', buffer => {
          body += buffer.toString(); // convert Buffer to string
      });
      req.on('end', () => {
          console.log(body);
          body = JSON.parse(body);

          const { name, price: rrp, info, category } = body;

          if (!Object.keys(mockData).includes(name)) {
            mockData[category].push({ id: name, name, rrp, info });
          }
      });
    }

    // set CORS headers
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5050');

    // set content-type header to JSON
    res.writeHead(200, { 'Content-Type': 'application/json'});

    // send data
    let endpoint;
    if (req.url === '/confectionery') {
      endpoint = 'confectionery';
    } else {
      endpoint = 'electronics';
    }

    

    res.end(JSON.stringify(mockData[endpoint]));
});

server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000/');
});

server.on('connection', () => console.log('Someone made a request.'));