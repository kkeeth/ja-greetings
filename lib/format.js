module.exports = (text, opt) => {
   let greeting = ''
   const line = text.split('\n')
   greeting = '\n' + top(line[0].length, opt) + text + bottom(line[0].length, opt)

   return greeting
}


function top (length, pattern) {
   switch(pattern) {
      case 'no':
         return ''
         break
      case 'w-star':
         return new Array(Math.floor(length/2) + 3).join('☆ ') + '\n'
         break
      case 'b-star':
         return new Array(Math.floor(length/2) + 3).join('★ ') + '\n'
         break
      case 'slash':
         return new Array(Math.floor(length/3) + 3).join('/￣') + '\n'
         break
      case 'asterisk':
         return new Array(Math.floor(length/2) + 3).join('＊') + '\n'
         break
      default:
         return new Array(length + 3).join('-') + '\n'
         break
   }
}

function bottom (length, pattern) {
   switch(pattern) {
      case 'no':
         return ''
         break
      case 'w-star':
         return '\n' + new Array(Math.floor(length/2) + 3).join('☆ ')
         break
      case 'b-star':
         return '\n' + new Array(Math.floor(length/2) + 3).join('★ ')
         break
      case 'slash':
         return '\n' + new Array(Math.floor(length/3) + 3).join('＿/')
         break
      case 'asterisk':
         return '\n' + new Array(Math.floor(length/2) + 3).join('＊')
         break
      default:
         return '\n' + new Array(length + 3).join('-')
         break
   }
}
