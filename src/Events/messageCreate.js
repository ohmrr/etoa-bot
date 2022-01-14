const Event = require('../Structures/Event.js');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = new Event('messageCreate', (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  if (message.content === `<@!${client.user.id}>`) {
    const guildPrefix = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`My prefix here is ${client.prefix}`);

    return message.channel.send(guildPrefix);
  }

  if (!message.content.startsWith(client.prefix)) return;

  const args = message.content.substring(client.prefix.length).split(/ +/);
  const target = args[0].toLowerCase();

  const command =
    client.commands.find((cmd) => cmd.name === target) ||
    client.commands.find((cmd) => cmd.aliases.includes(target));

  if (!command) return;

  const missingPermissions = new MessageEmbed();

  const userPermission = message.member.permissions.has(
    command.userPermission,
    true
  );

  if (!userPermission) {
    missingPermissions
      .setColor('RED')
      .setDescription(
        '🔴 You lack the permissions required to run this command.'
      );

    return message.channel.send({ embeds: [missingPermissions] });
  }

  const botPermission = message.guild.me.permissions.has(
    command.botPermission,
    true
  );

  if (!botPermission) {
    missingPermissions
      .setColor('RED')
      .setDescription(
        '🔴 I lack the permissions required to run this command.'
      );

    return message.channel.send({ embeds: [missingPermissions] });
  }

  try {
    command.execute(message, args, client);
  } catch (error) {
    message.channel.send('Command failed... 👽');
    
    console.error(chalk.red(error));
  }
});
