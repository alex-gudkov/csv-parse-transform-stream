import fs from 'node:fs';
import { CsvParseTransformStream } from './csv-parse-transform-stream.js';

const filePath = './data/5-users.csv';
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

const csvParseTransformStream = new CsvParseTransformStream({ objectMode: true });

readStream.pipe(csvParseTransformStream).on('data', (chunk) => {
  console.log({ chunk });
});
