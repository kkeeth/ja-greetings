const app = require('./app')
const yargs = require('yargs')
const package_json = require('../package.json')
const argv = yargs.argv

function run() {
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
   const languages = app.get_languages()
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
   if (argv.l && ret) ret = languages.indexOf(argv.l) + 1
   if (argv.s && ret) ret = surrounds.indexOf(argv.s) + 1

   return ret
}

function convert(key) {
   const greetings = app.get_greetings()
   return greetings[key] || key
}

module.exports = {
   run: run
}
