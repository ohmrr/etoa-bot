const { MessageEmbed, User } = require('discord.js');
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
        const ownerUser = `${owner.username}#${owner.discriminator}`;
        const members = guild.memberCount.toString();
        const channels = guild.channels.cache;
        const categories = channels
            .filter((channel) => channel.type === 'GUILD_CATEGORY')
            .size.toString();
        const textChannels = channels
            .filter((channel) => channel.type === 'GUILD_TEXT')
            .size.toString();
        const voiceChannels = channels
            .filter((channel) => channel.type === 'GUILD_VOICE')
            .size.toString();
        const roleNum = guild.roles.cache.size.toString();
        const createdDate = moment(guild.createdTimestamp).calendar();

        const serverInfo = new MessageEmbed()
            .setAuthor(
                guild.name,
                guild.iconURL({ dynamic: true, format: 'png', size: 4096 })
            )
            .setThumbnail(
                guild.iconURL({ dynamic: true, format: 'png', size: 4096 })
            )
            .setColor('RANDOM')
            .setFields(
                {
                    name: 'Owner',
                    value: ownerUser,
                    inline: true,
                },
                {
                    name: 'Category Channels',
                    value: categories,
                    inline: true,
                },
                {
                    name: 'Text Channels',
                    value: textChannels,
                    inline: true,
                },
                {
                    name: 'Voice Channels',
                    value: voiceChannels,
                    inline: true,
                },
                {
                    name: 'Members',
                    value: members,
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: roleNum,
                    inline: true,
                }
            )
            .setFooter(`ID: ${guild.id} | Server Created: ${createdDate}`);

        message.channel.send({ embeds: [serverInfo] });
    },
});
