const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'purge',
    description: 'Deletes an inputted amount of messages.',
    usage: 'e!purge [amount]',
    userPermission: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],

    async execute(message, args, client) {
        const clearMessages = new MessageEmbed()
        const amount = args[1];

        if (!amount || amount == 0) {
            clearMessages
                .setColor('RED')
                .setDescription('🔴 Enter an amount of messages to purge.');

            return message.channel.send({ embeds: [clearMessages] });
        }

        if (isNaN(amount)) {
            clearMessages
                .setColor('RED')
                .setDescription('🔴 Enter a number of messages to purge.');

            return message.channel.send({ embeds: [clearMessages] });
        }

        const msgNum = parseInt(amount);

        if (msgNum > 100) {
            clearMessages
                .setColor('RED')
                .setDescription('🔴 Amount must be less than 100.');

            return message.channel.send({ embeds: [clearMessages] });
        }

        try {
            await message.channel.bulkDelete(msgNum);

            clearMessages
                .setColor('GREEN')
                .setDescription(`Purged ${msgNum} messages 👽`);
        } catch (error) {
            console.error(error);
        }

        const msg = await message.channel.send({ embeds: [clearMessages] });

        setTimeout(() => msg.delete(), 5000);
    },
});
