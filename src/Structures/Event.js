const Discord = require('discord.js');
const eTOA = require('./eTOA.js');

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {eTOA} client 
 * @param  {Discord.ClientEvents[K]} eventArgs 
 */
function RunFunction(client, ...eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
    /**
     * @param {K} event 
     * @param {RunFunction<K>} runFunction 
     */
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
    }
}

module.exports = Event;