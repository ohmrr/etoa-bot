const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'avatar',
    description: "Sends a users' avatar.",
    usage: 'e!avatar [user]',
    userPermission: ['SEND_MESSAGES'],
    botPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],

    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const memberIcon = member.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

        const userAvatar = new MessageEmbed()
            .setAuthor(
                member.user.tag,
                memberIcon
            )
            .setImage(memberIcon)
            .setColor('GREEN');
        
        message.channel.send({ embeds: [userAvatar] });
    },
});
