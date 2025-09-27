import { ServiceService } from './service.service';
import { Service } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(body: CreateServiceDto): Promise<{
        message: string;
        service: Service;
    }>;
    findAll(): Promise<{
        message: string;
        services: Service[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        service: Service;
    }>;
    update(id: number, body: UpdateServiceDto): Promise<{
        message: string;
        service: Service;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
