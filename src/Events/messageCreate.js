const Event = require('../Structures/Event.js');

module.exports = new Event('messageCreate', (client, message) => {
    if (message.author.bot) return;
    if (message.mentions.members.first().id === client.botId)
        return message.channel.send(`Prefix is ${client.prefix} 👽`);
    if (!message.content.startsWith(client.prefix)) return;
    if (!message.guild) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find((cmd) => cmd.name === args[0]);
    if (!command) return;

    const userPermission = message.member.permissions.has(
        command.userPermission,
        true
    );

    if (!userPermission)
        return message.channel.send('You have insufficient permissions 👽');

    const botPermission = message.guild.me.permissions.has(
        command.botPermission,
        true
    );

    if (!botPermission)
        return message.channel.send('I have insufficient permissions 👽');

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.channel.send('Command failed... 👽');
    }
});
