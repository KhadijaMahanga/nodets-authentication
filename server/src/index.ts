/** Import Modules*/
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { port } from './config';
import prisma from './client';
import router from './routes';

// New Express application
const app: Express = express();

async function main () {
  // App Configuration
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  
  //register routes
  app.use(router);
  
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({ message: `User Authentication API` });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

}


main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });