const path  = require('path')
const fs    = require('fs')

exports.get = (greeting, opt) => {
   // exist check
   try {
      const file_path = path.join(__dirname, '/../greetings', greeting) + '.gr'
      const text = fs.readFileSync(file_path, "utf-8")
      return this.replace_ex(text, opt)

   } catch(err) {
      return false
   }
}

exports.replace_ex = (greeting, opt) => {
   opt = opt || 'origin'
   greeting = greeting.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '')
   const regexp = new RegExp('\\$' + opt + '\\s*>\\n([\\s\\S]+)\\n<\\s*' + opt)
   const match = greeting.match(regexp)

   if (!match) greeting = "Cannot parse greeting file"
   else greeting = match[1]

   return greeting
}

exports.get_greetings = () => {
   // if add new greeting then add below list too
   let greetings = [
      'new',
      'summer',
      'winter',
      'last',
      'all'
   ]

   return greetings
}

exports.get_dialects = () => {
   // if add new dialects then add below list too
   let dialects = [
      'kyoto',
      'osaka',
      'okinawa',
      'hiroshima'
   ]

   return dialects
}

exports.get_surrounds = () => {
   // if add new surrounds then add below list too
   let surrounds = [
      'no',
      'w-star',
      'b-star',
      'w-tri',
      'b-tri',
      'asterisk',
      'slash'
   ]

   return surrounds
}
