const Discord = require('discord.js');
const Command = require('./Command.js');
const config = require('../Data/config.json');
const intents = new Discord.Intents(4039);

class Client extends Discord.Client {
    constructor() {
        super({
            intents,
            allowedMentions: {
                parse: ['users', 'roles'],
            },
        });

        /**
         * @type {Discord.Collection<string, Command>}
         */
        this.commands = new Discord.Collection();
    }
}

module.exports = Client;