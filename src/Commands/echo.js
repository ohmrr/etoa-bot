const Command = require('../Handlers/Command.js');

module.exports = new Command({
    name: 'echo',
    description: 'Copies what you say.',

    async run(message, args, client) {
        msg = args.splice(1).join(' ');

        message.channel.send(msg);
    }
});