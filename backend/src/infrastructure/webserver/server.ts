import express, { NextFunction, Request, Response, Router } from 'express';
import cors from 'cors';
import { join, resolve } from 'path';
import cookieParser from 'cookie-parser';
import { sendResponse } from '../utils/status-response.util';

const serverExpress = express();
serverExpress.use(
  cors({
    origin: ['http://localhost:5173', 'https://e-mading-by-jujun.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
serverExpress.use(express.json());
serverExpress.use(cookieParser());
serverExpress.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
serverExpress.use(express.urlencoded({ extended: true }));
serverExpress.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  const msg = err.message;

  const sendRes = {
    statusCode,
    body: msg,
  };

  sendResponse(res, sendRes);
});

export const startServer = (port: number, routes: Router[]) => {
  routes.forEach((route) => {
    serverExpress.use(route);
  });

  serverExpress.listen(port, '0.0.0.0', () => console.log(`🛠️  Server running on port ${port}`));
};
