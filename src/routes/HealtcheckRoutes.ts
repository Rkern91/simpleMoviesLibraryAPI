import express, { Request, Response } from 'express';
import os                             from 'os';
import { Pool }                       from 'pg';
import dotenv                         from "dotenv";

dotenv.config()

const RouterSystemStatus = express.Router();

RouterSystemStatus.post('/healtcheck', async (req: Request, res: Response) => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: '',
    port: 5432,
  });

  const uptime      = process.uptime();
  const memoryUsage = process.memoryUsage();
  const loadAverage = os.loadavg();

  try
  {
    await pool.query('SELECT 1');

    res.status(200).json({
      status: 'UP',
      uptime: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`,
      memory: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      },
      load: loadAverage,
      database: 'Connected',
    });
  }
  catch (err)
  {
    res.status(500).json({
      status: 'DOWN',
      database: 'Disconnected',
      error: err.message,
    });
  }
});

export default RouterSystemStatus;