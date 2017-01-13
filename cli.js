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
      'n': {
         alias: 'no-surround',
         describe: 'Do not surround text'
      },
      'h': {
         alias: 'help',
         describe: 'Show help'
      }
   })
   .epilog( 'Dialects:\n'
          + '  kyoto osaka okinawa\n\n'
          + 'Surrounds:\n'
          + '  no        Do not surround text\n'
          + '  w-star    ☆\n'
          + '  b-star    ★\n'
          + '  asterisk  ＊'
          + '  slash     top: /￣, bottom: ＿/\n'
   )
   .locale('en')
const argv = yargs.argv
let key = convert(argv._[0])

// 'help' is top priority option
if (argv.h) {
   show_help()
}
else if (argv._.length === 0){
   if (argv.d) show_help('Error: Please select one dialect\n')
   else if (argv.s) show_help('Error: Please select one surround pattern\n')
   else show_help('Error: Please input any command (with option you need)\n')
}
else if (argv._.length >= 2) {
   show_help('Error: Please input only one command\n')
}
else {
   switch (key) {
      case 'all':
         greet_all()
         break
      default:
         const ret = (exist_check(key) && greet(key))
         if (ret == false) show_help()
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
   module.list().forEach((item) => {
      greet = module.greet(item, argv)
      if (greet) console.log(greet)
   })
}

function show_help(text) {
   if (text) console.log(text)
   yargs.showHelp()
}

function exist_check(key) {
   const list = require('./index').list()
   // If index is 0, it becomes false,
   // incrementing by 1
   return (list.indexOf(key) + 1)
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
