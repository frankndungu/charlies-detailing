import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car, CarCategory } from './car.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  // Create a car
  async createCar(
    user: User,
    make: string,
    model: string,
    year: number,
    license_plate: string,
    category: CarCategory,
  ): Promise<Car> {
    const car = this.carRepository.create({
      user,
      make,
      model,
      year,
      license_plate,
      category,
    });
    return this.carRepository.save(car);
  }

  // Get all cars
  async getAllCars(): Promise<Car[]> {
    return this.carRepository.find({ relations: ['user'] });
  }

  // Get a car by ID
  async getCarById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!car) {
      throw new Error(`Car with ID ${id} not found`);
    }
    return car;
  }

  // Update a car
  async updateCar(id: number, data: Partial<Car>): Promise<Car> {
    await this.carRepository.update(id, data);
    return this.getCarById(id);
  }

  // Delete a car
  async deleteCar(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
