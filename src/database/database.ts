import mongoose from "mongoose";

export class Database {

	// Get environment data
	private username = process.env.DB_USER;
	private password = process.env.DB_PWD;
	private db_name = process.env.DB_NAME;

	public connect(): void {
		mongoose.connect(`mongodb://${this.username}:${this.password}@localhost:27017/${this.db_name}`)
		.then(() => console.log(`Database ${this.db_name} is connected`))
		.catch(err => console.log(err));
	}		
};