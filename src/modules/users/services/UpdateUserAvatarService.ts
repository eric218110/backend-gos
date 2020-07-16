import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import configMulter from '@config/multer';
import Users from '@modules/users/infra/typeorm/entities/User.model';
import AppError from '../../../shared/errors/AppError';

interface Request {
  userId: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(userId);

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

    await userRepository.save(user);

    return user;
  }
}
