const format = require('./lib/format')
const greetings = require('./lib/greetings')

exports.get_greetings = greetings.get_greetings
exports.get_dialects  = greetings.get_dialects
exports.get_surrounds = greetings.get_surrounds

exports.greet = (item, opts) => {
   const text = greetings.get(item, opts.d)
   return format(text, opts.s)
}
