const { Client, Collection, Intents } = require('discord.js');
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

        this.commands = new Collection();
        this.botName = config.botName;
        this.prefix = config.prefix;
        this.ownerId = config.ownerId;
    }

    build(token) {
        this.login(config.token);
    }
}

module.exports = eTOA;