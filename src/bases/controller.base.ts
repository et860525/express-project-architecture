import { HttpStatus } from '../types/HttpStatus';
import { ResponseObject } from '../common/response/response.object';

/* -------------------------------------------------------------------------- */
/*                     Generate response object by default                    */
/* -------------------------------------------------------------------------- */

export abstract class ControllerBase {
	
	public formatResponse(status: HttpStatus = HttpStatus.INTERNAL_ERROR, data: any): ResponseObject<any> {
		const options: any = { status };

		// If error put data into `message` by automate
		status >= 400 ? options.message = data : options.data = data;

		const responseObject = new ResponseObject(options);

		return responseObject;
	}
};