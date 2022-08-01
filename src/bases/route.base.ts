import { Router, Request, Response, NextFunction } from 'express';
import { ResponseObject } from '../common/response/response.object';
import { HttpStatus } from '../types/HttpStatus';
import { ControllerBase } from './controller.base';

export abstract class RouteBase {

  public router = Router();
  protected controller!: ControllerBase;

  constructor() {
    this.initial();
  }
  
  protected initial(): void {
    this.registerRoute();
  }

  protected abstract registerRoute(): void;

  // ResponseHandler will get a controller and 
  // use Promise to get controller `response data` or `catch error`
  protected responseHandler(method: (req: Request, res: Response, next: NextFunction) => 
    Promise<ResponseObject>, controller = this.controller) {
      return (req: Request, res: Response, next: NextFunction) => {
        method.call(this.controller, req, res, next)
          .then(obj => res.status(obj.status).json(obj))
          .catch((err) => next(controller.formatResponse(
            (err as any).status || HttpStatus.INTERNAL_ERROR, err.message
          )));
      }
  }
}