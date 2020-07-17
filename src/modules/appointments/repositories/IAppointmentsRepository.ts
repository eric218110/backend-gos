import Appointments from '../infra/typeorm/entities/Appointments.entity';
import CreateAppointmentDTO from '../dtos/CreateAppointment.dto';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointments | undefined>;

  create(data: CreateAppointmentDTO): Promise<Appointments>;
}
