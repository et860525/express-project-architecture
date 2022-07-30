import { RouteBase } from './bases/route.base';
import apiRoute from './routes/api/api.routing';

export class AppRoute extends RouteBase {

  constructor() {
    super();
  }

  protected registerRoute(): void {
    this.router.use('/api', apiRoute);
  }

};