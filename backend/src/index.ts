/**
 * server → routes → controllers → services → queries
 *
 */

import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { initRoutes } from './routes/index';


dotenv.config();
const sessionSecret = process.env.SESSION_SECRET || 'secret';
const port = process.env.PORT || 8000;
const urlFrontend = process.env.URL_FRONTEND || 'http://localhost:3000';

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

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
