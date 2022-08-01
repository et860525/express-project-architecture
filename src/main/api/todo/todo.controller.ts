import { Request, Response, NextFunction } from 'express';
import { ControllerBase } from '../../../bases/controller.base';
import { HttpStatus } from '../../../types/HttpStatus';

export class TodoController extends ControllerBase {

	public async getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
		const obj = this.formatResponse(HttpStatus.OK, []);
		res.status(obj.status).json(obj);
	}
};