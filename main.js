import fs from 'node:fs';

const readStream = fs.createReadStream('./5-users.csv', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
  console.log({ chunk });
});

/*
stdout:
{
  chunk:
    'id,firstName,lastName,birthDate,email,profession,country\n' +
    '646c6631-4ae8-4a0e-8847-e3ec88f98eb9,Dacia,Bach,1992-11-24,dacia.bach@yandex.com,actor,Montserrat\n' +
    '08d869a5-89cc-4700-9639-c68b0006ed79,Adore,Loeb,1993-10-31,adore.loeb@aol.com,accountant,"Taiwan, Province of China"\n' +
    '4fb2d3fe-6d0a-4893-8130-1fbd7cdeb1a2,Albertina,Ellord,1993-01-16,albertina.ellord@disroot.org,psychologist,Luxembourg\n' +
    'cef511a6-e835-4d4c-99f4-fb91824b7ca7,Rani,Zenas,2001-03-20,rani.zenas@gmx.com,developer,Egypt\n' +
    'eee1f727-1e80-47c5-8126-f47376f00616,Jacenta,Raul,1990-11-09,jacenta.raul@elude.in,designer,Botswana\n'
}

*/
