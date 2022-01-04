const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'reload',
  aliases: ['refresh'],
  description: 'Reloads all the commands.',
  usage: 'e!reload',
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES'],

  async execute(message, args, client) {
    const reloadCommands = new MessageEmbed();

    if (!message.author.id === client.ownerId) {
      reloadCommands
        .setColor('RED')
        .setDescription('You are not permitted to run this command.');

      return message.channel.send({ embeds: [reloadCommands] });
    } else {
      client.commands.sweep(() => true);
      client.loadCommands();

      reloadCommands
        .setColor('GREEN')
        .setDescription('Commands have been successfully reloaded 👽')
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({
            dynamic: true,
            format: 'png',
            size: 4096,
          })
        );

      message.channel.send({ embeds: [reloadCommands] });
    }
  },
});
