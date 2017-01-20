const test   = require('ava')
const greetings = require('./lib/greetings')

test('select one option', t => {
   // normal case
   t.truthy(greetings.get('new'))

   // error check
   t.false(greetings.get())
   t.false(greetings.get('all'))
   t.false(greetings.get('help'))
   t.false(greetings.get('l'))
   t.false(greetings.get('hoge'))
   t.is(greetings.replace_ex('hoge'), 'Cannot parse greeting file')
})

test('select multi options', t => {
   const opts = ['new', 'last', 'summer', 'winter', 'hoge']

   // error check
   t.false(greetings.get(opts))
})

test('show greeting list', t => {
   const list = greetings.get_greetings()

   // error check
   t.is(list.length, 5)
   t.true(list.indexOf('new') >= 0)
   t.true(list.indexOf('summer') >= 0)
   t.true(list.indexOf('winter') >= 0)
   t.true(list.indexOf('last')   >= 0)
   t.true(list.indexOf('all')    >= 0)
   t.false(list.indexOf('hoge')  >= 0)
})

test('show dialect list', t => {
   const list = greetings.get_dialects()

   // error check
   t.is(list.length, 4)
   t.true(list.indexOf('kyoto') >= 0)
   t.true(list.indexOf('osaka') >= 0)
   t.true(list.indexOf('okinawa')   >= 0)
   t.true(list.indexOf('hiroshima') >= 0)
   t.false(list.indexOf('hoge') >= 0)
})

test('show surround list', t => {
   const list = greetings.get_surrounds()

   // error check
   t.is(list.length, 7)
   t.true(list.indexOf('no')     >= 0)
   t.true(list.indexOf('w-star') >= 0)
   t.true(list.indexOf('b-star') >= 0)
   t.true(list.indexOf('asterisk') >= 0)
   t.true(list.indexOf('w-tri') >= 0)
   t.true(list.indexOf('b-tri') >= 0)
   t.true(list.indexOf('slash') >= 0)
   t.false(list.indexOf('hoge') >= 0)
})
