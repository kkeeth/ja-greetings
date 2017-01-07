#!/usr/bin/env node
const argv = require('optimist')
   .usage( "Usage:\n"
         + "  $0 <options>\n\n"
         + "Commands:\n"
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
            let key = convert(argv._[i])
            const ret = (exist_check(key) && greet(key))
            if (ret == false) show_help()
            break
      }
   }
}

function greet(item) {
   const module = require('./index')
   const greet = module.greet(item)
   if (greet)
      console.log(module.format(greet))
}

function greet_all() {
   const module = require('./index')
   let greet = ''
   module.list().forEach((item) => {
      greet = module.greet(item)
      console.log(module.format(greet))
   })
}

function show_help() {
   require('optimist').showHelp()
}

function exist_check(key) {
   const list = require('./index').list()
   return (list.indexOf(key) + 1)
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
