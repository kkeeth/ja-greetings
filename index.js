const format = require('./lib/format')
const greetings = require('./lib/greetings')

exports.list = greetings.list
exports.greet = (item) => {
   return greetings.get(item)
}
exports.format = (greet) => {
   return format(greet)
}
