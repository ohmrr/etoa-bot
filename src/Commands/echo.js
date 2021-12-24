const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'echo',
    description: 'Repeats what you say.',
    usage: 'e!echo [message]',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES'],

    async execute(message, args, client) {
        if (!args[1])
            return message.channel.send('What do you want me to repeat? 👽');

        const input = args.splice(1).join(' ');

        message.channel.send(input);
    },
});
