import { Entity, Column } from 'typeorm';
import BaseModel from './BaseModel';

@Entity('users')
export default class Users extends BaseModel {
  @Column()
  name: string;

  @Column('time with time zone')
  email: string;

  @Column('time with time zone')
  password: string;

  @Column('time with time zone')
  avatar: string;
}
