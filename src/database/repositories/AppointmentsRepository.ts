import { Repository, EntityRepository } from 'typeorm';
import Appointments from '../models/Appointments';

@EntityRepository(Appointments)
export default class AppointmentsRepository extends Repository<Appointments> {
  /**
   * findByDate
   */
  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const appointments = await this.findOne({ where: { date } });
    return appointments;
  }
}
