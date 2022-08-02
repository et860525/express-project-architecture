import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import { Database } from './database';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import { AppRoute } from './app.routing';
export class App {

  private app = express();
  private route: AppRoute = new AppRoute();

  constructor() {
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.setUrlencoded();
    this.registerRoute();
  }

  /* -------------------------------------------------------------------------- */
  /*                               Public Methods                               */
  /* -------------------------------------------------------------------------- */

  public runServer(): void {
    this.app.listen(process.env.PORT, () => { 
      console.log(
          "[server]: Server is running at http://localhost:%d in %s mode",
          process.env.PORT,
          process.env.NODE_ENV
      );
    });
  }

  public setException(handler: ErrorRequestHandler): void {
    this.app.use(handler);
  }

  public launchDatabase(): void {
    const database = new Database();
    database.connect();
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Methods                              */
  /* -------------------------------------------------------------------------- */

  private setEnvironment(): void {
    dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
  }

  private setHelmet(): void {
    this.app.use(helmet());
  }

  private setCors(): void {
    this.app.use(cors());
  }

  private setUrlencoded(): void {
    this.app.use(express.urlencoded({ extended: true }));
  }

  private registerRoute(): void {
    this.app.use('/', this.route.router);
  }
}