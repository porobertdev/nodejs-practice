const asyncHandler = require('express-async-handler');
const CustomError = require('../CustomError');

/* 
    Method 1: using plain try...catch(err) {} block.
*/
const createUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // something
        console.log(`Creating user with ID: ${userId}\n`);

        // end request-response cycle
        res.send('Ok.');
    } catch(err) {
        console.log(`Error occured: ${err}`);
    }
};

/*
    Method 2: using `express-async-handler` module.
    
    This catches any thrown error, and will use `next(err)`
    to pass it to Error middleware function from `usersRouter.js`.
*/
const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
        const user = await someDBQueryToGetUser(userId);

        if (!user) {
            // res.status(404).send('User not found!');
            throw new CustomError('User not found', 404);
        }

        res.send(`User found: ${user.name}`);
});

// Mocked DB function & method 2 of catching errors
const someDBQueryToGetUser = async (userId) => {

    
    /* if (isNaN(+userId)) {
        throw Error("UserId can't be converted to a number.");
    } */

    return;
};

module.exports = { createUser, getUserById };