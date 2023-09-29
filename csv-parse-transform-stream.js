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

  _transform(chunk, encoding, callback) {
    const lines = (this._chunkRest + chunk.toString()).split('\n');

    this._chunkRest = lines.pop();

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      const values = csvSplitLine(line, this._separator, this._quote);

      this.push(values);
    }

    callback();
  }

  _flush(callback) {
    if (this._chunkRest) {
      const lines = this._chunkRest.split('\n');

      for (const line of lines) {
        if (!line.trim()) {
          continue;
        }

        const values = csvSplitLine(line, this._separator, this._quote);

        this.push(values);
      }

      this._chunkRest = '';
    }

    callback();
  }
}
