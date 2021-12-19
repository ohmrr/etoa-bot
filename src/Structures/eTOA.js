const { Client, Collection, Intents, DiscordAPIError } = require('discord.js');
const fs = require('fs');
const Command = require('./Command.js');
const config = require('../Data/config.json');
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
    }

    loadCommands() {
        const commandFiles = fs.readdirSync('./src/Commands')
            .filter(file => file.endsWith('.js'));
        
        const commands = commandFiles.map(file => require(`../Commands/${file}`));

        commands.forEach(cmd => {
            this.commands.set(cmd.name, cmd);
            console.log(`[ ${cmd.name} ] loaded...`);
        });
    }

    build() {
        this.login(config.token);
    }
}

module.exports = eTOA;