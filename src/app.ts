import express, { Request, Response } from "express";
import morgan from 'morgan';
import fs from 'fs';
import graphQLAPI from './graphql';
import config, { getEnvironmentBasedValue } from './config';

const app = express();

const morganLogFormat = getEnvironmentBasedValue({
  production: 'combined',
  development: 'dev'
});
const morganStream = config.environment === 'production' ?
  fs.createWriteStream('logs') :
  process.stdout;

app.use(morgan(morganLogFormat, { stream: morganStream }));

graphQLAPI.applyMiddleware({ app, path: '/graphql' });

app.get("/", (_: Request, res: Response): Response => {
  return res.status(200).send({ message: 'Hello, Cleberson!' });
});

export default app;
