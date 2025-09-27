import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User])],
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
