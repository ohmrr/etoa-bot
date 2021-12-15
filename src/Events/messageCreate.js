const Event = require('../Handlers/Event.js');
const config = require('../Data/config.json');

module.exports = new Event('messageCreate', (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.guild) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);
    const command = client.commands.find((cmd) => cmd.name === args[0]);

    if (!command) return;

    command.run(message, args, client);
});