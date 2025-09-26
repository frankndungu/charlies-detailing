import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(
    @Body() body: CreateServiceDto,
  ): Promise<{ message: string; service: Service }> {
    const service = await this.serviceService.createService(body);
    return { message: 'Service has been created successfully', service };
  }

  @Get()
  async findAll(): Promise<{ message: string; services: Service[] }> {
    const services = await this.serviceService.getAllServices();
    return { message: 'Services retrieved successfully', services };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; service: Service }> {
    const service = await this.serviceService.getServiceById(id);
    return { message: 'Service retrieved successfully', service };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceDto,
  ): Promise<{ message: string; service: Service }> {
    const service = await this.serviceService.updateService(id, body);
    return { message: 'Service has been updated successfully', service };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.serviceService.deleteService(id);
    return { message: 'Service has been deleted successfully' };
  }
}
