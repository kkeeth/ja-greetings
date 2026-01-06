import * as app from './app.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const package_json = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))

function run(yargs) {
   const argv = yargs.argv

   const is_exist = exist_check(argv)
   let key = convert(argv._[0])

   // 'help' is top priority option
   if (argv.h) {
      show_help(yargs)
   }
   else if (argv._.length >= 2) {
      show_help(yargs, 'Error: Please input only one command\n')
   }
   else if (is_exist < 1) {
         show_help(yargs)
   }
   else {
      switch (key) {
         case 'all':
            greet_all(argv)
            break
         default:
            greet(key, argv)
            break
      }
   }
}

function greet(item, argv) {
   const greet = app.greet(item, argv)
   if (greet) console.log(greet)
}

function greet_all(argv) {
   const greetings = app.get_greetings()
   let greet = ''
   for (let key in greetings) {
      if (greetings[key] === 'all') continue

      greet = app.greet(greetings[key], argv)
      if (greet) console.log(greet)
   }
}

function show_help(yargs, text) {
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

export default {
   run: run
}
