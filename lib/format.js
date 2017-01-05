module.exports = (text) => {
   let greeting = ''
   const line = text.split('\n')
   greeting = top(line[0].length) + text + bottom(line[0].length)

   return greeting
}

function top (length) {
   return new Array(length + 3).join("_") + "\n";
}

function bottom (length) {
   return "\n" + new Array(length + 3).join("-");
}