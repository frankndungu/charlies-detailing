import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      role?: UserRole;
    },
  ): Promise<User> {
    return this.userService.createUser(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<User>): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
