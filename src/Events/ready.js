const Event = require('../Structures/Event.js');

module.exports = new Event('ready', (client) => {
  client.logger(
    'ready',
    `\n\nLogging in as ${client.user.tag}... \neTOA-001 is ready for use.\n`
  );

  client.user.setActivity('eTOA-001 | ' + client.prefix, { type: 'WATCHING' });
});
