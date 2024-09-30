const getUserById = async (req, res) => {
    const userId = req.params.id;

    const user = await someDBQueryToGetUser(userId);

    if (!user) {
        res.status(404).send('User not found!');
        return;
    }

    res.send(`User found: ${user.name}`);
};

// Mocked DB function
const someDBQueryToGetUser = async (userId) => {
    return '';
};

module.exports = getUserById;