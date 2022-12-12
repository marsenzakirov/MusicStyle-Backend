import { HttpException, HttpStatus } from '@nestjs/common';

interface Error {
  error?: string;
  message?: string;
  data?: any;
  createdAt?: Date;
}

export class NotFoundException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        error: error.error || 'Not Found',
        message: error.message || 'The requested resource was not found',
        createdAt: new Date(),
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class BadRequestException extends HttpException {
  data: any;
  constructor(error: Error = null) {
    super(
      {
        error: error.error || 'Bad Request',
        message: error.message || 'The request is invalid',
        data: error.data,
        createdAt: new Date(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        error: error.error || 'Unauthorized',
        message: error.message || 'The request is unauthorized',
        createdAt: new Date(),
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class ForbiddenException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        error: error.error || 'Forbidden',
        message: error.message || 'The request is forbidden',

        createdAt: new Date(),
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class MethodNotAllowed extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: error.message || 'The method is not allowed',
        error: error.message || 'Method Not Allowed',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
