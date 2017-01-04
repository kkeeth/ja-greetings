#!/usr/bin/env node
const argv = process.argv
for (let i = 2; i < argv.length; i++) {
   if (argv[i] === 'list')
      list_greetings()
   else
      greet(argv[i])
}
if (argv.length === 2) console.log('Please select an option!!')

function greet(item) {
   let module = require('./index')
   console.log(module.greet(item))
}

function list_greetings() {
   require('./index').list((err, list) => {
      if (err) throw new Error(err)
      console.log(list.join("\n"))
   })
}
