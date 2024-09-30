const { Router } = require('express');
const userController = require('../controllers/userController');

const usersRouter = Router();

// Route Parameters using variables to capture request parameters
usersRouter.get('/:userId/books/:bookId', (req, res) => {
    const { userId, bookId } = req.params;

    console.log(`${(+userId === 0) ? 'Admin' : 'Normal'} user read a book with ID ${bookId}`);

    res.send(req.params);
});

// Redirect request if user is admin
usersRouter.get('/:username', (req, res) => {
    const username = req.params.username;

    if (username === 'admin') {
        console.log('Redirecting...');
        res.redirect('/login/admin/dashboard');
        console.log(res.statusCode)
    } else {
        // this error is catched by Error middleware function at the bottom
        throw new Error(`Access denied for user: ${username}`);
    }
});

// Controller
usersRouter.get('/create/:id', userController.createUser);
usersRouter.get('/id/:id', userController.getUserById);

/*
    Method 3 for catching errors: An Error middleware function.
*/
usersRouter.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.statusCode).send(err);
});

module.exports = usersRouter;