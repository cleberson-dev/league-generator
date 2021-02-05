import express, { Request, Response } from "express";

const app = express();

app.get("/", (_: Request, res: Response): Response => {
  return res.status(200).send({ message: "Hello, Cleberson!" });
});

export default app;
