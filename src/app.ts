import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { Database } from './database';

dotenv.config({ path: path.resolve(__dirname, `../environments/${ process.env.NODE_ENV }.env`) })

const app = express();

Database.connect();

// app.use(express.json()); 全域都試用
app.use(express.urlencoded({ extended: true }))

// Routes settings
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, World!!');
});

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    // Fake API
    const getProfile = new Promise((resolve, reject) => {
      setTimeout(() => resolve({ name: 'HAO', age: 22 }), 100);
    });
    const getFriends = new Promise((resolve, reject) => {
      setTimeout(() => resolve([]), 120);
    });
    const errorRequest = new Promise((resolve, reject) => {
      setTimeout(() => reject('Oops!'), 2000);
    });
  
    getProfile
    .then(profile => getFriends)
    .then(friends => errorRequest)
    .then(() => res.send('Alright!'))
    .catch(err => next(err));
});

import apiRouter from './routers/api.routing';

app.use('/', apiRouter);

// Global handle error
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ message: err.message || err });
});

app.listen(process.env.PORT, () => { 
    console.log(
        "[server]: Server is running at http://localhost:%d in %s mode",
        process.env.PORT,
        process.env.NODE_ENV
    );
});