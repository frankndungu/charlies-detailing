import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';
export declare class BookingController {
    private readonly bookingService;
    private readonly userRepository;
    private readonly carRepository;
    private readonly serviceRepository;
    constructor(bookingService: BookingService, userRepository: Repository<User>, carRepository: Repository<Car>, serviceRepository: Repository<Service>);
    create(dto: CreateBookingDto): Promise<{
        message: string;
        booking: Booking;
    }>;
    getAll(): Promise<{
        message: string;
        bookings: Booking[];
    }>;
    getOne(id: number): Promise<{
        message: string;
        booking: Booking;
    }>;
    update(id: number, dto: UpdateBookingDto): Promise<{
        message: string;
        booking: Booking;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
