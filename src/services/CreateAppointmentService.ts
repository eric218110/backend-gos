import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../database/repositories/AppointmentsRepository';
import Appointments from '../database/models/Appointments.model';
import AppError from '../errors/AppError';

interface Request {
  date: Date;
  providerId: string;
}

export default class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointments> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment has existed');
    }

    const saveAppointment = appointmentRepository.create({
      providerId,
      date,
    });

    await appointmentRepository.save(saveAppointment);

    return saveAppointment;
  }
}
