import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const routerAppointment = Router();

routerAppointment.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    throw new Error('Not create Session');
  }
});

export default routerAppointment;
