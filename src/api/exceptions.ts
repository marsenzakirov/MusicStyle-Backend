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
        message: 'Not Found',
        error: "The resource you're looking for doesn't exist",
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class BadRequestException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'Bad Request',
        error: 'The request is invalid',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ValidateException extends BadRequestException {
  data: any;
  constructor(error: Error = null) {
    super(error);
    this.data = error.data;
  }
}

export class UnauthorizedException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'Unauthorized',
        error: 'The request is unauthorized',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class ForbiddenException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'Forbidden',
        error: 'The request is forbidden',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class MethodNotAllowed extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'Method Not Allowed',
        error: 'The method is not allowed',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
