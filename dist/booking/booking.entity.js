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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const car_entity_1 = require("../car/car.entity");
const service_entity_1 = require("../service/service.entity");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["CANCELLED"] = "cancelled";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
let Booking = class Booking {
    id;
    user;
    car;
    service;
    booking_time;
    status;
    created_at;
    updated_at;
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.bookings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Booking.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_entity_1.Car, (car) => car.bookings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'car_id' }),
    __metadata("design:type", car_entity_1.Car)
], Booking.prototype, "car", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.bookings, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'service_id' }),
    __metadata("design:type", service_entity_1.Service)
], Booking.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Booking.prototype, "booking_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "updated_at", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)()
], Booking);
//# sourceMappingURL=booking.entity.js.map