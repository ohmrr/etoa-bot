const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'coin',
  aliases: ['coinflip', 'flip', 'cf'],
  description: 'Flips a coin.',
  usage: 'e!coin',
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES'],

  async execute(message, args, client) {
    const coinflip = new MessageEmbed();
    const sides = ['Heads', 'Tails'];
    const result = sides[Math.floor(Math.random() * sides.length)];

    coinflip
      .setColor('GREEN')
      .setDescription(`The coin landed on ${result} 👽`);

    message.channel.send({ embeds: [coinflip] });
  },
});
