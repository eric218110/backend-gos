import { startOfHour } from 'date-fns';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments.entity';
import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  date: Date;
  providerId: string;
}

export default class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, providerId }: IRequest): Promise<Appointments> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment has existed');
    }

    const saveAppointment = await this.appointmentsRepository.create({
      providerId,
      date,
    });

    return saveAppointment;
  }
}
