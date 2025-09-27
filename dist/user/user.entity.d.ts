import { Car } from '../car/car.entity';
import { Booking } from '../booking/booking.entity';
export declare enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    cars: Car[];
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
