export default function format(text, opts) {
   const lines = text.split('\n')
   const greeting = '\n'
            + top_surround(get_length(lines, opts.l), opts.s)
            + text
            + bottom_surround(get_length(lines, opts.l), opts.s)

   return greeting
}

function top_surround(length, pattern, lang_flg) {
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

function bottom_surround(length, pattern) {
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

function get_length(lines, flg) {
   let max = lines[0].length
   if (!flg)
      return max
   else
      for (let line of lines) {
         if (line.length > max) max = line.length
         // Double-byte character check
         max += count_characters(line)
      }
      return max
}

function count_characters(text) {
   let len = 0
   let str = escape(line)

   for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === "%") {
         if (str.charAt(++i) === "u") {
            i += 3;
            len++;
         }
         i++;
      }
   }

   return len / 2
}
