import { LocalAuthRepository } from "../../../repositories/local-auth.model";
import { HttpStatus } from "../../../types/HttpStatus";

export class LocalAuthService {

	private readonly localAuthRepo = new LocalAuthRepository();

	public async addUser(username: string, password: string, email: string) {
		const isUsed = await this.localAuthRepo.getUser({ username, email });
		if ( isUsed ) {
			const error = new Error('Username or Email had been used!');
			(error as any).status = HttpStatus.CONFLICT;
			throw error;
		}
		const user = await this.localAuthRepo.addUser(username, password, email);
		return user;
	}
};