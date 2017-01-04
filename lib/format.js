module.exports = (text) => {
   let greeting = ''
   console.log(text)
   greeting += top(text.length) + bottom(text.length)

   return greeting
}

function top (length) {
   return new Array(length + 3).join("_");
}

function bottom (length) {
   return new Array(length + 3).join("-");
}