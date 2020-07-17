import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseModel from '@shared/infra/typeorm/models/BaseModel';
import UserModel from '@modules/users/infra/typeorm/entities/User.entity';

@Entity('appointments')
export default class Appointments extends BaseModel {
  @Column()
  providerId: string;

  @Column('time with time zone')
  date: Date;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'providerId' })
  provider: UserModel;
}
