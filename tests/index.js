const assert = require('assert')
const validateSchema = require('../src')

function testValidateSchema() {

  const requiredSchema = {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
    age: { type : Number }
  }

  // actual tests
  function shouldPassForCorrectObject() {
    let person = { name: { first: 'Tom', last: 'Xoman' }, age: 45 }
    schemaErrors = validateSchema(person, { schema: requiredSchema, logLevel: 'none' })
    if(!Array.isArray(schemaErrors)) {
      assert.fail('Returned object must be an array')
    }
    assert.strictEqual(schemaErrors.length, 0)
  }

  function shouldFailForWrongObject() {
    let person = { name: { first: 10, last: 'Xoman' }, age: 'Tom' }
    schemaErrors = validateSchema(person, { schema: requiredSchema, logLevel: 'none' })
    if(!Array.isArray(schemaErrors)) {
      assert.fail('Returned object must be an array')
    }
    assert.strictEqual(schemaErrors.length, 2)
    assert.ok(schemaErrors.some(err => err.message === 'age must be of type Number.'))
    assert.ok(schemaErrors.some(err => err.message === 'name.first must be of type String.'))
  }

  // running all tests
  shouldPassForCorrectObject()
  shouldFailForWrongObject()
}

testValidateSchema()
