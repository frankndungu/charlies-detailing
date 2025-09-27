import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';
export declare class ServiceService {
    private readonly serviceRepository;
    constructor(serviceRepository: Repository<Service>);
    createService(dto: CreateServiceDto): Promise<Service>;
    getAllServices(): Promise<Service[]>;
    getServiceById(id: number): Promise<Service>;
    updateService(id: number, dto: UpdateServiceDto): Promise<Service>;
    deleteService(id: number): Promise<void>;
}
