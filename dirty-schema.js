const Schema = require('validate')

const schema = new Schema({
  person: {
    names: {
      first_name: { type: String },
      last_name: { type: String }
    },
    id: { type: String },
    nons: { type: String, required: true },
    height: { type: Number },
    hobbies: [{type: String}],
    attributes: [{ foo: { type: String } }]
  }
})

module.exports = schema
