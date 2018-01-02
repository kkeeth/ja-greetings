#!/usr/bin/env node

const package_json = require('./package.json')
const app   = require('./index')
const yargs = require('yargs')
   .usage( 'Usage:\n'
         + '  node $0 <command> [-d prefecture] [-s surround]\n\n'
         + 'Commands:\n'
         + '  a, all    : show all greetings\n'
         + '  n, new    : new years greeting\n'
         + '  s, summer : summer greeting\n'
         + '  w, winter : winter greeting\n'
         + '  l, last   : end of years greeting\n'
         + '  t, thx    : thanks greeting\n'
         + '  so, sorry : sorry  greeting'
   )
   .options({
      'd': {
         alias: 'dialect',
         describe: 'Greeting from each prefecture dialect'
      },
      's': {
         alias: 'surround',
         describe: 'Decoration of the surround'
      },
      'l': {
         alias: 'language',
         describe: 'Select language'
      },
      'v': {
         alias: 'version',
         describe: 'Show version'
      },
      'h': {
         alias: 'help',
         describe: 'Show help'
      }
   })
   .epilog( 'Dialects:\n'
          + '  kyoto, osaka, okinawa, hiroshima\n\n'
          + 'Languages:\n'
          + '  en, ch\n\n'
          + 'Surrounds:\n'
          + '  no        Do not surround text\n'
          + '  w-star    ☆\n'
          + '  b-star    ★\n'
          + '  asterisk  ＊\n'
          + '  w-tri     top: ▽  , bottom: △\n'
          + '  b-tri     top: ▼  , bottom: ▲\n'
          + '  slash     top: /￣, bottom: ＿/\n'
   )
   .locale('en')

const     argv = yargs.argv
const is_exist = exist_check(argv)
let key = convert(argv._[0])

// 'help' is top priority option
if (argv.h) {
   show_help()
}
else if (argv.v) {
   console.log(package_json.version)
}
else if (argv._.length >= 2) {
   show_help('Error: Please input only one command\n')
}
else if (is_exist < 1) {
      show_help()
}
else {
   switch (key) {
      case 'all':
         greet_all()
         break
      default:
         greet(key)
         break
   }
}

function greet(item) {
   const greet = app.greet(item, argv)
   if (greet) console.log(greet)
}

function greet_all() {
   const greetings = app.get_greetings()
   let greet = ''
   for (let key in greetings) {
      if (greetings[key] === 'all') continue

      greet = app.greet(greetings[key], argv)
      if (greet) console.log(greet)
   }
}

function show_help(text) {
   if (text) console.log(text)
   yargs.showHelp()
}

function exist_check(argv) {
   const greetings = app.get_greetings()
   const dialects  = app.get_dialects()
   const surrounds = app.get_surrounds()
   let ret = true

   // If index is 0, it becomes false,
   // incrementing by 1
   for (let key in greetings) {
      if (greetings[key] === convert(argv._[0])) {
         ret = true
         break
      }
      else {
         ret = 0
      }
   }
   if (argv.d && ret) ret = dialects.indexOf(argv.d) + 1
   if (argv.s && ret) ret = surrounds.indexOf(argv.s) + 1

   return ret
}

function convert(key) {
   const greetings = app.get_greetings()
   return greetings[key] || key
}

