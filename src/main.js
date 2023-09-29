import fs from 'node:fs';
import { CsvParseTransformStream } from './csv/csv-parse-transform-stream.js';

const readStream = fs.createReadStream('./data/5-users.csv', { encoding: 'utf-8' });

const csvParseTransformStream = new CsvParseTransformStream();

readStream.pipe(csvParseTransformStream);

csvParseTransformStream.on('data', (chunk) => {
  console.log({ chunk });
});
