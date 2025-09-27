import { BookingStatus } from './booking.entity';
export declare class CreateBookingDto {
    userId: number;
    carId: number;
    serviceId: number;
    booking_time: string;
    status?: BookingStatus;
}
export declare class UpdateBookingDto {
    userId?: number;
    carId?: number;
    serviceId?: number;
    booking_time?: string;
    status?: BookingStatus;
}
