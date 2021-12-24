const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot',
    usage: 'e!ping',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES'],

    async execute(message, args, client) {
        const pong = ['Pong', 'Poing', 'Peng', 'Pang', 'Pung', 'Boing', 'Ping'];
        const msg = '**' + pong[Math.round(Math.random() * pong.length)] + '**';

        message.channel.send(msg).then((result) => {
            const ping = result.createdTimestamp - message.createdTimestamp;

            result.edit(
                `${msg}: ${ping}ms\n**Websocket**: ${client.ws.ping}ms 👽`
            );
        });
    },
});
