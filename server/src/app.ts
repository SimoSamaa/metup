import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { readdirSync } from 'fs';
import { join } from 'path';

const app = express();
const port = (process.env.PORT || 3000).toString();
const MONGO_DB =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.6iew5xq.mongodb.net/${process.env.MONGO_DB_NAME}`;

// ?retryWrites=true&w=majority&appName=Cluster0

app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const pathToRouters = join(__dirname, './routers');

readdirSync(pathToRouters)
  .map((r: string) => app.use('/', require(`./routers/${r}`).default));

interface ErrorStatus {
  statusCode: number;
  message: string;
}

app.use((error: ErrorStatus, _: Request, res: Response, next: NextFunction): void => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ message: message });
  next();
});

mongoose.connect(MONGO_DB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log('routers files:', readdirSync(pathToRouters));
    });
  })
  .catch((err: Error) => {
    console.log(`METUP error server: ${err}`);
  });