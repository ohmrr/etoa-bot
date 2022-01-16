const Event = require('../Structures/Event.js');
const chalk = require('chalk');

module.exports = new Event('ready', (client) => {
  console.log(
    chalk.green.bold(
      `\n\nLogging in as ${client.user.tag}... \neTOA-001 is ready for use.\n`
    )
  );

  client.user.setActivity('eTOA-001 | ' + client.prefix, { type: 'WATCHING' });
});
