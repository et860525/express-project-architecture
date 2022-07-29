import mongoose from "mongoose";
import { StudentSchema, IStudent } from "./student";

export const StudentModel = mongoose.model<IStudent>('Student', StudentSchema);