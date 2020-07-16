import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticate from '@modules/users/http/middlewares/ensureAuthenticate';
import multerConfig from '@config/multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    const userService = new CreateUserService();

    const user = await userService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    throw new Error('Not create User');
  }
});

userRouter.patch(
  '/',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
