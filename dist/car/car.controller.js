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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CarController = class CarController {
    carService;
    userRepository;
    constructor(carService, userRepository) {
        this.carService = carService;
        this.userRepository = userRepository;
    }
    async create(body) {
        const user = await this.userRepository.findOne({
            where: { id: body.userId },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const car = await this.carService.createCar(user, body.make, body.model, body.year, body.license_plate, body.category);
        return { message: 'Car has been created successfully', car };
    }
    async findAll() {
        const cars = await this.carService.getAllCars();
        return { message: 'Cars retrieved successfully', cars };
    }
    async findOne(id) {
        try {
            const car = await this.carService.getCarById(id);
            return { message: 'Car retrieved successfully', car };
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async update(id, body) {
        try {
            const car = await this.carService.updateCar(id, body);
            return { message: 'Car has been updated successfully', car };
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async remove(id) {
        try {
            await this.carService.deleteCar(id);
            return { message: 'Car has been deleted successfully' };
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "remove", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('cars'),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [car_service_1.CarService,
        typeorm_1.Repository])
], CarController);
//# sourceMappingURL=car.controller.js.map