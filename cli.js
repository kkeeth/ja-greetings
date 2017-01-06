#!/usr/bin/env node
const argv = require('optimist')
   .usage( "Usage:\n"
         + "  $0 <options>\n\n"
         + "Options:\n"
         + "  a, all    : show all greetings\n"
         + "  n, new    : new years greeting\n"
         + "  s, summer : summer greeting\n"
         + "  w, winter : winter greeting\n"
         + "  l, last   : end of years greeting\n"
         + "  h, help   : show help this tool"
   )
   .argv

if (argv._.length === 0) {
   show_help()
} else {
   for (let i = 0; i < argv._.length; i++) {
      switch (argv._[i]) {
         case 'a':
         case 'all':
            greet_all()
            break
         case 'h':
         case 'help':
            show_help()
            break
         default:
            greet(convert(argv._[i]))
            break
      }
   }
}

function greet(item) {
   const module = require('./index')
   console.log(module.greet(item))
}

function greet_all() {
   const module = require('./index')
   module.list().forEach((item) => {
      console.log(module.greet(item))
   })
}

function show_help() {
   console.log('\n')
   require('optimist').showHelp()
}

function convert(key) {
   let ret = ''
   switch(key) {
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
