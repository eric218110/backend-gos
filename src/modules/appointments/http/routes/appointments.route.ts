import { Router } from 'express';
import ensureAuthenticate from '@modules/users/http/middlewares/ensureAuthenticate.middleware';
import AppointmentsController from '../controllers/Appointments.controller';

const routerAppointment = Router();
const appointmentsController = new AppointmentsController();

routerAppointment.use(ensureAuthenticate);

routerAppointment.post('/', appointmentsController.create);

export default routerAppointment;
