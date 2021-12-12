const Command = require('../Handlers/Command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot.',

    async run(message, args, client) {
        message.channel.send(`${client.ws.ping} ms 👽`);
    },
});