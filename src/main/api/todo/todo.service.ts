import { TodoRepository } from '../../../repositories/todo.repository';
import { ResponseTodoDTO } from '../../../dtos/response.todo.dto';
import { DefaultQuery } from '../../../types/request.type';

export class TodoService {

	private readonly todoRepo = new TodoRepository();

	public async getTodos(limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<ResponseTodoDTO[]> {
		const todos = await this.todoRepo.getTodos(
			Math.min(limit, DefaultQuery.MAX_LIMIT),
			skip
		);
		const dtos = todos.map(todo => new ResponseTodoDTO(todo));
		return dtos;
	}

	public async getTodo(id: string): Promise<ResponseTodoDTO | null> {
		const todo = await this.todoRepo.getTodo(id);
		const dtos = todo ? new ResponseTodoDTO(todo) : null;
		return dtos;
	}

	public async addTodo(content: string): Promise<ResponseTodoDTO> {
		const document = await this.todoRepo.addTodo(content);
		const dto = new ResponseTodoDTO(document);
		return dto;
	}

	public async completedTodo(id: string, completed: boolean): Promise<ResponseTodoDTO | null> {
		const todo = await this.todoRepo.completedTodo(id, completed);
		const dto = todo ? new ResponseTodoDTO(todo) : null;
		return dto;
	}

	public async removeTodo(id: string): Promise<ResponseTodoDTO | null> {
		const todo = await this.todoRepo.removeTodo(id);
		const dto = todo ? new ResponseTodoDTO(todo) : null;
		return dto;
	}

};