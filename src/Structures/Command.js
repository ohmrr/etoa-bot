const eTOA = require('./eTOA.js');
const Discord = require('discord.js');

/**
 * 
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Client} client
 */
function execute(message, args, client) { }

class Command {
    /**
     * @typedef {{name: string, description: string, run: execute}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}

module.exports = Command;