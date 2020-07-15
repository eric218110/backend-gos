import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

const routerAppointment = Router();

routerAppointment.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    const userService = new CreateUserService();

    const user = await userService.execute({ name, email, password });

    return response.json(user);
  } catch (error) {
    console.log(error);
    throw new Error('Not create User');
  }
});

export default routerAppointment;
