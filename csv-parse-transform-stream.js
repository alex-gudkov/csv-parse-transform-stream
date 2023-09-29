import stream from 'node:stream';
import { csvSplitLine } from './csv-split-line.js';

export class CsvParseTransformStream extends stream.Transform {
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
