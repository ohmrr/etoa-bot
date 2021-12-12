const Client = require('./Handlers/Client.js');
const Command = require('./Handlers/Command.js');
const config = require('./Data/config.json');
const client = new Client();
const fs = require('fs');

fs.readdirSync('./src/Commands')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        /**
         * @type {Command}
         */
        const command = require(`./Commands/${file}`);
        client.commands.set(command.name, command);
        console.log(`[ ${command.name} ] loaded...`);
    });

client.once('ready', () => {
    console.log('All modules loaded. eTOA-001 is up and running');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.guild) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name === args[0]);

    if (!command) return;

    command.run(message, args, client);
});

client.login(config.token);