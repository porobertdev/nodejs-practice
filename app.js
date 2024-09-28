const express = require('express');
const app = express();

// Route
app.get('/', (req, res) => res.send('Hello world!'));

const PORT = 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
