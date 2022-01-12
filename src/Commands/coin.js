const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'coin',
  aliases: ['coinflip', 'flip'],
  description: 'Flips a coin.',
  usage: 'e!coin',
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES'],

  async execute(message, args, client) {
    
  },
});
