import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.json({ message: 'Hello word' });
});

app.listen(3333, () => {
  console.log('Server starter in port 3333');
});
