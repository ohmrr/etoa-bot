const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'echo',
    description: 'Repeats what you say.',
    permission: 'SEND_MESSAGES',

    async execute(message, args, client) {
        const input = args.splice(1).join(' ');

        message.channel.send(input);
    },
});
