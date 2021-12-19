const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'test',
    
    async run(message, args, client) {
        console.log('hello');
    }
})