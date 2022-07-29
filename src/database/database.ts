import mongoose from "mongoose";

export const Database = {
	connect: () => {
		// Get environment data
		const username = process.env.DB_USER;
		const password = process.env.DB_PWD;
		const db_name = process.env.DB_NAME;

		mongoose.connect(`mongodb://${username}:${password}@localhost:27017/${db_name}`)
		.then(() => console.log('Database is connected'))
		.catch(err => console.log(err));
	}
};