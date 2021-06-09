/**
 * 全局异常捕获
 */

import {
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
// implements 继承 interface
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      // 自定义业务状态码
      const errNo = (exception as any).getErrorCode
        ? (exception as any).getErrorCode()
        : status;
      // 自定义业务错误信息
      const errStr = (exception as any).getErrorMessage
        ? (exception as any).getErrorMessage()
        : exception.getResponse();

      res.status(status).json({
        errNo,
        errStr: errStr.message || errStr,
        data: null,
        date: new Date().toISOString(),
        path: req.url,
      });
    } else {
      const status = 500;
      res.status(status).json({
        errNo: status,
        errStr: exception.message || '服务器内部异常',
        date: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}
