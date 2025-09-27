import {
  IsEnum,
  IsInt,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { BookingStatus } from './booking.entity';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  carId: number;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @IsDateString()
  @IsNotEmpty()
  booking_time: string;

  @IsEnum(BookingStatus)
  @IsOptional() // status is optional; defaults to PENDING in service
  status?: BookingStatus;
}

export class UpdateBookingDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  carId?: number;

  @IsInt()
  @IsOptional()
  serviceId?: number;

  @IsDateString()
  @IsOptional()
  booking_time?: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;
}
