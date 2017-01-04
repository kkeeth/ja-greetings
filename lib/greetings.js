const path = require('path')
const fs   = require('fs')

exports.get = (greeting) => {
   let file_path = path.join(__dirname, '/../greetings', greeting) + '.gr'

   // exist check
   try {
      let text = fs.readFileSync(file_path, "utf-8")
      return replace_ex(text)
   } catch(err) {
      return 'Not found your option [' + greeting + ']!!'
   }
}

function replace_ex(greeting) {
   greeting = greeting.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '')
   let match = /\$.*\s*=\s*<<EOC\n([\s\S]+)\nEOC/.exec(greeting)

   if (!match) greeting = "Cannot parse greeting file!\n"
   else greeting = match[1]

   return greeting
}

exports.list = function (cb) {
   fs.readdir(path.join(__dirname, '../greetings'), (err, files) => {
      if (err) return cb(err)
      let greetings = files.map((item) => {
         return path.basename(item, '.gr')
      })

      return cb(null, greetings)
   })
}