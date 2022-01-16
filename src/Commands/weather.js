const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');
const chalk = require('chalk');

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
        currentWeather.setColor('RED').setDescription('🔴 There was an error.');

        return message.channel.send({ embeds: [currentWeather] });
      }

      if (!result || !result.length) {
        currentWeather.setColor('RED').setDescription('🔴 Nothing was found.');

        return message.channel.send({ embeds: [currentWeather] });
      }

      const data = result[0];

      try {
        currentWeather
          .setColor('GREEN')
          .setAuthor('Weather', data.current.imageUrl)
          .setThumbnail(data.current.imageUrl)
          .setFields(
            {
              name: 'City',
              value: data.location.name,
              inline: false,
            },
            {
              name: 'Day',
              value: data.current.day,
              inline: true,
            },
            {
              name: 'Temperature',
              value: `${data.current.temperature} °F`,
              inline: true,
            },
            {
              name: 'Condition',
              value: data.current.skytext,
              inline: true,
            },
            {
              name: 'Windspeed',
              value: data.current.windspeed,
              inline: true,
            },
            {
              name: 'Feels Like',
              value: `${data.current.feelslike} °F`,
              inline: true,
            },
            {
              name: 'Humidity',
              value: `${data.current.humidity}%`,
              inline: true,
            }
          );
      } catch (error) {
        console.error(chalk.red(error));
        currentWeather.setColor('RED').setDescription('🔴 Nothing was found.');

        return message.channel.send({ embeds: [currentWeather] });
      }

      message.channel.send({ embeds: [currentWeather] });
    });
  },
});
