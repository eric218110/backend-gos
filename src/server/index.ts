import express from 'express';
import routes from '../routes';
import multer from '../config/multer';
import '../database';

const app = express();

app.use(express.json());
app.use('/files', express.static(multer.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server starter in port 3333');
});
