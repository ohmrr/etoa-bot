const chalk = require('chalk');
const moment = require('moment');

const Logger = {
  timestamp: `${moment(Date.now()).format('MM/DD/YYYY, h:mm:ss a')}: `,

  log(content) {
    console.log(chalk.white(content));
  },

  warn(content) {
    console.log(chalk.red(content));
  },

  error(content) {
    console.log(chalk.red.bold(content));
  },

  loaded(content) {
    console.log(chalk.whiteBright.bold(content));
  },

  ready(content) {
    console.log('\n' + this.timestamp + chalk.green.bold(content));
  },
};

module.exports = Logger;