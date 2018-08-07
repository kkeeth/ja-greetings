import test from 'ava'
import pify from 'pify'
import greetings from '../lib/greetings'
import {execFile} from 'child_process'

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
   const opts = ['new', 'last', 'summer', 'winter', 'thx', 'sorry', 'all', 'hoge']

   // error check
   t.false(greetings.get(opts))
})

test('check greeting list', t => {
   const list = greetings.get_greetings()
   let list_length = 0
   for (let key in list) {
      list_length++
   }

   // error check
   t.is(list_length, 7)
   t.true('a' in list)
   t.true('n' in list)
   t.true('s' in list)
   t.true('w' in list)
   t.true('t' in list)
   t.true('so' in list)
   t.false('z' in list)
})

test('check dialect list', t => {
   const list = greetings.get_dialects()

   // error check
   t.is(list.length, 4)
   t.true(list.indexOf('kyoto') >= 0)
   t.true(list.indexOf('osaka') >= 0)
   t.true(list.indexOf('okinawa')   >= 0)
   t.true(list.indexOf('hiroshima') >= 0)
   t.false(list.indexOf('hokkaido') >= 0)
})

test('check language list', t => {
   const list = greetings.get_languages()

   // error check
   t.is(list.length, 2)
   t.true(list.indexOf('en') >= 0)
   t.true(list.indexOf('ch') >= 0)
   t.false(list.indexOf('fr') >= 0)
})

test('check surround list', t => {
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

test('surround exist check', async t => {
    // error
   let stdout = await pify(execFile)('./bin/jgr', ['last'])
   t.notRegex(stdout, /#+/)

   // default
   t.regex(stdout, /-+/)

   // b-star
   stdout = await pify(execFile)('./bin/jgr', ['-s', 'b-star', 'last'])
   t.regex(stdout, /★+/)

   // slash
   stdout = await pify(execFile)('./bin/jgr', ['-s', 'slash', 'last'])
   t.regex(stdout, /\/￣/)


   // no surround
   stdout = await pify(execFile)('./bin/jgr', ['-s', 'no', 'last'])
   stdout = stdout.split(/\r\n|\r|\n/)[1];
   t.is(stdout, '            本')

   // null check
   stdout = await pify(execFile)('./bin/jgr', ['-s', 'last'])
   t.is(stdout, '')
})

test('dialect exist check', async t => {
   // okinawa
   let stdout = await pify(execFile)('./bin/jgr', ['-d', 'okinawa', 'last'])
   stdout = stdout.split(/\r\n|\r|\n/)[5]
   t.is(stdout, '    たん  話で')

   // null check
   stdout = await pify(execFile)('./bin/jgr', ['-d', 'last'])
   t.is(stdout, '')
})

