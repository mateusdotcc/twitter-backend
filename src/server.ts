require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import { resolve } from 'path';
import cors from 'cors';

import routes from './routes';

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port http://localhost:3333');
});
