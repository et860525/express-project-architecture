import express, { Request, Response, NextFunction } from 'express';
import { StudentModel } from '../../../models/student';
import { errorHandler } from '../../../middleware/errorMiddleware';

const router = express.Router();

// Create a student data
router.post('/student', express.json(), errorHandler(async( req: Request, res: Response, next: NextFunction ) => {
	const { first_name, last_name, email, grade } = req.body;
	const student = new StudentModel({ first_name, last_name, email, grade });
	const data = await student.save();
	res.status(201).send(data);
}));

// Use query system to get search data
router.get('/students', errorHandler(async( req: Request, res: Response, next: NextFunction ) => {
	let students;

	if ( !req.query.first_name ) {
		students = await StudentModel.find({});
	} else {
		students = await StudentModel.findOne({ first_name: req.query.first_name, last_name: req.query.last_name});
	}
	res.status(200).send(students);
}));

// Update a student data ( Only update name )
/*
 * `updateOne()` 只會提供更新的功能，不會去取得更新後的值。
 * 如果要使用更新後的值，可以使用 `findOneAndUpdate()`
 */
router.patch('/students/:id', express.json(), errorHandler(async( req: Request, res: Response, next: NextFunction ) => {
	await StudentModel.updateOne({ _id: req.params.id }, { first_name: req.body.first_name, last_name: req.body.last_name });
	res.status(201).send('Update OK!')
}));

// Delete a student data
router.delete('/students/:id', errorHandler(async( req: Request, res: Response, next: NextFunction ) => {
	await StudentModel.findByIdAndDelete(req.params.id);
	res.status(201).send('Delete OK!')
}));

export default router;