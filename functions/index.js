import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import cors from 'cors';

import auth from './routes/auth';
import users from './routes/users';
import drinks from './routes/drinks';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
console.log('process.env.MONGODB_URL', process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use(cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/drinks', drinks);

app.listen(8080, () => console.log('Running on localhost:8080'));
