import { CarService } from './car.service';
import { Car, CarCategory } from './car.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
export declare class CarController {
    private readonly carService;
    private readonly userRepository;
    constructor(carService: CarService, userRepository: Repository<User>);
    create(body: {
        userId: number;
        make: string;
        model: string;
        year: number;
        license_plate: string;
        category: CarCategory;
    }): Promise<{
        message: string;
        car: Car;
    }>;
    findAll(): Promise<{
        message: string;
        cars: Car[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        car: Car;
    }>;
    update(id: number, body: Partial<Car>): Promise<{
        message: string;
        car: Car;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
