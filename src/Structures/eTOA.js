const { Client, Collection, Intents } = require('discord.js');
const Command = require('./Command.js');
const Event = require('./Event.js');
const Logger = require('../Modules/logger.js');
const moment = require('moment');
const config = require('../Data/config.json');
const fs = require('fs');
const intents = new Intents(16335);

class eTOA extends Client {
  constructor() {
    super({
      allowedMentions: {
        parse: ['roles', 'users'],
      },

      intents,
    });

    /**
     * @type {Discord.Collection<string, Command>}
     */
    this.commands = new Collection();

    this.prefix = config.prefix;
    this.ownerId = config.ownerId;

    this.logger = Logger;

    this.loadCommands();
    this.loadEvents();
  }

  loadCommands() {
    /**
     * @type {Command[]}
     */
    const commandFiles = fs
      .readdirSync('./src/Commands')
      .filter((file) => file.endsWith('.js'));

    const commands = commandFiles.map((file) => require(`../Commands/${file}`));

    commands.forEach((cmd) => {
      if (cmd.name && (!cmd.description || !cmd.execute))
        return this.logger.warn(`[ ${cmd.name} ] command contents missing...`);

      if (!cmd.name)
        return this.logger.warn('[ undefined ] command name missing...');

      this.commands.set(cmd.name, cmd);
      this.logger.loaded(`[ ${cmd.name} ] command loaded...`);
    });
  }

  loadEvents() {
    const eventFiles = fs
      .readdirSync('./src/Events')
      .filter((file) => file.endsWith('.js'));

    eventFiles.forEach((file) => {
      /**
       * @type {Event}
       */
      const event = require(`../Events/${file}`);

      if (event.event && (!event.execute || !event.once))
        return this.logger.warn(
          `[ ${event.event} ] command contents missing...`
        );

      if (!event.event)
        return this.logger.warn('[ undefined ] command name missing...');

      if (event.once === true)
        this.once(event.event, event.execute.bind(null, this));
      else this.on(event.event, event.execute.bind(null, this));

      this.logger.loaded(`[ ${event.event} ] command loaded...`);
    });
  }

  build() {
    this.login(config.token);
    this.lastStarted = moment(Date.now()).calendar();
  }
}

module.exports = eTOA;
