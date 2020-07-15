import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseModel from './BaseModel';
import UserModel from './User.model';

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
