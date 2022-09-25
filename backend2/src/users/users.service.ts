import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ChangeRoleInput } from './dto/change-role.input';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async getAllUsers(userId: string) {
    const getUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (getUser.role !== 'ADMIN') {
      throw new BadRequestException('Not authorized to get users');
    }
    return await this.prisma.user.findMany({
      where: {
        NOT: {
          role: 'ADMIN',
        },
      },
      orderBy: {
        firstName: 'asc',
      },
    });
  }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

  async changeRole(userId: string, changeRole: ChangeRoleInput) {
    const getUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (getUser.role !== 'ADMIN') {
      throw new BadRequestException('Not authorized to change role');
    }

    return this.prisma.user.update({
      data: {
        role: changeRole.role,
      },
      where: { email: changeRole.email },
    });
  }
}
