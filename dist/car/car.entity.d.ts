import { User } from '../user/user.entity';
import { Booking } from '../booking/booking.entity';
export declare enum CarCategory {
    SALOON = "Saloon",
    MIDSIZE = "Midsize",
    SUV = "SUV",
    LORRY = "Lorry",
    VAN = "Van"
}
export declare class Car {
    id: number;
    user: User;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    category: CarCategory;
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
