import express, { Request, Response } from "express";
import morgan from 'morgan';
import fs from 'fs';
import graphQLAPI from './graphql';
import config from './config';

const app = express();

const morganLogFormat = {
  production: 'combined',
  development: 'dev'
}[config.environment];


app.use(morgan(morganLogFormat, {
  stream:
    config.environment === 'production' ?
      fs.createWriteStream('logs') :
      process.stdout
}));

graphQLAPI.applyMiddleware({ app, path: '/graphql' });

app.get("/", (_: Request, res: Response): Response => {
  return res.status(200).send({ message: 'Hello, Cleberson!' });
});

export default app;
