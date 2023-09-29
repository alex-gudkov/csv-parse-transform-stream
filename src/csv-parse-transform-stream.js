import stream from 'node:stream';
import { csvSplitLine } from './csv-split-line.js';

export class CsvParseTransformStream extends stream.Transform {
  _chunkRest;

  constructor(options) {
    super(options);

    this._chunkRest = '';
  }

  _transform(chunk, encoding, callback) {
    const lines = (this._chunkRest + chunk.toString()).split('\n');

    this._chunkRest = lines.pop();

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      const values = csvSplitLine(line, ',', '"');

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

        const values = csvSplitLine(line, ',', '"');

        this.push(values);
      }

      this._chunkRest = '';
    }

    callback();
  }
}
