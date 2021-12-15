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

fs.readdirSync('./src/Events')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        const event = require(`./Events/${file}`);
        client.on(event.event, event.run.bind(null, this));
        console.log(`[ ${event.event} ] loaded...`)
    });

client.login(config.token);