const Discord = require('discord.js');
const eTOA = require('./eTOA.js');

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {eTOA} client
 */
function execute(message, args, client) { }

// For future discord slash commands, if (commandType === 'slash or both') message.reply

class Command {
    /**
     * @typedef {{name: string, description: string, usage: string, userPermission: Array.<Discord.PermissionString>, botPermission: Array.<Discord.PermissionString>, execute: execute}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage;
        this.userPermission = options.userPermission;
        this.botPermission = options.botPermission;
        this.execute = options.execute;
    }
}

module.exports = Command;