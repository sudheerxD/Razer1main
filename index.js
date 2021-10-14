const chalk = require('chalk');
require('./src/modules/console');
console.log(chalk.yellow('----------------------------------------------------------------------------------------------'))
console.log()
console.log(chalk.red(``))
console.log(chalk.yellow('Version: 0.1.2'))
console.log()
console.log(chalk.yellow('----------------------------------------------------------------------------------------------'))
console.log()
const Melon = require('./src/Melon');

new Melon().login()
    .catch(err => console.error(err))