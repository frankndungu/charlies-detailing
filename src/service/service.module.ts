import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- import TypeOrmModule
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from './service.entity'; // <-- import the entity

@Module({
  imports: [TypeOrmModule.forFeature([Service])], // <-- add here
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
