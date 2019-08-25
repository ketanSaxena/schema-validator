const yaml = require('js-yaml')
const fs = require('fs')

const utils = {
  loadContent: filePath => {
    if(!/json|yml|yaml$/.test(filePath)) {
      throw new Error('Schema file format not supportes. Supported formats : json|yml|yaml')
    }
    const content = fs.readFileSync(filePath)
    return /json$/.test(filePath) ? JSON.parse(content) : yaml.safeLoad(content)
  }
}

module.exports = utils
