const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'status',
    aliases: ['activity'],
    description: 'Changes the status of the bot.',
    usage: 'e!status [type] [status]',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES'],

    async execute(message, args, client) {
        const statusChanged = new MessageEmbed();

        if (!message.author.id === client.ownerId) {
            statusChanged
                .setColor('RED')
                .setDescription('🔴 You are not the owner of this bot.');

            return message.channel.send({ embeds: [statusChanged] });
        }

        if (!args[1]) {
            statusChanged
                .setColor('RED')
                .setDescription('🔴 You are missing the type of activity.');

            return message.channel.send({ embeds: [statusChanged] });
        }

        if (!args[2]) {
            statusChanged
                .setColor('RED')
                .setDescription(
                    '🔴 You are missing the message of the activity.'
                );

            return message.channel.send({ embeds: [statusChanged] });
        }

        const types = ['PLAYING', 'WATCHING', 'LISTENING', 'COMPETING'];
        const statusType = args[1].toUpperCase();
        const statusMessage = args.slice(2).join(' ');

        const isValid = types.includes(statusType);

        if (!isValid) {
            statusChanged
                .setColor('RED')
                .setDescription(`🔴 That is not a valid type of activity`);

            return message.channel.send({ embeds: [statusChanged] });
        }

        try {
            client.user.setActivity(statusMessage, { type: statusType });

            statusChanged
                .setColor('GREEN')
                .setDescription(`Status successfully changed 👽`);
        } catch (error) {
            console.error(error);

            statusChanged
                .setColor('RED')
                .setDescription('🔴 Command failed...');
        }
    },
});
