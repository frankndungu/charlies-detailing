import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { Car, CarCategory } from './car.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('cars')
export class CarController {
  constructor(
    private readonly carService: CarService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      userId: number;
      make: string;
      model: string;
      year: number;
      license_plate: string;
      category: CarCategory;
    },
  ): Promise<Car> {
    const user = await this.userRepository.findOne({
      where: { id: body.userId },
    });
    if (!user) throw new Error('User not found');
    return this.carService.createCar(
      user,
      body.make,
      body.model,
      body.year,
      body.license_plate,
      body.category,
    );
  }

  @Get()
  findAll(): Promise<Car[]> {
    return this.carService.getAllCars();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Car>): Promise<Car> {
    return this.carService.updateCar(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.carService.deleteCar(id);
  }
}
