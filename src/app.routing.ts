import { RouteBase } from './bases/route.base';
import { ApiRoute } from './routes/api/api.routing';

export class AppRoute extends RouteBase {

  // Non-null assertion
  private apiRoute!: ApiRoute;

  constructor() {
    super();
  }

  // 必須要在 initial 宣告 ApiRoute，在外面宣告會 error
  protected initial(): void {
    this.apiRoute = new ApiRoute();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.use('/api', this.apiRoute.router);
  }

};