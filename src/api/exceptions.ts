import { HttpException, HttpStatus } from '@nestjs/common';

interface Error {
  error?: string;
  message?: string;
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
