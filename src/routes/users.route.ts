import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticate from '../middleware/ensureAuthenticate';
import multerConfig from '../config/multer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

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
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        userId: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      throw new Error('Not upload photo');
    }
  },
);

export default userRouter;
