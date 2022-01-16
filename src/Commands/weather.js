const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = new Command({
  name: 'weather',
  aliases: ['w'],
  description: 'Shows the current weather in a specificed location.',
  usage: 'e!weather [location]',
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],

  async execute(message, args, client) {
    const location = args.slice(1).join(' ');
    const currentWeather = new MessageEmbed();

    if (!location) {
      currentWeather
        .setColor('RED')
        .setDescription('🔴 You need to enter a location.');

      return message.channel.send({ embeds: [currentWeather] });
    }

    weather.find({ search: location, degreeType: 'F' }, (error, result) => {
      if (error) {
        currentWeather
          .setColor('RED')
          .setDescription('🔴 There was an error.');

        return message.channel.send({ embeds: [currentWeather] });
      }

      if (!result) {
        currentWeather
          .setColor('RED')
          .setDescription('🔴 Nothing was found.');

        return message.channel.send({ embeds: [currentWeather] });
      }
      
      const data = result[0];
    });
  },
});
