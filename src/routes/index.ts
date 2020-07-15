import { Router } from 'express';
import appointments from './appointments.route';
import users from './users.route';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);

export default routes;
