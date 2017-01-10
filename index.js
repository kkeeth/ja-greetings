const format = require('./lib/format')
const greetings = require('./lib/greetings')

exports.list = greetings.list
exports.greet = (item, opt) => {
   return format(greetings.get(item, opt))
}
