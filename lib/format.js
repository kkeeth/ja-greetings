// Constants for surround formatting
const SURROUND_PADDING = 3;
const DOUBLE_WIDTH_DIVISOR = 2;
const TRIPLE_WIDTH_DIVISOR = 3;

export default function format(text, opts) {
  const lines = text.split('\n');
  // Determine default hyphen based on language
  // Japanese (default): full-width hyphen (ー)
  // Other languages (en, ch): half-width hyphen (-)
  const defaultHyphen = opts.l ? '-' : 'ー';

  const greeting =
    '\n' +
    topSurround(getLength(lines, opts.l), opts.s, defaultHyphen) +
    text +
    bottomSurround(getLength(lines, opts.l), opts.s, defaultHyphen);

  return greeting;
}

function createPattern(count, str) {
  return new Array(Math.floor(count) + SURROUND_PADDING).join(str);
}

function createSurround(length, pattern, position, defaultHyphen) {
  const patterns = {
    no: () => '',
    'w-star': () => createPattern(length / DOUBLE_WIDTH_DIVISOR, '☆ '),
    'b-star': () => createPattern(length / DOUBLE_WIDTH_DIVISOR, '★ '),
    slash: () =>
      createPattern(
        length / TRIPLE_WIDTH_DIVISOR,
        position === 'top' ? '/￣' : '＿/',
      ),
    asterisk: () => createPattern(length / DOUBLE_WIDTH_DIVISOR, '＊'),
    'w-tri': () =>
      createPattern(
        length / DOUBLE_WIDTH_DIVISOR,
        position === 'top' ? '▽ ' : '△ ',
      ),
    'b-tri': () =>
      createPattern(
        length / DOUBLE_WIDTH_DIVISOR,
        position === 'top' ? '▼ ' : '▲ ',
      ),
    default: () => createPattern(length, defaultHyphen),
  };

  const generator = patterns[pattern] || patterns['default'];
  const line = generator();

  // Special case: 'no' pattern should return empty string without newlines
  if (pattern === 'no') {
    return '';
  }

  return position === 'top' ? line + '\n' : '\n' + line;
}

function topSurround(length, pattern, defaultHyphen) {
  return createSurround(length, pattern, 'top', defaultHyphen);
}

function bottomSurround(length, pattern, defaultHyphen) {
  return createSurround(length, pattern, 'bottom', defaultHyphen);
}

function getLength(lines, flg) {
  let max = lines[0].length;
  if (!flg) {
    return max;
  } else {
    for (let line of lines) {
      if (line.length > max) max = line.length;
      // Double-byte character check
      max += countCharacters(line);
    }
    return max;
  }
}

function countCharacters(text) {
  let count = 0;
  // Count characters that take more than 1 byte (double-width characters)
  for (let char of text) {
    // Characters beyond ASCII range are typically double-width in terminal
    if (char.charCodeAt(0) > 127) {
      count++;
    }
  }
  // Return half of the count to match original escape() behavior
  // Original logic counted % encodings and divided by 2
  return count / 2;
}
