import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- import TypeOrmModule
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity'; // <-- import the entity

@Module({
  imports: [TypeOrmModule.forFeature([Booking])], // <-- add here
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
