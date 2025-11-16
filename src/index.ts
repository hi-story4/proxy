import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'reflect-metadata';

const app = express();
const PORT = 3000;

// CORS configuration matching NestJS backend
app.use(cors({
  origin: ['https://frontend-edu-play-phi.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.json());

// Proxy all requests to backend, removing /api prefix
app.use('/', createProxyMiddleware({
  target: 'https://port-0-backend-new-mhywbyx0b35c5b8c.sel3.cloudtype.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix (backend already has 'api' prefix)
  },
  logger: console,
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Proxying to: https://port-0-backend-new-mhywbyx0b35c5b8c.sel3.cloudtype.app`);
});
