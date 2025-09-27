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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("./service.entity");
let ServiceService = class ServiceService {
    serviceRepository;
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async createService(dto) {
        const service = this.serviceRepository.create(dto);
        return this.serviceRepository.save(service);
    }
    async getAllServices() {
        return this.serviceRepository.find();
    }
    async getServiceById(id) {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service)
            throw new common_1.NotFoundException(`Service with ID ${id} not found`);
        return service;
    }
    async updateService(id, dto) {
        const service = await this.getServiceById(id);
        Object.assign(service, dto);
        return this.serviceRepository.save(service);
    }
    async deleteService(id) {
        const result = await this.serviceRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Service with ID ${id} not found`);
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceService);
//# sourceMappingURL=service.service.js.map