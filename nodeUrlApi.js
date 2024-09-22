// import is not needed because URL is present on the global object: this.URL
// const url = require('node:url');

// The properties of URL API works like getters and setters.

// create a new URL
const yt = new URL('https://www.youtube.com');

// changes the host
yt.host = 'google.com';
console.log(yt.href)
