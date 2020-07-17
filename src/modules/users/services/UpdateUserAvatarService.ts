import path from 'path';
import fs from 'fs';
import configMulter from '@config/multer';
import { inject, injectable } from 'tsyringe';
import Users from '@modules/users/infra/typeorm/entities/User.entity';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ avatarFileName, userId }: Request): Promise<Users> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(configMulter.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await this.userRepository.save(user);

    return user;
  }
}
