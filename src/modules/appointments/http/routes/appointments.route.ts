import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticate from '@modules/users/http/middlewares/ensureAuthenticate';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';

const routerAppointment = Router();

routerAppointment.use(ensureAuthenticate);

routerAppointment.post('/', async (request: Request, response: Response) => {
  const appointmentsRepository = new AppointmentsRepository();

  const { date, providerId } = request.body;

  const appointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const parseDate = parseISO(date);

  const appointment = await appointmentService.execute({
    date: parseDate,
    providerId,
  });

  return response.json(appointment);
});

export default routerAppointment;
