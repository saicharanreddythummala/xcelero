import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import createConnection from './config/db.js';
import { userRoute } from './routes/users.js';
import { errorMiddleWare } from './middleware/error.js';

dotenv.config({
  path: path.join('config/secret.env'),
});

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
  res.send('Home');
});

app.use('/users', userRoute);

app.use(errorMiddleWare)

app.listen(process.env.PORT, () => {
  console.log('up and running port: ' + process.env.PORT);
});
