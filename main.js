import fs from 'node:fs';
import stream from 'node:stream';

const readStream = fs.createReadStream('./5-users.csv', { encoding: 'utf-8' });

function split(line) {
  const values = [];

  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === ',' && !insideQuotes) {
      values.push(current);
      current = '';
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else {
      current += char;
    }
  }

  values.push(current);

  return values;
}

const transformStream = new stream.Transform({
  // indicate that output of this stream will be object (arrays of values) rather than plain string/binary data
  readableObjectMode: true,

  construct(callback) {
    this.chunkRest = '';

    // call callback to indicate that stream is ready to receive data
    callback();
  },

  transform(chunk, encoding, callback) {
    const lines = (this.chunkRest + chunk.toString()).split('\n');

    // save last line of chunk data (in case if it not complete)
    this.chunkRest = lines.pop();

    lines.forEach((line) => {
      const values = split(line);

      this.push(values);
    });

    callback();
  },

  flush(callback) {
    // push rest of chunk data
    if (this.chunkRest) {
      this.push(this.chunkRest);
    }

    // indicate that stream is done
    this.push(null);

    callback();
  },
});

readStream.pipe(transformStream);

transformStream.on('data', (chunk) => {
  console.log({ chunk });
});

/*
stdout:
{
  chunk: [
    'id',
    'firstName',
    'lastName',
    'birthDate',
    'email',
    'profession',
    'country'
  ]
}
{
  chunk: [
    '646c6631-4ae8-4a0e-8847-e3ec88f98eb9',
    'Dacia',
    'Bach',
    '1992-11-24',
    'dacia.bach@yandex.com',
    'actor',
    'Montserrat'
  ]
}
{
  chunk: [
    '08d869a5-89cc-4700-9639-c68b0006ed79',
    'Adore',
    'Loeb',
    '1993-10-31',
    'adore.loeb@aol.com',
    'accountant',
    'Taiwan, Province of China'
  ]
}
{
  chunk: [
    '4fb2d3fe-6d0a-4893-8130-1fbd7cdeb1a2',
    'Albertina',
    'Ellord',
    '1993-01-16',
    'albertina.ellord@disroot.org',
    'psychologist',
    'Luxembourg'
  ]
}
{
  chunk: [
    'cef511a6-e835-4d4c-99f4-fb91824b7ca7',
    'Rani',
    'Zenas',
    '2001-03-20',
    'rani.zenas@gmx.com',
    'developer',
    'Egypt'
  ]
}
{
  chunk: [
    'eee1f727-1e80-47c5-8126-f47376f00616',
    'Jacenta',
    'Raul',
    '1990-11-09',
    'jacenta.raul@elude.in',
    'designer',
    'Botswana'
  ]
}
*/
