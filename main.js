import fs from 'node:fs';
import stream from 'node:stream';

function createToUpperCaseTransformStream() {
  return new stream.Transform({
    encoding: 'utf-8',

    transform(chunk, encoding, callback) {
      const upperCaseChunk = chunk.toString().toUpperCase();

      this.push(upperCaseChunk);

      callback();
    },

    flush(callback) {
      this.push(null);

      callback();
    },
  });
}

const readStream = fs.createReadStream('./5-users.csv', { encoding: 'utf-8' });

const transformStream = createToUpperCaseTransformStream();

readStream.pipe(transformStream);

transformStream.on('data', (chunk) => {
  console.log({ chunk });
});
