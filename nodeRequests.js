const https = require('https');

const options = {
    hostname: 'catfact.ninja',
    port: 443,
    path: '/fact',
    method: 'GET'
};

const req = https.request(options, res => {
    const statusCode = res.statusCode;

    console.log(statusCode);

    // handler for successful request
    res.on('data', data => {
        process.stdout.write(data);
    });
})


// handler for denied request
req.on('error', err => console.log(err));

// end the request
req.end();