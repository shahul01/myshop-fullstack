/**
 * server → routes → controllers → services → queries
 *
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { initRoutes } from './routes/index';


dotenv.config();
const app = express();
const port = 8000;

// TODO: get url from env
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

initRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
