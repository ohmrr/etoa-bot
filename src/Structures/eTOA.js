const { Client, Collection, Intents } = require('discord.js');
const Command = require('./Command.js');
const Event = require('./Event.js');
const config = require('../Data/config.json');
const fs = require('fs');
const intents = new Intents(4039);

class eTOA extends Client {
    constructor() {
        super({
            allowedMentions: {
                parse: ['roles', 'users'],
            },

            intents,
        });

        /**
         * @type {Discord.Collection<string, Command>}
         */
        this.commands = new Collection();

        this.botName = config.botName;
        this.prefix = config.prefix;
        this.ownerId = config.ownerId;

        this.loadCommands();
        this.loadEvents();
    }

    loadCommands() {
        /**
         * @type {Command[]}
         */
        const commandFiles = fs
            .readdirSync('./src/Commands')
            .filter((file) => file.endsWith('.js'));

        const commands = commandFiles.map((file) =>
            require(`../Commands/${file}`)
        );

        commands.forEach((cmd) => {
            if (cmd.name && (!cmd.description || !cmd.execute))
                return console.log(
                    `[ ${cmd.name} ] module contents missing...`
                );
            
            if (!cmd.name)
                return console.log('[ undefined ] module name missing...');
            
            this.commands.set(cmd.name, cmd);
            console.log(`[ ${cmd.name} ] module loaded...`);
        });
    }

    loadEvents() {
        const eventFiles = fs
            .readdirSync('./src/Events')
            .filter((file) => file.endsWith('.js'));

        eventFiles.forEach((file) => {
            /**
             * @type {Event}
             */
            const event = require(`../Events/${file}`);

            if (event.event && !event.execute)
                return console.log(`[ ${event.event} ] module contents missing...`);
            
            if (!event.event && !event.execute)
                return console.log('[ undefined ] module name missing...');
            
            this.on(event.event, event.execute.bind(null, this));
            console.log(`[ ${event.event} ] module loaded...`);
        });
    }

    build() {
        this.login(config.token);
    }
}

module.exports = eTOA;