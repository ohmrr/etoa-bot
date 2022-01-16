const chalk = require('chalk');
const moment = require('moment');

/**
 * 
 * @param {string} content - The content or message that will be logged.
 * @param {string} type - Choose from a type of log, error, warn, set, or missing. 
 * @returns 
 */
const Logger = (type, content) => {
  const validTypes = ['log', 'error', 'warn', 'ready', 'set', 'missing'];
  const isValid = validTypes.includes(type);

  if (!isValid) return console.log(chalk.red('Invalid logging type.'));

  const timestamp = `${moment(Date.now()).calendar()}: `;

  switch (type) {
    case 'log':
      console.log(timestamp + chalk.white(content));
      break;
    case 'error':
      console.log(timestamp + chalk.red(content));
      break;
    case 'warn':
      console.log(timestamp + chalk.red.underline(content));
      break;
    case 'ready':
      console.log(chalk.green.bold(content));
      break;
    case 'set':
      console.log(chalk.whiteBright(content));
      break;
    case 'missing':
      console.log(chalk.red(content));
  }
};

module.exports = Logger;
