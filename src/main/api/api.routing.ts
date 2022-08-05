import { RouteBase } from '../../bases/route.base';
import { TodoRoute } from './todo/todo.routing';
import { LocalAuthRoute } from './local-auth/local-auth.routing';

export class ApiRoute extends RouteBase {
  
  private todoRoute!: TodoRoute;
  private localAuth!: LocalAuthRoute;

  constructor() {
    super();
  }

  protected initial(): void {
    this.todoRoute = new TodoRoute();
    this.localAuth = new LocalAuthRoute();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.use('/auth', this.localAuth.router)
    this.router.use('/todos', this.todoRoute.router)
  }
}