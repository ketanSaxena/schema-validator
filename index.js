#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const { logger, buildSchema, utils } = require('./lib')
const help = require('./help')

const validateSchema = (filePath, options) => {
  const path = options.filePath
  if(!path)
    return logger.error('Missing argument -f for filePath in validate command')
  logger.info(`Validating schema for file: ${options.filePath}`)
  try {
    let schemaPath = options.schema || `${__dirname}/examples/schema.json`
    logger.info(`Validating against schema at: ${schemaPath}`)
    const schema = buildSchema(schemaPath)
    const content = utils.loadContent(options.filePath)
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

program
  .version(pkg.version)
  .command('validate')
  .option('-f, --filePath <filePath>', 'path to the target file for validating')
  .option('-j, --json','passed if target file is in JSON format')
  .option('-s, --schema [schemaPath]','path to an external schema file')
  .option('-sj, --schemaJson [schemaPath]','passed if schema file is in JSON format')
  .action(validateSchema);

program.parse(process.argv);

if(process.argv.includes('help')) {
  help()
}
