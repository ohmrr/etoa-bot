const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: '8ball',
  aliases: ['8b'],
  description: 'Asks the magic 8 ball a question.',
  usage: 'e!8ball [question]',
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES'],

  async execute(message, args, client) {
    const eightBall = new MessageEmbed();

    if (!args[1]) {
      eightBall.setColor('RED').setDescription('placeholder');

      return message.channel.send({ embeds: [eightBall] });
    }

    const results = [
      'Without a doubt.',
      'It is certain.',
      'Reply hazy, try again.',
      'Cannot predict now.',
      'Very doubtful.',
      'Outlook not so good.',
    ];

    const reply = results[Math.floor(Math.random() * results.length)];
  },
});
