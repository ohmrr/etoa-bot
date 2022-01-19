const Event = require('../Structures/Event.js');

module.exports = new Event('ready', true, (client) => {
  client.logger.log(`\n${client.lastStarted}: `);
  client.logger.ready(
    `Logging in as ${client.user.tag}... \neTOA-001 is ready for use.\n`
  );

  client.user.setActivity('eTOA-001 | ' + client.prefix, { type: 'WATCHING' });
});
