import fs from 'node:fs';
import stream from 'node:stream';

const readStream = fs.createReadStream('./5-users.csv', { encoding: 'utf-8' });

const transformStream = new stream.Transform({
  encoding: 'utf-8',

  // transform is called when there is data to be consumed from readable consumer
  transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();

    // push transformed chunk to readable consumer
    this.push(upperCaseChunk);

    // signal that transformation of chunk is complete
    callback();
  },

  // flush is called when there is no more data to be consumed from the readable consumer
  flush(callback) {
    // signal that readable consumer should not expect more data
    this.push(null);

    // signal that flushing is complete
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
  chunk:
    'ID,FIRSTNAME,LASTNAME,BIRTHDATE,EMAIL,PROFESSION,COUNTRY\n' +
    '646C6631-4AE8-4A0E-8847-E3EC88F98EB9,DACIA,BACH,1992-11-24,DACIA.BACH@YANDEX.COM,ACTOR,MONTSERRAT\n' +
    '08D869A5-89CC-4700-9639-C68B0006ED79,ADORE,LOEB,1993-10-31,ADORE.LOEB@AOL.COM,ACCOUNTANT,"TAIWAN, PROVINCE OF CHINA"\n' +
    '4FB2D3FE-6D0A-4893-8130-1FBD7CDEB1A2,ALBERTINA,ELLORD,1993-01-16,ALBERTINA.ELLORD@DISROOT.ORG,PSYCHOLOGIST,LUXEMBOURG\n' +
    'CEF511A6-E835-4D4C-99F4-FB91824B7CA7,RANI,ZENAS,2001-03-20,RANI.ZENAS@GMX.COM,DEVELOPER,EGYPT\n' +
    'EEE1F727-1E80-47C5-8126-F47376F00616,JACENTA,RAUL,1990-11-09,JACENTA.RAUL@ELUDE.IN,DESIGNER,BOTSWANA\n'
}
*/
