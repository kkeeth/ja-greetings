const path  = require('path')
const fs    = require('fs')


exports.get = (greeting) => {
   // exist check
   try {
      const file_path = path.join(__dirname, '/../greetings', greeting) + '.gr'
      const text = fs.readFileSync(file_path, "utf-8")
      return this.replace_ex(text)

   } catch(err) {
      return false
   }
}

exports.replace_ex = (greeting) => {
   greeting = greeting.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '')
   let match = /\$.*\s*=\s*<<EOC\n([\s\S]+)\nEOC/.exec(greeting)

   if (!match) greeting = "Cannot parse greeting file"
   else greeting = match[1]

   return greeting
}

exports.list = (key) => {
   // if add greeting then add below list too
   let greetings = [
      'new',
      'summer',
      'winter',
      'last'
   ]

   return greetings
}
