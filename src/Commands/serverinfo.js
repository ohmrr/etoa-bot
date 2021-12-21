const { MessageEmbed, User } = require('discord.js');
const Command = require('../Structures/Command.js');
const moment = require('moment');

module.exports = new Command({
    name: 'serverinfo',
    description: 'Sends an embed containing data about the guild.',
    permission: 'SEND_MESSAGES',

    async execute(message, args, client) {
        const guild = message.guild;
        const createdDate = moment(guild.createdTimestamp).calendar();
        const guildOwner = (await message.guild.fetchOwner()).displayName;

        const serverInfo = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('RANDOM')
            .setFields(
                {
                    name: 'Owner',
                    value: guildOwner,
                    inline: true,
                },
                {
                    name: 'Categories',
                    value: 'test',
                    inline: true,
                })
            .setFooter(`ID: ${guild.id} | Server Created: ${createdDate}`);

        message.channel.send({ embeds: [serverInfo] });
    },
});
