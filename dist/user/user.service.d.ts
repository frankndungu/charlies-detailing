import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(name: string, email: string, password: string, role?: UserRole): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    updateUser(id: number, data: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
