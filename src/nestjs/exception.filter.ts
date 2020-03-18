import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProblemDetail, ProblemDetailMessage } from '../models';
import { FilterOptions } from './filter-options.interface';

@Catch(ProblemDetail)
export class ProblemDetailFilter implements ExceptionFilter {
  constructor(private readonly options?: FilterOptions) {}

  /**
   * Handles a thrown ProblemDetail error in NestJS.
   * @param exception Thrown exception
   * @param host
   */
  catch(exception: ProblemDetail, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message: ProblemDetailMessage = {
      code: exception.code,
      title: exception.title,
      status: exception.status,
      type: exception.type,
      identifier: exception.identifier
    };

    if (this.options && this.options.errorHandler) {
      this.options.errorHandler(message);
    }

    response.status(exception.status).json(message);
  }
}
