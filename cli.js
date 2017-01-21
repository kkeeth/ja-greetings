#!/usr/bin/env node
const yargs = require('yargs')
   .usage( 'Usage:\n'
         + '  node $0 [-d prefecture] <command>\n\n'
         + 'Commands:\n'
         + '  a, all    : show all greetings\n'
         + '  n, new    : new years greeting\n'
         + '  s, summer : summer greeting\n'
         + '  w, winter : winter greeting\n'
         + '  l, last   : end of years greeting'
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
      'h': {
         alias: 'help',
         describe: 'Show help'
      }
   })
   .epilog( 'Dialects:\n'
          + '  kyoto osaka okinawa hiroshima\n\n'
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
   const module = require('./index')
   const greet = module.greet(item, argv)
   if (greet) console.log(greet)
}

function greet_all() {
   const module = require('./index')
   let greet = ''
   module.get_greetings().forEach((item) => {
      if (item === 'all') return
      greet = module.greet(item, argv)
      if (greet) console.log(greet)
   })
}

function show_help(text) {
   if (text) console.log(text)
   yargs.showHelp()
}

function exist_check(argv) {
   const greetings = require('./index').get_greetings()
   const dialects  = require('./index').get_dialects()
   const surrounds = require('./index').get_surrounds()
   let ret = true

   // If index is 0, it becomes false,
   // incrementing by 1
   ret = greetings.indexOf(argv._[0]) + 1
   if (argv.d && ret) ret = dialects.indexOf(argv.d) + 1
   if (argv.s && ret) ret = surrounds.indexOf(argv.s) + 1

   return ret
}

function convert(key) {
   let ret = ''
   switch(key) {
      case 'a':
         ret = 'all'
         break
      case 'n':
         ret = 'new'
         break
      case 's':
         ret = 'summer'
         break
      case 'w':
         ret = 'winter'
         break
      case 'l':
         ret = 'last'
         break
      default:
         ret = key
         break
   }
   return ret
}

function get_options(param) {
   return
}
