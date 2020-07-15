import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../database/repositories/AppointmentsRepository';
import Appointments from '../database/models/Appointments';

interface Request {
  date: Date;
  provider: string;
}

export default class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointments> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appointment has existed');
    }

    const saveAppointment = appointmentRepository.create({
      provider,
      date,
    });

    await appointmentRepository.save(saveAppointment);

    return saveAppointment;
  }
}
