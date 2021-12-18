const eTOA = require('./Structures/eTOA.js');
const { prefix } = require('./Data/config.json');
const client = new eTOA();

client.once('ready', () => {
    console.log('eTOA-001 is ready for use.');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    const args = message.content.substring(prefix.length).split(/ +/);
});

client.build();