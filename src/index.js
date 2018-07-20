const { logger, schemaBuilder, utils } = require('../lib')

const validateSchema =  (targetObject, options) => {
  const path = options.filePath
  invalidTarget = targetObject && typeof targetObject !== 'object'
  if(invalidTarget)
    return logger.error('Target must be an object')
  if(!(targetObject || path))
    return logger.error('Missing argument: either targetObject or filePath is required')

  logger.info(`Validating schema for: ${options.filePath || 'targetObject'}`)
  try {
    let inputSchema = options.schema || options.schemaPath || `${__dirname}/../examples/schema.json`
    const schema = schemaBuilder.getSchema(inputSchema)
    const content = targetObject || utils.loadContent(options.filePath)
    _printErrors(schema.validate(content))
  } catch (error) {
    logger.error(error)
  }
}

const _printErrors = errors => {
  if(errors.length) {
    logger.error(`====== Schema Validation Error ======\n\n${errors.length} mismatch found`)
    errors.forEach((err, index) => logger.red(`${index + 1}. ${err.message}`))
  } else {
    logger.success('Schema Validated Successfully')
  }
}

module.exports = validateSchema