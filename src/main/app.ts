import express, { Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import graphQLAPI from 'main/graphql';
import config, { getEnvironmentBasedValue } from 'common/config';
import {
  userRouter, teamRouter, matchRouter, leagueRouter
} from 'main/routes';

const app = express();

app.use(express.json());
graphQLAPI.applyMiddleware({ app, path: '/graphql' });

const morganFormat: string = getEnvironmentBasedValue({
  production: 'combined',
  development: 'dev',
});
const morganOptions: morgan.Options<Request, Response> = {
  stream:
    config.environment === 'production'
      ? fs.createWriteStream('logs')
      : process.stdout,
};
const morganMiddleware = morgan(morganFormat, morganOptions);
app.use(morganMiddleware);


app.get('/', (_: Request, res: Response) => (
  res.status(200).send({ message: 'Hello, Cleberson!' })
));

// REST API Routes
app.use('/auth', userRouter);
app.use('/leagues', leagueRouter);
app.use('/teams', teamRouter);
app.use('/matches', matchRouter);

export default app;
