import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function get(greeting, opt) {
   // exist check
   try {
      const file_path = path.join(__dirname, '/../greetings', greeting) + '.gr'
      const text = fs.readFileSync(file_path, "utf-8")
      return replaceEx(text, opt)
   } catch(err) {
      return false
   }
}

export function replaceEx(greeting, opt) {
   opt = opt || 'origin'
   greeting = greeting.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '')
   const regexp = new RegExp('\\$' + opt + '\\s*>\\n([\\s\\S]+)\\n<\\s*' + opt)
   const match = greeting.match(regexp)

   if (!match) greeting = "Cannot parse greeting file"
   else greeting = match[1]

   return greeting
}

export function getGreetings() {
   // if add new greeting then add below list too
   const greetings = {
      a: 'all',
      n:  'new',
      s:  'summer',
      w:  'winter',
      l:  'last',
      t:  'thx',
      so: 'sorry'
   }

   return greetings
}

export function getDialects() {
   // if add new dialects then add below list too
   const dialects = [
      'kyoto',
      'osaka',
      'okinawa',
      'hiroshima'
   ]

   return dialects
}

export function getLanguages() {
   // if add new languages then add below list too
   const languages = [
      'en',
      'ch'
   ]

   return languages
}

export function getSurrounds() {
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
