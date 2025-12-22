import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '@project-valkyrie/dtos';
import { IAuthResponse } from '@project-valkyrie/interfaces';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IAuthResponse> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: IAuthResponse }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      if (user.status === 'PENDING') {
        throw new UnauthorizedException('Account pending approval');
      }
      if (user.status === 'INACTIVE') {
        throw new UnauthorizedException('Account inactive');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
        status: user.status,
        companyId: user.companyId,
      };

      return {
        accessToken: this.jwtService.sign(payload),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as any, // Cast to any to avoid type mismatch if types are slightly different
          status: user.status as any,
          companyId: user.companyId || undefined,
        },
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
