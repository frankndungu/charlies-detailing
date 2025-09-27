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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_dto_1 = require("./booking.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const car_entity_1 = require("../car/car.entity");
const service_entity_1 = require("../service/service.entity");
let BookingController = class BookingController {
    bookingService;
    userRepository;
    carRepository;
    serviceRepository;
    constructor(bookingService, userRepository, carRepository, serviceRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.serviceRepository = serviceRepository;
    }
    async create(dto) {
        const user = await this.userRepository.findOne({
            where: { id: dto.userId },
        });
        const car = await this.carRepository.findOne({ where: { id: dto.carId } });
        const service = await this.serviceRepository.findOne({
            where: { id: dto.serviceId },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!car)
            throw new common_1.NotFoundException('Car not found');
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        return this.bookingService.createBooking(user, car, service, new Date(dto.booking_time));
    }
    getAll() {
        return this.bookingService.getAllBookings();
    }
    getOne(id) {
        return this.bookingService.getBookingById(id);
    }
    update(id, dto) {
        const data = {};
        if (dto.userId !== undefined)
            data.user = { id: dto.userId };
        if (dto.carId !== undefined)
            data.car = { id: dto.carId };
        if (dto.serviceId !== undefined)
            data.service = { id: dto.serviceId };
        if (dto.booking_time)
            data.booking_time = new Date(dto.booking_time);
        if (dto.status)
            data.status = dto.status;
        return this.bookingService.updateBooking(id, data);
    }
    remove(id) {
        return this.bookingService.deleteBooking(id);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "remove", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('bookings'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __param(3, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingController);
//# sourceMappingURL=booking.controller.js.map