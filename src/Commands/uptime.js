const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command.js');
const moment = require('moment');

module.exports = new Command({
    name: 'uptime',
    description: 'Shows how long eTOA has been running for.',
    usage: 'e!uptime',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES'],

    async execute(message, args, client) {
        const totalSeconds = client.uptime / 1000;
        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;

        const dayUnit = days === 1 ? 'day' : 'days';
        const hourUnit = hours === 1 ? 'hr' : 'hrs';

        const uptime =
            days > 0
                ? `${days} ${dayUnit}, ${hours} ${hourUnit}, ${minutes} min, ${seconds} sec`
                : `${hours} ${hourUnit}, ${minutes} min, ${seconds} sec`;

        const clientUptime = new MessageEmbed()
            .setTitle('Uptime')
            .setDescription(uptime)
            .setColor('GREEN')
            .setFooter(
                `${client.user.username} | Started: ${client.lastStarted}`
            );

        message.channel.send({ embeds: [clientUptime] });
    },
});
