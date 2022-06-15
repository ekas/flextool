import { UserDto } from '@dto/user.dto';
import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(userParams: UserDto): Promise<User> {
    // const hashedPassword = userParams.password
    //   ? bcrypt.hashSync(userParams.password, 10)
    //   : undefined;
    return this.usersRepository.save({
      ...userParams,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateUser(userParams: UserDto, userId: string): Promise<User> {
    // const hashedPassword = userParams.password
    //   ? bcrypt.hashSync(userParams.password, 10)
    //   : undefined;
    const user = this.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    } else {
      return this.usersRepository.save({
        ...userParams,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
