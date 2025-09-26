import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { Service } from '../service/service.entity';
import { NotFoundException } from '@nestjs/common';

describe('BookingService', () => {
  let service: BookingService;
  let bookingRepo: Repository<Booking>;

  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(), // Added missing create method
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: getRepositoryToken(Booking), useValue: mockRepository() },
        { provide: getRepositoryToken(User), useValue: mockRepository() },
        { provide: getRepositoryToken(Car), useValue: mockRepository() },
        { provide: getRepositoryToken(Service), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    bookingRepo = module.get<Repository<Booking>>(getRepositoryToken(Booking));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBooking', () => {
    it('should create and return a booking', async () => {
      const mockBooking = {
        id: 1,
        booking_time: new Date(),
        status: BookingStatus.PENDING,
      } as Booking;

      // Mock both create and save methods
      bookingRepo.create = jest.fn().mockReturnValue(mockBooking);
      bookingRepo.save = jest.fn().mockResolvedValue(mockBooking);

      const result = await service.createBooking(
        {} as User,
        {} as Car,
        {} as Service,
        mockBooking.booking_time,
      );

      expect(result.booking).toEqual(mockBooking);
      expect(result.message).toBe('Booking created successfully');
      expect(bookingRepo.create).toHaveBeenCalled();
      expect(bookingRepo.save).toHaveBeenCalled();
    });
  });

  describe('getBookingById', () => {
    it('should return a booking if found', async () => {
      const mockBooking = { id: 1, status: BookingStatus.PENDING } as Booking;
      bookingRepo.findOne = jest.fn().mockResolvedValue(mockBooking);

      const result = await service.getBookingById(1);
      expect(result.booking).toEqual(mockBooking);
      expect(result.message).toBe('Booking retrieved successfully');
    });

    it('should throw NotFoundException if booking not found', async () => {
      bookingRepo.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.getBookingById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateBooking', () => {
    it('should update and return the booking', async () => {
      const mockBooking = { id: 1, status: BookingStatus.PENDING } as Booking;
      const updatedBooking = {
        ...mockBooking,
        status: BookingStatus.CONFIRMED,
      };

      bookingRepo.findOne = jest.fn().mockResolvedValue(mockBooking);
      bookingRepo.save = jest.fn().mockResolvedValue(updatedBooking);

      const result = await service.updateBooking(1, {
        status: BookingStatus.CONFIRMED,
      });

      expect(result.booking.status).toEqual(BookingStatus.CONFIRMED);
      expect(result.message).toBe('Booking updated successfully');
    });

    it('should throw NotFoundException if booking not found', async () => {
      bookingRepo.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.updateBooking(1, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteBooking', () => {
    it('should delete the booking if found', async () => {
      // Mock delete to return proper TypeORM DeleteResult format
      bookingRepo.delete = jest.fn().mockResolvedValue({ affected: 1 });

      const result = await service.deleteBooking(1);

      // Expect the actual return value, not undefined
      expect(result).toEqual({ message: 'Booking deleted successfully' });
      expect(bookingRepo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if booking not found', async () => {
      // Mock delete to return 0 affected rows
      bookingRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(service.deleteBooking(1)).rejects.toThrow(NotFoundException);
    });
  });
});
