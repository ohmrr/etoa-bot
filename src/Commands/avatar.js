const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'avatar',
    aliases: ['av'],
    description: 'Sends a users\' avatar.',
    usage: 'e!avatar [user?]',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],

    async execute(message, args, client) {
        const userAvatar = new MessageEmbed();
        const input = args.slice(1).toString();
        let member;

        if (!input) {
            member = message.member;
        } else {
            if (message.mentions.members.first()) {
                member = message.mentions.members.first();
            } else {
                member =
                    message.guild.members.cache.find(
                        (m) =>
                            m.user.username.toLowerCase() ===
                            input.toLowerCase()
                    ) ||
                    message.guild.members.cache.find(
                        (m) => m.user.tag.toLowerCase() === input.toLowerCase()
                    ) ||
                    message.guild.members.cache.find((m) =>
                        m.user.username
                            .toLowerCase()
                            .startsWith(input.toLowerCase())
                    ) ||
                    message.guild.members.cache.find(
                        (m) => m.user.id === input
                    );
            }
        }

        if (!member) {
            userAvatar
                .setColor('RED')
                .setDescription(
                    `🔴 No user by the name of ${input} was found.`
                );

            return message.channel.send({ embeds: [userAvatar] });
        }

        const memberIcon = member.displayAvatarURL({
            dynamic: true,
            format: 'png',
            size: 4096,
        });

        userAvatar
            .setAuthor(member.user.tag, memberIcon)
            .setImage(memberIcon)
            .setColor('GREEN');

        message.channel.send({ embeds: [userAvatar] });
    },
});
