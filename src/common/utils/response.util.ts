import { HttpException, HttpStatus } from '@nestjs/common';
import { IHandleError, IHandleRespose } from './response.interface';

export const handleResponse = (statusCode: HttpStatus, message: string, data: any | null): IHandleRespose => {
  return {
    statusCode,
    message,
    data
  };
};

export const handleError = (message: string,error: any): IHandleError => {
  throw new HttpException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: message || 'An error occurred',
    error: error.message || 'Internal Server Error',
  }, HttpStatus.BAD_REQUEST);
};