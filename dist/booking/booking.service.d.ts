import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';
export declare class BookingService {
    private readonly bookingRepository;
    constructor(bookingRepository: Repository<Booking>);
    createBooking(user: User, car: Car, service: Service, booking_time: Date): Promise<{
        message: string;
        booking: Booking;
    }>;
    getAllBookings(): Promise<{
        message: string;
        bookings: Booking[];
    }>;
    getBookingById(id: number): Promise<{
        message: string;
        booking: Booking;
    }>;
    updateBooking(id: number, data: Partial<Booking>): Promise<{
        message: string;
        booking: Booking;
    }>;
    deleteBooking(id: number): Promise<{
        message: string;
    }>;
}
