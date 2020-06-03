YAML/JSON Schema Validator
==========================
Schema validation utility for YAML/JSON files against a pre defined schema

Table of Contents
====================

  * [Description](#description)
  * [Usage](#usage)
  * [Options](#options)
  * [Schema properties](#schema-properties)
  * [Schema File Examples](#schema-file-examples)
    * [YAML Schema](#yaml-schema)
    * [JSON Schema](#json-schema)
  * [Command Line Interface](#command-line-interface)
    * [Command Usage](#command-usage)
    * [Command Options](#command-options)
    * [Command Alias](#command-alias)

## Description:

Validate is a utility used to check the structure of
a yaml/json file against a predefined schema. The schema is expected
to be a JSON or YAML file with a structure that defines type of each property.
The object properties can be nested to as many levels as you like.

## Usage

It's method `validateSchema` can be imported and used as below:

```javascript

const validateSchema = require('yaml-schema-validator')

// validate a json OR yml file
validateSchema('path/to/target-file.yml', {
  schemaPath: '/path/to/required/schema.yml' // can also be schema.json
})
```
The method automatically detects if file format is JSON or YAML and process it accordingly.  


Similarly, method can also be used to validate plain JS objects:

```javascript
// validate an object
let person = { name: { first: 'Tom', last: 'Xoman' }, age: 45 }
vaidateSchema(person, {
  schemaPath: '/path/to/schema.yml' // can also be schema.json
})

// validate against a JS schema object
const requiredSchema = {
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  age: { type : Number }
}
schemaErrors = validateSchema(person, { schema: requiredSchema })
```

### Compare two objects' schema

If you don't have a schema object built, but you just want to compare if structure of two objects is same, then you can use `schemaObj` option to pass the expected object:
```javascript
let person = { name: { first: 'Tom', last: 'Xoman' }, age: 'something' }
let idealPerson = { name: { first: 'Tom', last: 'Xoman' }, age: 45 }
vaidateSchema(person, {    // compares the structure of person object against
  schemaObj: idealPerson   // anotherPerson object.
})
```

Schema validator validates the target file against the passed schema and
lists down the mismatches in the structure:
________
![schema-validator-listing-errors](https://image.ibb.co/caSGtd/schema_validator.png)
________

It returns an array of errors showing the mismatches:
```javascript
[{path: 'person.id', message: 'person.id must be a String'}]
```

### Custom validators
Custom validators can be defined by passing an object with named validators to .use:

```javascript
// custom validation function checking value for a regex
const checkHexColor = val => {
  return /^#[0-9a-fA-F]$/.test(val)
}

const car = new Schema({
  color: {
    type: String,
    use: { checkHexColor }
  }
})
```

### Custom error messages
Define a custom error message for the validator:

```javascript
car.message({
  checkHexColor: path => `${path} must be a valid hex color.`
})
```

## Options

`options` parameter passed as the second argument in the validate schema method.

```javascript
validateSchema(targetObject, options);
```

It has following configurable options available:

- **`schema`**: javascript object having the schema structure (eg: `{name: { type: String, required: true }`)
- **`schemaPath`**: path to the json/yaml file having the schema
- **`schemaObj`**: Used when you directly want to compare the target with a structure of another object. Pass the expected object in this option to verify the target object is having the similar structure
- **`logLevel`**: specify the level of logging while validating schem. Possible values `['none', 'error', 'warn', 'verbose']` . By default the logLevel is set to *error*

## Schema properties
- `type`: field that can be `boolean | string | number` to define type of value of that property
- `required`: field can be set to true if the property is required in target file
- `length` : feild can be used for string values to check minimum and max length of string. example `length: { min: 3, max: 32 }`
- `use` : an object of custom validation methods to be checked for a particular field.
Each function in use object should take `value` param as input and return a boolean.

## Schema File Examples

### YAML Schema
```yml
---
person:
  name:
    first_name:
      type: string
  age:
    type: number
    required: true
  employeed:
    type: boolean
  hobbies:
  - type: string
```

### JSON Schema
```json
{
  "person": {
    "names": {
      "first_name": { "type": "string", "length": { "min": 3, "max": 32 } },
      "last_name": { "type": "string" }
    },
    "id": { "type": "string" },
    "age": { "type": "number", "required": true },
    "employeed": { "type": "boolean" },
    "hobbies": [{"type": "string"}],
    "attributes": [{ "foo": { "type": "string" } }]
  }
}
```

## Command Line Interface
----------------

This package also can be used as a command line utility.

### Command Usage
- Basic syntax: `schema [command] [options]`
- In root folder of your project, use command: 
`schema validate -f path/to/dummy.yml -s path/to/schema.yml`
- for help about the options use command:
`schema validate -h`

### Command Options

- `-f, --filePath` <filePath> : **[Required param]** path to the target file for validating
- `-s, --schema [schemaPath]` : path to an external schema file. If not passed the schema is fetched from _/examples/schema.json_ which is the defeault schema location.
- `-o, --schema-obj [schemaObj]` : stringified JSON object whose structure you want the target object to be compared with.
- `-t, --target [targetObj]`  : stringified JSON object whose structure is to be verified

### Command Alias
- You can also make alias for the command in your `package.json`. Just add the script key:
```
"scripts": {
  "sc": "schema"
},
```
and then try `sc validate -f path/to/dummy.yml -s path/to/schema.yml`