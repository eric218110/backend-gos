import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authorizationHeader.split(' ');

  config();
  const { HASH_JWT } = process.env;

  try {
    const decoded = verify(
      token,
      HASH_JWT !== undefined
        ? HASH_JWT
        : 'cb7fb93b707a3f0db38c34d7e65ee9771ab701c7',
    );

    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token invalid', 401);
  }
}
