import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/usersRouter';
import cocktailsRouter from './routers/cocktailsRouter';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/cocktails', cocktailsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`port is running at ${port} port`);
  });
};

run().catch((e) => console.error(e));
