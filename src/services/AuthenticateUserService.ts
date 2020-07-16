import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import Users from '../database/models/User.model';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

export default class AuthenticateUserService {
  /**
   * execute
   */
  constructor() {
    config();
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Imcorrect email or password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Imcorrect email or password', 401);
    }

    const { HASH_JWT } = process.env;

    const token = sign(
      {},
      HASH_JWT !== undefined
        ? HASH_JWT
        : 'cb7fb93b707a3f0db38c34d7e65ee9771ab701c7',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { user, token };
  }
}
