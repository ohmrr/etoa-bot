const Command = require('../Handlers/Command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot.',

    async run(message, args, client) {
        message.channel.send('Bot Latency:').then((result) => {
            const ping = result.createdTimestamp - message.createdTimestamp;
            
            result.edit(`Bot: ${ping}ms , API: ${client.ws.ping}ms 👽`);
        });
    },
});
