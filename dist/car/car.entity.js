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
exports.Car = exports.CarCategory = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const booking_entity_1 = require("../booking/booking.entity");
var CarCategory;
(function (CarCategory) {
    CarCategory["SALOON"] = "Saloon";
    CarCategory["MIDSIZE"] = "Midsize";
    CarCategory["SUV"] = "SUV";
    CarCategory["LORRY"] = "Lorry";
    CarCategory["VAN"] = "Van";
})(CarCategory || (exports.CarCategory = CarCategory = {}));
let Car = class Car {
    id;
    user;
    make;
    model;
    year;
    license_plate;
    category;
    bookings;
    created_at;
    updated_at;
};
exports.Car = Car;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Car.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cars, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Car.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "make", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Car.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Car.prototype, "license_plate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CarCategory, default: CarCategory.SALOON }),
    __metadata("design:type", String)
], Car.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.car),
    __metadata("design:type", Array)
], Car.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Car.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Car.prototype, "updated_at", void 0);
exports.Car = Car = __decorate([
    (0, typeorm_1.Entity)()
], Car);
//# sourceMappingURL=car.entity.js.map