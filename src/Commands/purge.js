const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'purge',
    description: 'Deletes an inputted amount of messages.',
    usage: 'e!purge [amount]',
    userPermission: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],

    async execute(message, args, client) {
        const amount = args[1];

        if (!amount)
            return message.channel.send('You need to input an amount 👽');
        if (isNaN(amount))
            return message.channel.send('You need to enter a number 👽');

        const msgNum = parseInt(amount);

        if (msgNum > 100)
            return message.channel.send(
                'You cannot delete more than 100 messages 👽'
            );

        try {
            (await message.channel.bulkDelete(msgNum));
        } catch (error) {
            console.error(error);
        }

        await message.channel.send(`Deleted ${msgNum} messages 👽`);
    },
});
