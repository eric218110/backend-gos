import Users from '../infra/typeorm/entities/User.entity';
import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  create(data: ICreateUsersDTO): Promise<Users>;
  save(user: Users): Promise<Users>;
}
