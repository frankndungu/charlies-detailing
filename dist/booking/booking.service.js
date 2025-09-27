"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
let BookingService = class BookingService {
    bookingRepository;
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async createBooking(user, car, service, booking_time) {
        const booking = this.bookingRepository.create({
            user,
            car,
            service,
            booking_time,
            status: booking_entity_1.BookingStatus.PENDING,
        });
        const saved = await this.bookingRepository.save(booking);
        return { message: 'Booking created successfully', booking: saved };
    }
    async getAllBookings() {
        const bookings = await this.bookingRepository.find({
            relations: ['user', 'car', 'service'],
        });
        return { message: 'Bookings retrieved successfully', bookings };
    }
    async getBookingById(id) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['user', 'car', 'service'],
        });
        if (!booking)
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        return { message: 'Booking retrieved successfully', booking };
    }
    async updateBooking(id, data) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        const updated = await this.bookingRepository.save({ ...booking, ...data });
        return { message: 'Booking updated successfully', booking: updated };
    }
    async deleteBooking(id) {
        const result = await this.bookingRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        return { message: 'Booking deleted successfully' };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map