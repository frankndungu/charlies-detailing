import { Booking } from '../booking/booking.entity';
export declare class Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
