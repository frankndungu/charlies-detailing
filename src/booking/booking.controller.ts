import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });
    const car = await this.carRepository.findOne({ where: { id: dto.carId } });
    const service = await this.serviceRepository.findOne({
      where: { id: dto.serviceId },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!car) throw new NotFoundException('Car not found');
    if (!service) throw new NotFoundException('Service not found');

    return this.bookingService.createBooking(
      user,
      car,
      service,
      new Date(dto.booking_time),
    );
  }

  @Get()
  getAll() {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.getBookingById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookingDto) {
    const data: Partial<Booking> = {};

    if (dto.userId !== undefined) data.user = { id: dto.userId } as User;
    if (dto.carId !== undefined) data.car = { id: dto.carId } as Car;
    if (dto.serviceId !== undefined)
      data.service = { id: dto.serviceId } as Service;
    if (dto.booking_time) data.booking_time = new Date(dto.booking_time);
    if (dto.status) data.status = dto.status;

    return this.bookingService.updateBooking(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.deleteBooking(id);
  }
}
