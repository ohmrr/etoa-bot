const Event = require('../Structures/Event.js');

module.exports = new Event('ready', (client) => {
    console.log('\neTOA-001 is ready for use.');

    client.user.setActivity('eTOA-001 | ' + client.prefix, { type: 'WATCHING' });
});
