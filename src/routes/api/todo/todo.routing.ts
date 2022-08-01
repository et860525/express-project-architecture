import { RouteBase } from '../../../bases/route.base';

export class TodoRoute extends RouteBase {

    constructor() {
      super();
    }

    protected initial(): void {
      super.initial();
    }

    protected registerRoute(): void {
      this.router.get('/', function(req, res) {
        res.send('Hello todos!');
      })
    }
}


