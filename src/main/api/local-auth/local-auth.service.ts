import { LocalAuthRepository } from "../../../repositories/local-auth.model";
import { HttpStatus } from "../../../types/HttpStatus";
import { LocalAuthDocument } from "../../../models/auth/local-auth.model";
import JWT from 'jsonwebtoken';
import passport from "passport";
import { Strategy, VerifyFunction } from "passport-local";

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

	public generateJWT(user: LocalAuthDocument): string {
		const expiry = new Date();
		expiry.setDate(expiry.getDate() + 7);
		return JWT.sign({
			_id: user._id,
			username: user.username,
			exp: expiry.getTime() / 1000
		}, (process.env.JWT_SIGN as string));
	}

	public get Strategy() {
		return new Strategy(
			{ session: false },
			this.verifyUserFlow()
		);
	}

	public authenticate(...args: any[]): Promise<string> {
		return new Promise((resolve, reject) => {
			passport.authenticate('local', (err: Error, user: LocalAuthDocument) => {
				if ( err ) {
					return reject;
				}
				const token = this.generateJWT(user);
				resolve(token);
			})(...args);
		});
	}

	private verifyUserFlow(): VerifyFunction {
		return (username: string, password: string, done) => {
			this.localAuthRepo.getUser({ username })
				.then(user => {
					const error = new Error();
					if ( !user ) {
						error.message = 'Not found user!';
						(error as any).status = HttpStatus.NOT_FOUND;
						return done(error);
					}
					if ( !this.verifyPassword(user, password) ) {
						error.message = 'Error password!';
						(error as any).status = HttpStatus.FORBIDDEN;
						return done(error);
					}
					return done(null, user);
				})
				.catch(( err: Error ) => done(err));
		}
	}

	private verifyPassword(user: LocalAuthDocument, password: string): boolean {
		const pair = this.localAuthRepo.hashPassword(password, user.password.salt);
		return pair.hash === user.password.hash;
	}
};