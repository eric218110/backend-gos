import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { config } from 'dotenv';
import Users from '@modules/users/infra/typeorm/entities/User.entity';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  /**
   * execute
   */
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {
    config();
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

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
