import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async createService(dto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(dto);
    return this.serviceRepository.save(service);
  }

  async getAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async getServiceById(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service)
      throw new NotFoundException(`Service with ID ${id} not found`);
    return service;
  }

  async updateService(id: number, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.getServiceById(id); // will throw if not found
    Object.assign(service, dto);
    return this.serviceRepository.save(service);
  }

  async deleteService(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Service with ID ${id} not found`);
  }
}
