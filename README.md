# schema-validator
Schema validation utility for YAML/JSON files against a pre defined schema

## Description:

Validate is a utility used to check the structure of
a yaml/json file against a predefined schema. The schema is expected
to be a js file with schema as described [in this link](https://www.npmjs.com/package/schema-validator)

## Usage

- run command `npm run validate -f <path-to-target-file>` to validate the structure of your file
- run command `npm run help` to get information about it's usage

## Options

- `-f, --filePath` <filePath> : **[Required param]** path to the target file for validating
- `-j, --json`                : passed if target file is in JSON format
- `-s, --schema [schemaPath]` : path to an external schema.js file

