# yaml-schema-validator
Schema validation utility for YAML/JSON files against a pre defined schema

## Description:

Validate is a utility used to check the structure of
a yaml/json file against a predefined schema. The schema is expected
to be a JSON or YAML file with a structure that defines type of each property.
The object properties can be nested to as many levels as you like.


## Usage

- run command `npm run validate -f <path-to-dummy.yml>` to validate the structure of your file
- run command `npm run validate -f <path-to-dummy.yml> -s <path-to-schema.yml>` to validate the structure of your file against a specific schema file
- run command `npm run help` to get information about it's usage

## Options

- `-f, --filePath` <filePath> : **[Required param]** path to the target file for validating
- `-s, --schema [schemaPath]` : path to an external schema file. If not passed the schema is fetched from _/examples/schema.json_ which is the defeault schema location.

For a file `dummy.yml` having following content:
```
person:
  names:
    first_name: John
    last_name: Lemon
  id: 3456
  height: 176
  hobbies:
    - reading
    - coding
  attributes:
    - foo: bar
```

You can run `npm run validate -- -f dummy.yml` command:

Schema validator validates the target file against the passed schema and
lists down the mismatches in the structure:
________
![schema-validator-listing-errors](https://image.ibb.co/caSGtd/schema_validator.png)
________


## Schema properties
- `type`: field that can be `boolean | string | number` to define type of value of that property
- `required`: field can be set to true if the property is required in target file
- `length` : feild can be used for string values to check minimum and max length of string. example `length: { min: 3, max: 32 }`

## Schema File Examples

### YAML Schema
```
---
person:
  names:
    first_name:
      type: string
    last_name:
      type: string
  id:
    type: string
  age:
    type: number
    required: true
  employeed:
    type: boolean
  hobbies:
  - type: string
  attributes:
  - foo:
      type: string
```

### JSON Schema
```
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