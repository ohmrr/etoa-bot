const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot',

    async execute(message, args, client) {
        console.log('hello');
    },
});