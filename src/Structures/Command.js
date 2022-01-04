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
   * @typedef {{name: string, aliases: string[] description: string, usage: string, userPermission: Discord.PermissionString[], botPermission: Discord.PermissionString[], execute: execute}} CommandOptions
   * @param {CommandOptions} options
   */
  constructor(options) {
    this.name = options.name;
    this.aliases = options.aliases;
    this.description = options.description;
    this.usage = options.usage;
    this.userPermission = options.userPermission;
    this.botPermission = options.botPermission;
    this.execute = options.execute;
  }
}

module.exports = Command;
