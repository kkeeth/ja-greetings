#!/usr/bin/env node
const argv = process.argv
for (let i = 2; i < argv.length; i++) {
   if (argv[i] === 'list')
      list_greetings()
   else
      greet(argv[i])
}
if (argv.length === 2) console.log('Please select an option')

function greet(item) {
   const module = require('./index')
   console.log(module.greet(item))
}

function list_greetings() {
   const list = require('./index').list()
   console.log(list.join("\n"))
}
