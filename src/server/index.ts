import express from 'express';
import routes from '../routes';
import apponintments from '../routes/apponintments';
import '../database';

const app = express();

app.use(express.json());

app.use([routes, apponintments]);

app.listen(3333, () => {
  console.log('Server starter in port 3333');
});
