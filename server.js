const http = require('node:http');

// convert obj to JSON to be served on server requests
const data = JSON.stringify([
    {
      id: "A1",
      name: "Vacuum Cleaner",
      rrp: "99.99",
      info: "The most powerful vacuum in the world.",
    },
    {
      id: "A2",
      name: "Leaf Blower",
      rrp: "303.33",
      info: "This product will blow your socks off.",
    },
    {
      id: "B1",
      name: "Chocolate Bar",
      rrp: "22.40",
      info: "Delicious overpriced chocolate.",
    },
]);

const server = http.createServer( (req, res) => {

    console.log('request received.');

    // set CORS headers
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5050');

    // set content-type header to JSON
    res.writeHead(200, { 'Content-Type': 'application/json'});

    // send data
    res.end(data);
});

server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000/');
});

server.on('connection', () => console.log('Someone made a request.'));