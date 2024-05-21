/** Import Modules*/
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { port } from './config';
import sequelizeConnection from "./database";

// New Express application
const app: Express = express();

// App Configuration
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ message: `User Authentication API` })
})

try {
  
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}

const start = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    //create table on db
    await sequelizeConnection.sync();
    console.log('Connection to Database has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

void start()