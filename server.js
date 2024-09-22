const { createServer } = require('node:http');
const fs = require('fs');
const eventEmitter = require('./events');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer( async (req, res) => {
    console.log("🚀 ~ server ~ req:", req.url);

    res.statusCode = 200;

    if (req.url === '/') {
        // if (req.ur)
        // res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        const catFact = await getCatFact();

        // create html file
        createHTMLPage(catFact);

        fs.readFile('./index.html', (err, data) => {
            if (err) {
                console.log('[ERROR] - index.html doesnt exist');
            } else {
                console.log('[FILE] - Reading index.html');
                res.write(data);
                res.end(catFact);
            }
        })

        // write to file
        saveData(catFact);
    } else if (req.url === '/upload') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        fs.readFile('./upload-file.html', (err, data) => {
            if (err) {
                // some shit :p
            } else {
                res.write(data);
            }
        })
    }
});

server.listen(port, hostname, () => {
    eventEmitter.emit('created');

    console.log(`Server running at http://${hostname}:${port}/`);
})

// use EventEmitter
server.on('connection', () => console.log('\n[CONNECTION] - Someone connected.\n'));
async function getCatFact() {
    const response = await fetch('https://catfact.ninja/fact');

    const data = await response.json();
    
    // trigger event
    eventEmitter.emit('get fact');
    
    console.log(data);

    return data.fact;
}

function saveData(data) {
    const fileName = 'catFacts.txt';
    // fs.appendFile() - file path, data, cb to handle error
    fs.appendFile(`./data/${fileName}`, `\n${data}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('data saved succesfully!')

            // event emitter
            eventEmitter.emit('write', fileName);
        }
    });
}

function createHTMLPage(text) {
    const html = `
        <h1>Cat Fact</h1>
        <p>${text}</p>
    `;
    const filePath = './index.html';

    fs.writeFile(filePath, html, (err) => {
        if (err) {
            console.log(`[ERROR] - Failed to create file: ${filePath}`);
        }
    })
}