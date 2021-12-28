const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command.js');
const moment = require('moment');

module.exports = new Command({
    name: 'serverinfo',
    description: 'Sends an embed containing data about the guild.',
    usage: 'e!serverinfo',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],

    async execute(message, args, client) {
        const guild = message.guild;
        const owner = (await guild.fetchOwner()).user;
        const channels = guild.channels.cache;
        const timestamp = moment(guild.createdTimestamp).calendar();

        const serverInfo = new MessageEmbed()
            .setAuthor(
                guild.name,
                guild.iconURL({ dynamic: true, format: 'png', size: 4096 })
            )
            .setThumbnail(
                guild.iconURL({ dynamic: true, format: 'png', size: 4096 })
            )
            .setColor('GREEN')
            .setFields(
                {
                    name: 'Owner',
                    value: owner.tag,
                    inline: true,
                },
                {
                    name: 'Category Channels',
                    value: channels
                        .filter((channel) => channel.type === 'GUILD_CATEGORY')
                        .size.toString(),
                    inline: true,
                },
                {
                    name: 'Text Channels',
                    value: channels
                        .filter((channel) => channel.type === 'GUILD_TEXT')
                        .size.toString(),
                    inline: true,
                },
                {
                    name: 'Voice Channels',
                    value: channels
                        .filter((channel) => channel.type === 'GUILD_VOICE')
                        .size.toString(),
                    inline: true,
                },
                {
                    name: 'Members',
                    value: guild.memberCount.toString(),
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: guild.roles.cache.size.toString(),
                    inline: true,
                },
                {
                    name: 'Role List',
                    value: guild.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map((role) => role)
                        .join(', '),
                    inline: true,
                }
            )
            .setFooter(`ID: ${guild.id} | Server Created: ${timestamp}`);

        message.channel.send({ embeds: [serverInfo] });
    },
});
