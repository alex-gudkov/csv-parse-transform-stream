import stream from 'node:stream';

class ToUpperCaseTransformStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();

    this.push(upperCaseChunk);

    callback();
  }

  // this method is optional but it's a good practice to implement it
  _flush(callback) {
    this.push(null);

    callback();
  }
}

function createTransformStream(options) {
  return new ToUpperCaseTransformStream(options);
}

export { ToUpperCaseTransformStream, createTransformStream };
