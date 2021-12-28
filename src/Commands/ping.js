const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot',
    usage: 'e!ping',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES'],

    async execute(message, args, client) {
        const resultList = ['Ping', 'Pong', 'Peng', 'Pang', 'Pung', 'Boing'];
        const result = resultList[Math.round(Math.random() * resultList.length)];

        const msg = await message.channel.send(`**${result}**: ... | Websocket: ...`);
        const ping = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`**${result}**: ${ping}ms | **Websocket**: ${client.ws.ping}ms 👽`);
    },
});
