import format from './format.js'
import * as greetings from './greetings.js'

export const get_greetings = greetings.get_greetings
export const get_dialects  = greetings.get_dialects
export const get_languages = greetings.get_languages
export const get_surrounds = greetings.get_surrounds

export function greet(item, opts) {
   const text = greetings.get(item, opts.d || opts.l)
   return format(text, opts)
}
