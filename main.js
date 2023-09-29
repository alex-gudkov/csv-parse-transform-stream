import fs from 'node:fs';

fs.readFile('./5-users.csv', 'utf-8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  console.log(data);
});
