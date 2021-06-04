/**
 * 全局检验入参
 */

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // ArgumentMetadata - type: 'body' | 'query' | 'param' | 'custom';
    console.log(value, metadata);
    return value;
  }
}
