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
        const clientUptime = new MessageEmbed()
            .setTitle('Uptime')
            .setAuthor(
                client.user.username,
                client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                    size: 4096,
                })
            )
            .setDescription(`uptime here`)
            .setColor('GREEN');
        
        message.channel.send({ embeds: [clientUptime] });
    },
});
