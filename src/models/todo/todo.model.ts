import { model, Schema } from 'mongoose';
import { CoreDocument } from '../../types/model.type';

export interface TodoDocument extends CoreDocument {	
	content: string;
	completed: boolean;
}

const TodoSchema = new Schema<TodoDocument>(
	{
		content: {
			type: String,
			required: true
		},
		completed: {
			type: Boolean,
			required: true
		}
	},
	{
		// Use `createdAt` and `updatedAt`
		timestamps: true
	}
);

export const TodoModel = model<TodoDocument>('Todo', TodoSchema);