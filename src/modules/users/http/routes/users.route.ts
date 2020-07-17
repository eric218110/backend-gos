import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticate from '@modules/users/http/middlewares/ensureAuthenticate';
import multerConfig from '@config/multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.post('/', async (request: Request, response: Response) => {
  try {
    const userRepository: UserRepository = new UserRepository();

    const { name, email, password } = request.body;
    const userService = new CreateUserService(userRepository);

    const user = await userService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    throw new AppError(error.message);
  }
});

userRouter.patch(
  '/',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const userRepository: UserRepository = new UserRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(userRepository);

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
