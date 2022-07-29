import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { Database } from './database';

dotenv.config({ path: path.resolve(__dirname, `../environments/${ process.env.NODE_ENV }.env`) })

const app = express();

Database.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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
    .then(() => res.send('GoGoGo!'))
    .catch(err => next(err));
});

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