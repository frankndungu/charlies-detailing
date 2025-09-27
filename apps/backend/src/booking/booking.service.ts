import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(
    user: User,
    car: Car,
    service: Service,
    booking_time: Date,
  ): Promise<{ message: string; booking: Booking }> {
    const booking = this.bookingRepository.create({
      user,
      car,
      service,
      booking_time,
      status: BookingStatus.PENDING,
    });

    const saved = await this.bookingRepository.save(booking);
    return { message: 'Booking created successfully', booking: saved };
  }

  async getAllBookings(): Promise<{ message: string; bookings: Booking[] }> {
    const bookings = await this.bookingRepository.find({
      relations: ['user', 'car', 'service'],
    });
    return { message: 'Bookings retrieved successfully', bookings };
  }

  async getBookingById(
    id: number,
  ): Promise<{ message: string; booking: Booking }> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'car', 'service'],
    });
    if (!booking)
      throw new NotFoundException(`Booking with ID ${id} not found`);
    return { message: 'Booking retrieved successfully', booking };
  }

  async updateBooking(
    id: number,
    data: Partial<Booking>,
  ): Promise<{ message: string; booking: Booking }> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking)
      throw new NotFoundException(`Booking with ID ${id} not found`);

    const updated = await this.bookingRepository.save({ ...booking, ...data });
    return { message: 'Booking updated successfully', booking: updated };
  }

  async deleteBooking(id: number): Promise<{ message: string }> {
    const result = await this.bookingRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Booking with ID ${id} not found`);
    return { message: 'Booking deleted successfully' };
  }
}
