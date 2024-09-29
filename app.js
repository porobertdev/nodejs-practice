const express = require('express');
const path = require('path');
const usersRouter = require('./routes/usersRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/users', usersRouter);

app.get('/', (req, res) => res.send('Hello world!'));
app.post('/', (req, res) => res.send('Got POST request'));
app.put('/user', (req, res) => res.send('Got a PUT request at /user'));
app.delete('/user', (req, res, next) => {
    /*
    if there's another middleware function assigned
    to the same route, then jump to it using next()
    
    if you remove `next` logic, then it will send
    the response from this middleware function.
    */
   if (next) {
       next();
    } else {
        res.send('Got DELETE request at /user')
    }
});

// do something for all method requests
app.all('/user', (req, res) => {
    res.send('This response is given to all /user requests.')
});

app.get('/about', (req, res) => res.sendFile(path.join(__dirname, './public', 'about.html')));

app.get('/login/:username/dashboard', (req, res) => {
    if (req.params.username === 'admin') {
        res.send('Access granted for admin.');
    }
});

// Chained middleware functions
app.get('/list/users', (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
}, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
}, (req, res, next) => {
    console.log('This is the third middleware function');

    // uses 'route' to skip/bypass next middlewares.
    // it's like saying "stop here"
    next('route');
}, (req, res) => {
    console.log('Fourth middleware function, but wont get called');
});

// Regex Route
// moved at the bottom to allow /users/admin route to work.
/* app.get(/a/, (req, res) => res.send('This response matches endpoints that contains letter `a` using a Regex pattern')); */


// Chained Route Handler: multiple HTTP methods on the same route
app.route('/book')
    .get((req, res) => {
        res.send('Get a random book.');
    })
    .post((req, res) => {
        res.send('Add a book.')
    })
    .put((req, res) => {
        res.send('Update the book.');
    });

// Serve static files
app.use(express.static('public')); // can access /about.html
// with virtual path: /static/about.html
app.use('/static', express.static('public'));

// Start the server
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
