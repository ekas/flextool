import { UserDto } from '@dto/user.dto';
import { User } from '@entities/user.entity';
import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logUp(userDetails: UserDto) {
    const user = await this.userService.findOneByEmail(userDetails.email);
    if (!user) {
      const newUser = await this.userService.createUser(userDetails);
      return newUser;
    } else {
      throw new NotAcceptableException('User already exists');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) return null;

    const isVerified = await bcrypt.compare(password, user.password);

    return isVerified ? user : null;
  }

  async logIn(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (user) {
      const payload = {
        username: user.email,
        sub: user.id,
      };

      return {
        id: user.id,
        access_token: this.jwtService.sign(payload),
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        avatar_id: user.avatarId,
        role: user.role,
        user,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  verifyToken(token: string) {
    try {
      const signedJwt = this.jwtService.verify(token);
      return signedJwt;
    } catch (err) {
      return null;
    }
  }
}
