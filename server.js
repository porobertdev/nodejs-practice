const { createServer } = require('node:http');
const fs = require('fs');
const eventEmitter = require('./events');
const sendMail = require('./sendMail');
const dotenv = require('./environmentVars');

// load .env variables
dotenv();

// support to upload files
const busboy = require('busboy');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer( async (req, res) => {
    console.log("🚀 ~ server ~ req:", req.url);

    res.statusCode = 200;

    if (req.method === 'POST') {
        console.log('POST request');

        const bb = busboy({ headers: req.headers });

        console.log("🚀 ~ server ~ bb:", bb)
        bb.on('file', (name, file, info) => {
            console.log("🚀 ~ bb.on ~ info:", info)
            console.log('\n[UPLOAD] - Uploading file...')

            const saveTo = path.join('./data/upload', info.filename);
            file.pipe(fs.createWriteStream(saveTo));
            console.log('\n[UPLOAD] - Finished to write file.')
        });
        bb.on('close', () => {
            console.log('\n[UPLOAD] - Complete.');
            res.writeHead(200, { 'Connection': 'close' });
            res.end('Upload done.');
        })

        req.pipe(bb);
    } else if (req.url === '/') {
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
    } else if (req.url === '/readStream') {
        res.writeHead(200, { 'Content-Type': 'application/json'});

        const readStream = fs.createReadStream('./data/catFacts.txt', 'utf8');

        // Trigger event when data chunks are flowing
        readStream.on('data', (chunk) => {
            console.log(`\nReceived chunk:\n\n ${chunk}`);
        });

        // Trigger event when all chunks have been handled
        readStream.on('end', () => {
            console.log('\n\nData reading complete.\n\n');
        });

        readStream.on('error', (err) => {
            console.error(`Error occured: ${err}`);
        });

        res.end();
    }
});

server.listen(port, hostname, () => {
    eventEmitter.emit('created');

    console.log(`Server running at http://${hostname}:${port}/ - [MODE: ${process.env.NODE_ENV}]`);
    
})

// use EventEmitter
server.on('connection', () => {
    console.log('\n[CONNECTION] - Someone connected.\n');
    sendMail('Someone has connected to your server.')
});

async function getCatFact() {
    const response = await fetch('https://catfact.ninja/fact');

    const data = await response.json();
    
    // trigger event
    eventEmitter.emit('get fact');
    
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