const https = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/',
    method: 'GET'
};

const req = https.request(options, res => {
    const statusCode = res.statusCode;

    res.on('data', data => process.stdout.write(data));
})

req.on('error', error => console.log(error));
req.end();