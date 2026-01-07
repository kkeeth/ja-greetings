import format from './format.js';
import * as greetings from './greetings.js';

export const getGreetings = greetings.getGreetings;
export const getDialects = greetings.getDialects;
export const getLanguages = greetings.getLanguages;
export const getSurrounds = greetings.getSurrounds;

export function greet(item, opts) {
  const text = greetings.get(item, opts.d || opts.l);
  return format(text, opts);
}
