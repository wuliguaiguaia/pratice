/**
 * 响应拦截器
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiErrorCode, ApiErrorMap } from './../exceptions/api.code.enum';

export interface Response<T> {
  start: number;
  end: number;
  spend: number;
  data: T;
  errNo: number;
  errStr: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const start = Date.now();
    const errNo = ApiErrorCode.SUCCESS;

    return next.handle().pipe(
      map((data) => ({
        start,
        end: Date.now(),
        spend: Date.now() - start,
        errNo,
        data,
        errStr: ApiErrorMap[errNo],
      })),
    );
  }
}
