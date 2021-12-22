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
        const owner = (await guild.fetchOwner()).user;
        const ownerUser = `${owner.username}#${owner.discriminator}`;
        const channels = guild.channels.cache;

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
                    name: 'Members',
                    value: guild.memberCount.toString(),
                    inline: true,
                },
                // {
                //     name: 'Categories',
                //     value: channels.filter(channel => channel.type === 'GUILD_CATEGORY'),
                //     inline: true,
                // },
                // {
                //     name: 'Text Channels',
                //     value: channels.filter(channel => channel.type === 'GUILD_TEXT'),
                //     inline: true,
                // },
                // {
                //     name: 'Voice Channels',
                //     value: channels.filter(channel => channel.type === 'GUILD_VOICE'),
                //     inline: true,
                // },
            )
            .setFooter(`ID: ${guild.id} | Server Created: ${createdDate}`);

        message.channel.send({ embeds: [serverInfo] });
    },
});
