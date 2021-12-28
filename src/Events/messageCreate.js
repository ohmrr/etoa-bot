const { MessageEmbed } = require('discord.js');
const Event = require('../Structures/Event.js');

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

    const command = client.commands.find((cmd) => cmd.name === args[0]);
    if (!command) return;

    const userRequirements = new MessageEmbed()

    const userPermission = message.member.permissions.has(
        command.userPermission,
        true
    );

    if (!userPermission) {
        userRequirements
            .setColor('RED')
            .setDescription('🔴 You lack the permissions required to run this command.');
        
        return message.channel.send({ embeds: [userRequirements] });
    }

    const botRequirements = new MessageEmbed()

    const botPermission = message.guild.me.permissions.has(
        command.botPermission,
        true
    );

    if (!botPermission) {
        botRequirements
            .setColor('RED')
            .setDescription('🔴 I lack the permissions required to run this command.');
        
        return message.channel.send({ embeds: [botRequirements] });
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.channel.send('Command failed... 👽');
    }
});