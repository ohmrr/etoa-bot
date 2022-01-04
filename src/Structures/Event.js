const Discord = require('discord.js');
const eTOA = require('./eTOA.js');

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {eTOA} client
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function execute(client, ...eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
  /**
   * @param {K} event
   * @param {execute<K>} execute
   */
  constructor(event, execute) {
    this.event = event;
    this.execute = execute;
  }
}

module.exports = Event;
