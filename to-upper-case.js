import stream from 'node:stream';

export class ToUpperCaseTransformStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();

    this.push(upperCaseChunk);

    callback();
  }
}

/**
 * Creates an instance of ToUpperCaseTransformStream.
 * @param {stream.TransformOptions} options
 * @returns {ToUpperCaseTransformStream}
 */
export function createTransformStream(options) {
  return new ToUpperCaseTransformStream(options);
}
