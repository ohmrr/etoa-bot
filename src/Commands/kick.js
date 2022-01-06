const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'kick',
  aliases: [],
  description: 'Removes a user from a guild.',
  usage: 'e!kick [user] [reason]',
  userPermission: ['SEND_MESSAGES', 'KICK_MEMBERS'],
  botPermission: ['SEND_MESSAGES', 'KICK_MEMBERS'],

  async execute(message, args, client) {
    const userKicked = new MessageEmbed();
    const user = args[1].toLowerCase();
    const reason = args[2] ? args.slice(2).join(' ') : null;

    if (!user) {
      userKicked
        .setColor('RED')
        .setDescription('🔴 Enter a user to be kicked.');

      return message.channel.send({ embeds: [userKicked] });
    }

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (m) => m.user.username.toLowerCase() === user
      ) ||
      message.guild.members.cache.find(
        (m) => m.user.tag.toLowerCase() === user
      ) ||
      message.guild.members.cache.find((m) => m.user.id === user);

    if (!member) {
      userKicked
        .setColor('RED')
        .setDescription(`🔴 No user by the name of ${user} was found.`);

      return message.channel.send({ embeds: [userKicked] });
    }

    if (!member.kickable) {
      userKicked
        .setColor('RED')
        .setDescription(`🔴 That user can't be kicked.`);

      return message.channel.send({ embeds: [userKicked] });
    } else {
      userKicked
        .setColor('GREEN')
        .setDescription(`***${member.user.tag} was kicked 👽***`);

      if (reason) {
        member.kick(reason);
      } else {
        member.kick();
      }
      
      message.channel.send({ embeds: [userKicked] });
    }
  },
});
