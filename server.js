const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer( async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const catFact = await getCatFact();
    console.log("🚀 ~ server ~ catFact:", catFact)

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