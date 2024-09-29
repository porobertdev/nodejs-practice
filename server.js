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

const pages = ['/index', '/about', '/contact-me'];

// Routes
app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('*', (req, res) => {
    if (pages.includes(req.url)) {
        res.sendFile(`./pages${req.url}.html`, {root: __dirname});
    } else {
        // page doesn't exist
        res.sendFile('./pages/404.html', {root: __dirname});
    }
});

app.listen(options.port, options.hostname, () => console.log(`Express Server running on ${options.hostname}:${options.port}`));