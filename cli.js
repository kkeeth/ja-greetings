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
      'h': {
         alias: 'help',
         describe: 'Show help'
      }
   })
   .epilog('Dialect:\n' + '  kyoto osaka okinawa')
   .locale('en')
const argv = yargs.argv
let key = convert(argv._[0])

if (argv._.length === 0 || argv.h) {
   show_help()
} else {
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
   const greet = module.greet(item, argv.d)
   if (greet)
      console.log(module.format(greet))
}

function greet_all() {
   const module = require('./index')
   let greet = ''
   module.list().forEach((item) => {
      greet = module.greet(item, argv.d)
      console.log(module.format(greet))
   })
}

function show_help() {
   yargs.showHelp()
}

function exist_check(key) {
   const list = require('./index').list()
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