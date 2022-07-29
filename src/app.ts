import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, `../environments/${ process.env.NODE_ENV }.env`) })

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, World!!');
});

app.listen(process.env.PORT, () => { 
    console.log(
        "[server]: Server is running at http://localhost:%d in %s mode",
        process.env.PORT,
        process.env.NODE_ENV
    );
});