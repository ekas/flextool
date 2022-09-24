import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService) {}

  // updateUser(userId: string, newUserData: UpdateUserInput) {
  //   return this.prisma.user.update({
  //     data: newUserData,
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }
}
