const Event = require('../Structures/Event.js');

module.exports = new Event('messageCreate', (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    if (!message.guild) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find((cmd) => cmd.name === args[0]);
    if (!command) return;

    const userPermission = message.member.permissions.has(command.userPermission, true);
    if (!userPermission) return message.channel.send('You are missing perm')

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.channel.send('Command failed... 👽');
    }
});