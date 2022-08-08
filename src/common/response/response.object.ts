import { HttpStatus } from '../../types/HttpStatus';

/* -------------------------------------------------------------------------- */
/*                       For controller response format                       */
/* -------------------------------------------------------------------------- */

export class ResponseObject<T> {

	public readonly status: HttpStatus = HttpStatus.INTERNAL_ERROR
	public readonly message: string = '';
	public readonly data: any = null;

	constructor(options: { status?: HttpStatus, message?: string, data?: any }) {
		this.status = options.status || this.status;
		this.message = options.message || this.message;
		this.data = options.data || this.data;
	}
};