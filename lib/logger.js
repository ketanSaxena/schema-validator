const chalk = require('chalk')

const log = (title, msg, color = 'blue') => console.log(`${chalk[color].bold(title)} : ${chalk[color](msg)}`)

const logger = {
	info: message => log('INFO', message, 'blue'),
	warn: message => log('WARNING', message, 'yellow'),
	error: message => log('ERROR', message, 'red'),
	success: message => log('SUCCESS', message, 'green'),
	green: message => console.log(chalk.green(message)),
	blue: message => console.log(chalk.blue(message)),
	red: message => console.log(chalk.red(message)),
	blueBold: message => console.log(chalk.blue.bold(message)),
}

module.exports = logger
