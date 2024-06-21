import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(`${__dirname}/../.env`),
});

export const port: number = parseInt(process.env.PORT as string, 10) || 7000;

export const node_env = process.env.NODE_ENV;
export const log = process.env.LOG;
export const jwt_secret = String(process.env.ACCESS_TOKEN_SECRET);
export const jwt_expiry = String(process.env.ACCESS_TOKEN_EXPIRY);
export const refresh_secret = String(process.env.REFRESH_TOKEN_SECRET);
export const refresh_expiry = String(process.env.REFRESH_TOKEN_EXPIRY);
