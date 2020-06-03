const fs = require('fs')
const Schema = require('validate')
const { logger, schemaBuilder, utils, printErrors } = require('../lib')

const logLevels = {
  none: 0,
  error: 1,
  warn: 2,
  verbose: 3
}

const validateSchema =  (targetObject, options = {}) => {
  if(!targetObject)
    return logger.error('Missing argument: either targetObject or filePath is required')
  let isPath = typeof targetObject === 'string'
  if(isPath ? !fs.existsSync(targetObject) : typeof targetObject !== 'object')
    return logger.error('Target must be either be an object or a valid filepath')

  if(logLevels[options.logLevel] > 2) {
    logger.info(`Validating schema for: ${JSON.stringify(targetObject)}`)
  }
  try {
    let inputSchema = options.schema || options.schemaPath || `${__dirname}/../examples/schema.json`
    const schema = schemaBuilder.getSchema(inputSchema)
    const content = isPath ? utils.loadContent(targetObject) : targetObject
    const clone = JSON.parse(JSON.stringify(content))
    const misMatches = new Schema(schema).validate(content)
    const extraFiels = validateExtraFields(clone, schema)
    return printErrors(misMatches, extraFiels, logLevels[options.logLevel])
  } catch (error) {
    logger.error(error)
  }
}

const validateExtraFields = (targetObj, schemaObj) => {
  let extras = []

  const leafNode = (obj) => {
    return obj && ([String, Number, Boolean].includes(obj.type) || typeof obj.required === 'boolean')
  }

  const _parseTarget = (target, schema, parsedLevel = '') => {
    if (typeof target !== 'object'){
      return
    }

    for(let key in target) {
      let schemaKey = target instanceof Array ? schema[0] : schema[key]
      const nextLevel = parsedLevel ? `${parsedLevel}.${key}` : key
      if(!schemaKey || typeof target[key] !== 'object' && !leafNode(schemaKey)) {
        extras.push({ path: nextLevel, message: `${nextLevel} is not present in schema`})
      } else {
        _parseTarget(target[key], schemaKey, nextLevel)
      }
    }
  }

  _parseTarget(targetObj, schemaObj)
  return extras;
}

module.exports = validateSchema
