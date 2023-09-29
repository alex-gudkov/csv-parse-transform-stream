import fs from 'node:fs';
import * as toUpperCase from './to-upper-case.js';

const readStream = fs.createReadStream('./5-users.csv', { encoding: 'utf-8' });

const transformStream = toUpperCase.createTransformStream({ encoding: 'utf-8' });

readStream.pipe(transformStream);

transformStream.on('data', (chunk) => {
  console.log({ chunk });
});
