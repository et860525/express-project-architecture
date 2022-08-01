import { ControllerBase } from '../../../bases/controller.base';
import { ResponseObject } from '../../../common/response/response.object';
import { HttpStatus } from '../../../types/HttpStatus';

export class TodoController extends ControllerBase {

	// If need to use Request, Response, Next can restore them
	// EX: req.body.todoName...etc.
	public async getTodos(): Promise<ResponseObject> {
		return this.formatResponse(HttpStatus.OK, []);
	}
};