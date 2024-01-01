/**
 * server → routes → controllers → services → queries
 *
 */

import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { port, sessionSecret, urlFrontend } from './constant';
import { initRoutes } from './routes/index';


dotenv.config();

const app = express();
// TODO: get url from env
app.use(cors({ credentials: true, origin: urlFrontend }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

initRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
