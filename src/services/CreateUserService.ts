import { getRepository } from 'typeorm';
import User from '../database/models/User.model';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({ where: { email } });

    if (checkUserExist) {
      throw new Error('Email address already used');
    }

    const user = userRepository.create({ name, email, password });

    await userRepository.save(user);

    return user;
  }
}
