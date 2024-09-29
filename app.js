const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Route
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

// Route Parameters using variables to capture request parameters
app.get('/users/:userId/books/:bookId', (req, res) => {
    const { userId, bookId } = req.params;

    console.log(`${(+userId === 0) ? 'Admin' : 'Normal'} user read a book with ID ${bookId}`);

    res.send(req.params);
});

// Redirect request if user is admin
app.get('/users/:username', (req, res) => {
    if (req.params.username === 'admin') {
        console.log('Redirecting...');
        res.redirect('/login/admin/dashboard');
        console.log(res.statusCode)
    } else {
        res.send('Access denied.');
    }
});

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
