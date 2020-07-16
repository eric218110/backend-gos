import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

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
    throw new Error('JWT token is missing');
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
    throw new Error('Token invalid');
  }
}
