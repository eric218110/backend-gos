import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../database/repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const routerAppointment = Router();

routerAppointment.get('/', async (request: Request, response: Response) => {
  const repositoryAppointment = getCustomRepository(AppointmentsRepository);
  const appointments = await repositoryAppointment.find();
  response.json(appointments);
});

routerAppointment.post('/', async (request: Request, response: Response) => {
  const { date, providerId } = request.body;

  try {
    const appointmentService = new CreateAppointmentService();

    const parseDate = parseISO(date);

    const appointment = await appointmentService.execute({
      date: parseDate,
      providerId,
    });

    return response.json(appointment);
  } catch (error) {
    throw new Error('Not create Appointment');
  }
});

export default routerAppointment;
