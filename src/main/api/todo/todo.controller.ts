import { Request } from 'express';
import { QueryOptions } from 'mongoose';
import { ControllerBase } from '../../../bases/controller.base';
import { ResponseObject } from '../../../common/response/response.object';
import { HttpStatus } from '../../../types/HttpStatus';
import { TodoModel } from '../../../models/todo/todo.model';
import { TodoDTO } from '../../../dtos/todo.dto';
import { DefaultQuery } from '../../../types/request.type';

export class TodoController extends ControllerBase {

	// If need to use Request, Response, Next can restore them
	// EX: req.body.todoName...etc.
	public async getTodos(req: Request): Promise<ResponseObject> {
		const { limit, skip } = req.query;
		const truthLimit = Math.min(Number(limit), DefaultQuery.MAX_LIMIT) || DefaultQuery.LIMIT;
		const truthSkip = Number(skip) || DefaultQuery.SKIP;
		const todos = await TodoModel.find().skip(truthSkip).limit(truthLimit);
		const dtos = todos.map(todo => new TodoDTO(todo));
		return this.formatResponse(HttpStatus.OK, dtos);
	}

	public async getTodo(req: Request): Promise<ResponseObject> {
		const { id } = req.params;
		const todo = await TodoModel.findById(id);
		if ( !todo ) {
			return this.formatResponse(HttpStatus.NOT_FOUND, 'Not found.');
		}
		const dto = new TodoDTO(todo);
		return this.formatResponse(HttpStatus.OK, dto);
	}
	
	public async addTodo(req: Request): Promise<ResponseObject> {
		const { content } = req.body;
  	const todo = new TodoModel({ content, completed: false });
		const document = await todo.save();
		const dto = new TodoDTO(document);
		return this.formatResponse(HttpStatus.CREATED, dto);
	}
	
	public async completedTodo(req: Request): Promise<ResponseObject> {
		const { id } = req.params;
		const { completed } = req.body;
		const options: QueryOptions = {
			new: true,
			runValidators: true
		};
		const todo = await TodoModel.findByIdAndUpdate(id, { completed }, options);
		if ( !todo ) {
			return this.formatResponse(HttpStatus.NOT_FOUND, 'Not found.');
		}
		const dto = new TodoDTO(todo);
		return this.formatResponse(HttpStatus.OK, dto);
	}

	public async removeTodo(req: Request): Promise<ResponseObject> {
		const { id } = req.params;
		const todo = await TodoModel.findByIdAndRemove(id);
		if ( !todo ) {
			return this.formatResponse(HttpStatus.NOT_FOUND, 'Not found.');
		}
		return this.formatResponse(HttpStatus.OK, null);
	}
};