const { createServer } = require('node:http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer( async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const catFact = await getCatFact();
    console.log("🚀 ~ server ~ catFact:", catFact)

    // write to file
    saveData(catFact);

    res.end(catFact);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

async function getCatFact() {
    const response = await fetch('https://catfact.ninja/fact');

    const data = await response.json();
    console.log(data);

    return data.fact;
}

function saveData(data) {
    // fs.appendFile() - file path, data, cb to handle error
    fs.appendFile('./data/catFacts.txt', `\n${data}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('data saved succesfully!')
        }
    });
}