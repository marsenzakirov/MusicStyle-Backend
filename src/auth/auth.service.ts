import { checkIsExist, checkIsUnique } from './../api/utils';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from 'api/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    checkIsUnique(candidate.data, 'User');
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = { email: user.email, id: user._id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(
      dto.password,
      user.data.password,
    );
    if (user.data && passwordEquals) {
      return user.data;
    }

    return new UnauthorizedException({
      message: 'incorrect email or password ',
    });
  }
}
