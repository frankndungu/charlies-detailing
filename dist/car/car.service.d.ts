import { Repository } from 'typeorm';
import { Car, CarCategory } from './car.entity';
import { User } from '../user/user.entity';
export declare class CarService {
    private readonly carRepository;
    constructor(carRepository: Repository<Car>);
    createCar(user: User, make: string, model: string, year: number, license_plate: string, category: CarCategory): Promise<Car>;
    getAllCars(): Promise<Car[]>;
    getCarById(id: number): Promise<Car>;
    updateCar(id: number, data: Partial<Car>): Promise<Car>;
    deleteCar(id: number): Promise<void>;
}
