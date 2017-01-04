const format = require('./lib/format')
const greetings = require('./lib/greetings')

exports.list = greetings.list
exports.greet = function(item) {
   return greetings.get(item)
}