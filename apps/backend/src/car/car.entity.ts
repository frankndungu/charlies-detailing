import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Booking } from '../booking/booking.entity';

export enum CarCategory {
  SALOON = 'Saloon',
  MIDSIZE = 'Midsize',
  SUV = 'SUV',
  LORRY = 'Lorry',
  VAN = 'Van',
}

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  license_plate: string;

  @Column({ type: 'enum', enum: CarCategory, default: CarCategory.SALOON })
  category: CarCategory;

  @OneToMany(() => Booking, (booking) => booking.car)
  bookings: Booking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
