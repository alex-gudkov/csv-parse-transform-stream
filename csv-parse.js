import stream from 'node:stream';

/**
 * @param {string} line
 * @param {string} separator
 * @param {string} quote
 * @returns {string[]}
 */
function csvSplitLine(line, separator, quote) {
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

/**
 * @param {stream.TransformOptions} options
 * @returns {stream.Transform}
 */
function createTransformStream(options) {
  return new stream.Transform({
    ...options,

    readableObjectMode: true,

    construct(callback) {
      this.chunkRest = '';
      this.separator = ',';
      this.quote = '"';

      callback();
    },

    transform(chunk, encoding, callback) {
      const lines = (this.chunkRest + chunk.toString()).split('\n');

      this.chunkRest = lines.pop();

      for (const line of lines) {
        const values = csvSplitLine(line, this.separator, this.quote);

        this.push(values);
      }

      callback();
    },

    flush(callback) {
      if (this.chunkRest) {
        this.push(this.chunkRest);
      }

      callback();
    },
  });
}

const csvParse = {
  createTransformStream,
};

export default csvParse;
