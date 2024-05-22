import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(`${__dirname}/../.env`),
});

export const port: number = parseInt(process.env.PORT as string, 10) || 7000;

export const db_host: string = String(process.env.DB_HOST);
export const db_port: number = Number(process.env.DB_PORT);
export const db_name: string = String(process.env.DB_NAME);
export const db_user: string = String(process.env.DB_USER);
export const db_password: string = String(process.env.DB_PASSWORD);

export const node_env = process.env.NODE_ENV;
export const log = process.env.LOG;
