const { Router } = require('express');

const usersRouter = Router();

// Route Parameters using variables to capture request parameters
usersRouter.get('/:userId/books/:bookId', (req, res) => {
    const { userId, bookId } = req.params;

    console.log(`${(+userId === 0) ? 'Admin' : 'Normal'} user read a book with ID ${bookId}`);

    res.send(req.params);
});

// Redirect request if user is admin
usersRouter.get('/:username', (req, res) => {
    if (req.params.username === 'admin') {
        console.log('Redirecting...');
        res.redirect('/login/admin/dashboard');
        console.log(res.statusCode)
    } else {
        res.send('Access denied.');
    }
});

module.exports = usersRouter;