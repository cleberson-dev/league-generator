import express, { Request, Response } from "express";
import graphQLAPI from './graphql';

const app = express();
graphQLAPI.applyMiddleware({ app, path: '/graphql' });
app.get("/", (_: Request, res: Response): Response => {
  return res.status(200).send({ message: "Hello, Cleberson!" });
});

export default app;
