const Event = require('../Structures/Event.js');

module.exports = new Event('ready', (client) => {
    console.log('eTOA-001 is ready for use.');
});