import { RequestHandler, Request, Response, NextFunction } from "express";

// Handle Error, two function do the same thing
export const errorHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
	return Promise
			.resolve(fn(req, res, next))
			.catch(next);
};

// const errorHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
// 	(req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next)
// };