const chalk = require('chalk');
const moment = require('moment');

const Logger = {
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
    console.log(chalk.green.bold(content));
  },
};

module.exports = Logger;