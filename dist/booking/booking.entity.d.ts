import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Booking {
    id: number;
    user: User;
    car: Car;
    service: Service;
    booking_time: Date;
    status: BookingStatus;
    created_at: Date;
    updated_at: Date;
}
