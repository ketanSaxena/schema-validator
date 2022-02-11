const logger = require('./logger')

const printErrors = (errors, warnings, logLevel = 3) => {
  if(errors.length || warnings.length) {
    if(logLevel > 2) {
      logger.error('====== Schema Validation Error ======')
      logger.error(`${errors.length} mismatches and ${warnings.length} warnings found.`)
    }
    if(logLevel) {
      errors.forEach((err, index) => logger.red(`${index + 1}. ${err.message}`))
      return errors
    }
    if(logLevel > 1) {
      warnings.forEach((warn, index) => logger.yellow(`${index + 1}. ${warn.message}`))
    }
  } else if(logLevel > 2) {
    logger.success('Schema Validated Successfully')
  }
  return errors.concat(warnings)
}

module.exports = printErrors
