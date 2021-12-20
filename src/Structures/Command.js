const Discord = require('discord.js');
const eTOA = require('./eTOA.js');

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {eTOA} client
 */
function execute(message, args, client) {}

class Command {
    /**
     * @typedef {{name: string, description: string, execute: execute}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.execute = options.execute;
    }
}

module.exports = Command;