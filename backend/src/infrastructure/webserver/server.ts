import express, { Router } from 'express';
import cors from 'cors';
import { join, resolve } from 'path';
import cookieParser from 'cookie-parser';

const serverExpress = express();
serverExpress.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
serverExpress.use(express.json());
serverExpress.use(cookieParser());
serverExpress.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
serverExpress.use(express.urlencoded({ extended: true }));

export const startServer = (port: number | string, routes: Router[]) => {
  routes.forEach((route) => {
    serverExpress.use(route);
  });

  serverExpress.listen(port, () => console.log(`🛠️  Server running on port ${port}`));
};
