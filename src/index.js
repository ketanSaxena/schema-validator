const { logger, schemaBuilder, utils } = require('../lib')
const fs = require('fs')

const validateSchema =  (targetObject, options = {}) => {
  if(!targetObject)
    return logger.error('Missing argument: either targetObject or filePath is required')
  let isPath = typeof targetObject === 'string'
  if(isPath ? !fs.existsSync(targetObject) : typeof targetObject !== 'object')
    return logger.error('Target must be either be an object or a valid filepath')

  logger.info(`Validating schema for: ${targetObject}`)
  try {
    let inputSchema = options.schema || options.schemaPath || `${__dirname}/../examples/schema.json`
    const schema = schemaBuilder.getSchema(inputSchema)
    const content = isPath ? utils.loadContent(targetObject) : targetObject 
    return printErrors(schema.validate(content))
  } catch (error) {
    logger.error(error)
  }
}

const printErrors = errors => {
  if(errors.length) {
    logger.error(`====== Schema Validation Error ======\n\n${errors.length} mismatch found`)
    errors.forEach((err, index) => logger.red(`${index + 1}. ${err.message}`))
  } else {
    logger.success('Schema Validated Successfully')
  }
  return errors
}

module.exports = validateSchema
