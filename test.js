const test   = require('ava')
const format = require('./lib/format')
const greetings = require('./lib/greetings')

test('select one option', t => {
   // error check
   t.is(greetings.get(), 'Not found <undefined> greeting')
   t.is(greetings.get('hoge'), 'Not found <hoge> greeting')
   t.is(greetings.replace_ex('hoge'), 'Cannot parse greeting file\n')
})

test('select multi options', t => {
   const opts = ['new', 'last', 'hoge']

   // error check
   t.is(greetings.get(opts), 'Not found <' + opts.join(',') + '> greeting')
})

test('show option list', t => {
   const list = greetings.list()

   // error check
   t.is(list.length, 2)
   t.true(list.indexOf('new') >= 0)
   t.true(list.indexOf('last') >= 0)
   t.false(list.indexOf('hoge') >= 0)
})
