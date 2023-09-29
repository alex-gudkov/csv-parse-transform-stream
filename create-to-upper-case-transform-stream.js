import stream from 'node:stream';

export function createToUpperCaseTransformStream() {
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
