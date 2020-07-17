import { Router, Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response: Response) => {
  const userRepository: UserRepository = new UserRepository();

  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService(userRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
