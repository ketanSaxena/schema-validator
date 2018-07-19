const Schema = require('validate')

const schema = new Schema({
  person: {
    names: {
      first_name: { type: String },
      last_name: { type: String }
    },
    id: { type: Number },
    nons: { type: String },
    height: { type: Number },
    hobbies: [{type: String}],
    attributes: [{ foo: { type: String } }]
  }
})

module.exports = schema