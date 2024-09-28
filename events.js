const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

// create new events like what's available for .addEventListener();
eventEmitter.on('get fact', () => console.log('\n[CAT API] - Getting a new fact.\n'))

eventEmitter.on('write', (fileName) => console.log(`[FILES] Successfully wrote data to ${fileName}`));

eventEmitter.once('created', () => console.log('\n[SERVER] - Server was created.'));

module.exports = eventEmitter;