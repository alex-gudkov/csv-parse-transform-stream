/**
 * @param {string} line
 * @param {string} separator
 * @param {string} quote
 * @returns {string[]}
 */
export function csvSplitLine(line, separator, quote) {
  const values = [];

  let value = '';
  let isInsideQuotes = false;

  for (const char of line) {
    if (char === separator && !isInsideQuotes) {
      values.push(value);

      value = '';
    } else if (char === quote) {
      isInsideQuotes = !isInsideQuotes;
    } else {
      value += char;
    }
  }

  values.push(value);

  return values;
}
