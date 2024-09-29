const express = require('express');


const options = {
    // hostname: 0.0.0.0 to make it accessible from phone connected to wifi
    hostname: '127.0.0.1',
    port: 3000,
};

const app = express();

// Middleware function
function logConnection(req, res, next) {
    console.log('Someone made a request.');
    next();
}

app.use(logConnection);

// Routes
app.get('/', (req, res) => res.sendFile('./pages/index.html', {root: __dirname}));

app.get('/about', (req, res) => res.sendFile('./pages/about.html', {root: __dirname}));

app.get('/contact-me', (req, res) => res.sendFile('./pages/contact-me.html', {root: __dirname}));

// handle routes that don't exist
app.get('*', (req, res) => res.status(400).sendFile('./pages/404.html', {root: __dirname}));

app.listen(options.port, options.hostname, () => console.log(`Express Server running on ${options.hostname}:${options.port}`));