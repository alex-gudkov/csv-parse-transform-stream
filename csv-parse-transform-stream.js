import stream from 'node:stream';
import { csvSplitLine } from './csv-split-line.js';

export class CsvParseTransformStream extends stream.Transform {
  _chunkRest;
  _separator;
  _quote;

  constructor() {
    super({
      readableObjectMode: true,
    });

    this._chunkRest = '';
    this._separator = ',';
    this._quote = '"';
  }

  /**
   * @param {string[]} lines
   * @returns {void}
   */
  _parseChunkLines(lines) {
    for (const line of lines) {
      // skip lines with no values
      if (!line.trim()) {
        continue;
      }

      const values = csvSplitLine(line, this._separator, this._quote);

      this.push(values);
    }
  }

  _transform(chunk, encoding, callback) {
    const lines = (this._chunkRest + chunk.toString()).split('\n');

    // save last line of chunk data (in case if it not complete)
    this._chunkRest = lines.pop();

    this._parseChunkLines(lines);

    callback();
  }

  _flush(callback) {
    if (this._chunkRest) {
      // parse the rest of chunk
      const lines = this._chunkRest.split('\n');

      this._parseChunkLines(lines);

      // flush the rest of chunk
      this._chunkRest = '';
    }

    callback();
  }
}
