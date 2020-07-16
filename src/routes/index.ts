import { Router } from 'express';
import appointments from './appointments.route';
import users from './users.route';
import sessions from './sessions.route';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
