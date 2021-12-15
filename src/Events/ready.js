const Event = require('../Handlers/Event.js');

module.exports = new Event('ready', (client) => {
    console.log('All modules loaded. eTOA-001 is up and running.');
});