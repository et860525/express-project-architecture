import { Request } from 'express';
import { ControllerBase } from '../../../bases/controller.base';
import { ResponseObject } from '../../../common/response/response.object';
import { ResponseTodoDTO } from '../../../dtos/response.todo.dto';
import { HttpStatus } from '../../../types/HttpStatus';
import { TodoService } from './todo.service';

export class TodoController extends ControllerBase {	

	private readonly todoService = new TodoService();

	public async getTodos(req: Request): Promise<ResponseObject<ResponseTodoDTO[]>> {
		const { limit, skip } = req.query;
		const dtos = await this.todoService.getTodos(Number(limit), Number(skip));
		return this.formatResponse(HttpStatus.OK, dtos);
	}

	public async getTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>> {
		const { id } = req.params;
		const dto = await this.todoService.getTodo(id);
		if ( !dto ) {
			return this.formatResponse(HttpStatus.NOT_FOUND, 'Not found.');
		}
		return this.formatResponse(HttpStatus.OK, dto);
	}
	
	public async addTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>> {
		const { content } = req.body;
		const dto = await this.todoService.addTodo(content);
		return this.formatResponse(HttpStatus.CREATED, dto);
	}
	
	public async completedTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>> {
		const { id } = req.params;
		const { completed } = req.body;
		const dto = await this.todoService.completedTodo(id, completed);
		if ( !dto ) {
			return this.formatResponse(HttpStatus.NOT_FOUND, 'Not found.');
		}
		return this.formatResponse(HttpStatus.OK, dto);
	}

	public async removeTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>> {
		const { id } = req.params;
		const dto = await this.todoService.removeTodo(id);
		if ( !dto ) {
			return this.formatResponse(HttpStatus.NOT_FOUND, 'Not found.');
		}
		return this.formatResponse(HttpStatus.OK, null);
	}
	
};