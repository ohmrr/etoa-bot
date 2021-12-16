const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./Data/config.json');
const intents = new Intents(4039);
const client = new Client({
    intents,
    allowedMentions: { parse: ['users', 'roles'] },
});

client.once('ready', () => {
    console.log('eTOA-001 is ready for use.');
});

client.login(token);