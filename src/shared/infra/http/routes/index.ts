import { Router } from 'express';
import appointments from '@modules/appointments/http/routes/appointments.route';
import users from '@modules/users/http/routes/users.route';
import sessions from '@modules/users/http/routes/sessions.route';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
