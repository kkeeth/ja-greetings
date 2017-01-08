const format = require('./lib/format')
const greetings = require('./lib/greetings')

exports.list = greetings.list
exports.greet = (item, opt) => {
   return greetings.get(item, opt)
}
exports.format = (greet) => {
   return format(greet)
}
