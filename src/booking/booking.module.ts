import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Car, Service])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
