import mongoose from "mongoose";
import { EmailValidator } from '../../validators';

export interface IStudent {
	first_name: string;
	last_name: string;
	email: string;
	grade: number;
}

export const StudentSchema = new mongoose.Schema<IStudent>(
	{
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			validate: {
				validator: EmailValidator
			}
		},
		grade: {
			type: Number,
			required: true,
			min: 1,
			max: 12
		}
	}
);