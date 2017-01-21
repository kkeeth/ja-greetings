module.exports = (text, opt) => {
   let greeting = ''
   const line = text.split('\n')
   greeting = '\n'
            + top_surround(line[0].length, opt)
            + text
            + bottom_surround(line[0].length, opt)

   return greeting
}


function top_surround (length, pattern) {
   switch (pattern) {
      case 'no':
         return ''

      case 'w-star':
         return new Array(Math.floor(length/2) + 3).join('☆ ') + '\n'

      case 'b-star':
         return new Array(Math.floor(length/2) + 3).join('★ ') + '\n'

      case 'slash':
         return new Array(Math.floor(length/3) + 3).join('/￣') + '\n'

      case 'asterisk':
         return new Array(Math.floor(length/2) + 3).join('＊') + '\n'

      case 'w-tri':
         return new Array(Math.floor(length/2) + 3).join('▽ ') + '\n'

      case 'b-tri':
         return new Array(Math.floor(length/2) + 3).join('▼ ') + '\n'

      default:
         return new Array(length + 3).join('-') + '\n'
   }
}

function bottom_surround (length, pattern) {
   switch (pattern) {
      case 'no':
         return ''

      case 'w-star':
         return '\n' + new Array(Math.floor(length/2) + 3).join('☆ ')

      case 'b-star':
         return '\n' + new Array(Math.floor(length/2) + 3).join('★ ')

      case 'slash':
         return '\n' + new Array(Math.floor(length/3) + 3).join('＿/')

      case 'asterisk':
         return '\n' + new Array(Math.floor(length/2) + 3).join('＊')

      case 'w-tri':
         return '\n' + new Array(Math.floor(length/2) + 3).join('△ ')

      case 'b-tri':
         return '\n' + new Array(Math.floor(length/2) + 3).join('▲ ')

      default:
         return '\n' + new Array(length + 3).join('-')
   }
}
