import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockServiceRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('ServiceService', () => {
  let serviceService: ServiceService;
  let serviceRepository: Repository<Service>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        {
          provide: getRepositoryToken(Service),
          useFactory: mockServiceRepository,
        },
      ],
    }).compile();

    serviceService = module.get<ServiceService>(ServiceService);
    serviceRepository = module.get<Repository<Service>>(
      getRepositoryToken(Service),
    );
  });

  it('should be defined', () => {
    expect(serviceService).toBeDefined();
  });

  // ---------- CREATE ----------
  describe('createService', () => {
    it('should create and return a service', async () => {
      const dto = {
        name: 'Car Wash',
        description: 'Full',
        price: 25,
        duration: 60,
      };
      const savedService = { id: 1, ...dto };

      (serviceRepository.create as jest.Mock).mockReturnValue(dto);
      (serviceRepository.save as jest.Mock).mockResolvedValue(savedService);

      const result = await serviceService.createService(dto);

      expect(serviceRepository.create).toHaveBeenCalledWith(dto);
      expect(serviceRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(savedService);
    });
  });

  // ---------- GET ALL ----------
  describe('getAllServices', () => {
    it('should return an array of services', async () => {
      const services = [{ id: 1, name: 'Car Wash' }];
      (serviceRepository.find as jest.Mock).mockResolvedValue(services);

      const result = await serviceService.getAllServices();

      expect(serviceRepository.find).toHaveBeenCalled();
      expect(result).toEqual(services);
    });
  });

  // ---------- GET BY ID ----------
  describe('getServiceById', () => {
    it('should return a service if found', async () => {
      const serviceObj = { id: 1, name: 'Car Wash' };
      (serviceRepository.findOne as jest.Mock).mockResolvedValue(serviceObj);

      const result = await serviceService.getServiceById(1);

      expect(result).toEqual(serviceObj);
    });

    it('should throw NotFoundException if service not found', async () => {
      (serviceRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(serviceService.getServiceById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ---------- UPDATE ----------
  describe('updateService', () => {
    it('should update and return the service', async () => {
      const serviceObj = { id: 1, name: 'Car Wash', price: 25, duration: 60 };
      const dto = { price: 30 };

      (serviceRepository.findOne as jest.Mock).mockResolvedValue(serviceObj);
      (serviceRepository.save as jest.Mock).mockResolvedValue({
        ...serviceObj,
        ...dto,
      });

      const result = await serviceService.updateService(1, dto);

      expect(serviceRepository.save).toHaveBeenCalledWith({
        ...serviceObj,
        ...dto,
      });
      expect(result.price).toEqual(30);
    });

    it('should throw NotFoundException if service not found', async () => {
      (serviceRepository.findOne as jest.Mock).mockResolvedValue(null);
      const dto = { price: 30 };

      await expect(serviceService.updateService(1, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ---------- DELETE ----------
  describe('deleteService', () => {
    it('should delete the service if found', async () => {
      (serviceRepository.delete as jest.Mock).mockResolvedValue({
        affected: 1,
      });

      await expect(serviceService.deleteService(1)).resolves.toBeUndefined();
      expect(serviceRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if service not found', async () => {
      (serviceRepository.delete as jest.Mock).mockResolvedValue({
        affected: 0,
      });

      await expect(serviceService.deleteService(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
