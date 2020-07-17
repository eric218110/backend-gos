import { getRepository, Repository, EntityRepository } from 'typeorm';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments.entity';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointment.dto';

@EntityRepository(Appointments)
export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointments>;

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const appointments = await this.ormRepository.findOne({ where: { date } });
    return appointments;
  }

  public async create({
    date,
    providerId,
  }: CreateAppointmentDTO): Promise<Appointments> {
    const appointment = this.ormRepository.create({ date, providerId });

    this.ormRepository.save(appointment);

    return appointment;
  }
}
