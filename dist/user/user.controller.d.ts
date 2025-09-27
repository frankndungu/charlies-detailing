import { UserService } from './user.service';
import { User, UserRole } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, body: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
