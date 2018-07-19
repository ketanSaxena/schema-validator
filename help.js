const logger = require('./lib/logger')
const pkg = require('./package.json')

const help = () => {
  logger.blueBold(`Validate schema utility [version: ${pkg.version}]`)
  logger.blue(`
  Description:
    Validate is a utility used to check the structure of
    a yaml/json file against a predefined schema. The schema is expected
    to be a js file with schema as described in the link below:
    https://www.npmjs.com/package/schema-validator

  Usage: npm run validate -- [options]

  Example: npm run validate -- -f path/to/dummy.yml

  Options:
    -f, --filePath <filePath> : path to the target file for validating
    -j, --json                : passed if target file is in JSON format
    -s, --schema [schemaPath] : path to an external schema.js file
  `)
}

module.exports = help