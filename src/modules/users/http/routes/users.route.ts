import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticate from '@modules/users/http/middlewares/ensureAuthenticate.middleware';
import multerConfig from '@config/multer';
import UsersController from '../controllers/Users.controller';
import UserAvatarController from '../controllers/UserAvatar.controller';

const userRouter = Router();
const upload = multer(multerConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRouter.post('/', usersController.create);

userRouter.patch(
  '/',
  ensureAuthenticate,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
