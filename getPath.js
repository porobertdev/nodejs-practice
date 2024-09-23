const fs = require('node:fs');

const pagesPath = './pages/';

/* 
I know, pages are hard-coded, but I had troubles with fs.readDir,
and I just want to practice endpoitns and move fast.
*/
const pages = ['404', 'about', 'contact-me', 'index'];

const getHTMLPath = (url) => {
    let html;

    if (url === '/') {
        html = 'index';
    } else {
        url = url.split('/')[1];

        if (!pages.includes(url)) {
            html = '404';
        } else {
            html = `${url}`
        }
    }

    return `${pagesPath}${html}.html`;
}

module.exports = getHTMLPath;