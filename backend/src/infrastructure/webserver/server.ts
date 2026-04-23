import express, { Router } from 'express';
import cors from 'cors';
import fs from 'fs';

import { dirname, join } from 'path';
import path from 'path';

const serverExpress = express();

serverExpress.use(express.json());
serverExpress.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);
serverExpress.use('/uploads', express.static(join(__dirname, '..','uploads')));
serverExpress.use(express.urlencoded({ extended: true }));

export const startServer = (port: number | string, routes: Router[]) => {
  routes.forEach((route) => {
    serverExpress.use(route);
  });

  serverExpress.listen(port, () => console.log(`🛠️  Server running on port ${port}`));
};
