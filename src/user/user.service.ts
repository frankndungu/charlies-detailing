import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a user
  async createUser(
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.CUSTOMER,
  ): Promise<User> {
    const user = this.userRepository.create({ name, email, password, role });
    return this.userRepository.save(user);
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Get user by ID
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update a user
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.getUserById(id);
  }

  // Delete a user
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
