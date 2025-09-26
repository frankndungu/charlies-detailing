import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
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
  ): Promise<{ message: string; car: Car }> {
    const user = await this.userRepository.findOne({
      where: { id: body.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const car = await this.carService.createCar(
      user,
      body.make,
      body.model,
      body.year,
      body.license_plate,
      body.category,
    );

    return { message: 'Car has been created successfully', car };
  }

  @Get()
  async findAll(): Promise<{ message: string; cars: Car[] }> {
    const cars = await this.carService.getAllCars();
    return { message: 'Cars retrieved successfully', cars };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<{ message: string; car: Car }> {
    try {
      const car = await this.carService.getCarById(id);
      return { message: 'Car retrieved successfully', car };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Car>,
  ): Promise<{ message: string; car: Car }> {
    try {
      const car = await this.carService.updateCar(id, body);
      return { message: 'Car has been updated successfully', car };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.carService.deleteCar(id);
      return { message: 'Car has been deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
