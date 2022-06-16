import { UserDto } from '@dto/user.dto';
import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userParams: UserDto): Promise<User> {
    return this.userRepository.save(
      this.userRepository.create({
        ...userParams,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  async updateUser(userParams: UserDto, userId: string): Promise<User> {
    const user = this.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    } else {
      return this.userRepository.save({
        ...userParams,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
