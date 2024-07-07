import express, { Request, Response, NextFunction } from "express";
import fileUpload from 'express-fileupload';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { readdirSync } from 'fs';
import { join } from 'path';

const app = express();
const port = (process.env.PORT || 3000).toString();

app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));

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
  const message = error.message || 'An unknown error occurred!';

  res.status(status).json({ message });
  next();
});

mongoose.connect(process.env.MONGO_DB as string)
  .then(() => {
    app.listen(port, () => {
      process.stdout
        .write(`Server is running in -> \x1b[34m${process.env.LOCALHOST}:${port}\x1b[0m\n`);
      console.log('routers files:', readdirSync(pathToRouters));
    });
  })
  .catch((err: Error) => {
    console.log(`METUP error server: ${err}`);
  });