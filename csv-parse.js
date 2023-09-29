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

class CsvParseTransformStream extends stream.Transform {
  _chunkRest = '';
  _separator = ',';
  _quote = '"';

  constructor() {
    super({
      readableObjectMode: true,
    });
  }

  _transform(chunk, encoding, callback) {
    const lines = (this._chunkRest + chunk.toString()).split('\n');

    this._chunkRest = lines.pop();

    for (const line of lines) {
      const values = csvSplitLine(line, this._separator, this._quote);

      this.push(values);
    }

    callback();
  }

  _flush(callback) {
    if (this._chunkRest) {
      this.push(this._chunkRest);

      this._chunkRest = '';
    }

    callback();
  }
}

/**
 * @returns {CsvParseTransformStream}
 */
function createTransformStream() {
  return new CsvParseTransformStream();
}

const csvParse = {
  createTransformStream,
};

export default csvParse;
