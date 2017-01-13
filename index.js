const format = require('./lib/format')
const greetings = require('./lib/greetings')

exports.list = greetings.list
exports.greet = (item, opts) => {
   const text = greetings.get(item, opts.d)
   return format(text, opts.s)
}
