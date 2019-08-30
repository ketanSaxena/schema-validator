#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const validateSchema = require('./src')

program
  .version(pkg.version)
  .command('validate')
  .option('-f, --filePath <filePath>', 'path to the target file for validating')
  .option('-t, --target [targetObj]', 'stringified JSON object whose structure is to be verified')
  .option('-j, --json','passed if target file is in JSON format')
  .option('-s, --schema [schemaPath]','path to an external schema file')
  .action((options) => {
    const targetObj = options.targetObj ? JSON.parse(options.targetObj) : options.filePath
    validateSchema(targetObj, options)
  });

program.parse(process.argv);

if(process.argv.includes('help')) {
  help()
}

module.exports = validateSchema
module.exports.default = module.exports // For TypeScript
