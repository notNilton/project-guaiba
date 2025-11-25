import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@project-valkyrie/dtos';
import { IAuthResponse } from '@project-valkyrie/interfaces';
import { ConfigService } from '../config/config.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  register(registerDto: RegisterDto): IAuthResponse {
    return this.usersService.create(registerDto);
  }

  login(loginDto: LoginDto): IAuthResponse {
    const user = this.usersService.findByEmail(loginDto.email);
    if (user && user.password === loginDto.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      // Example: Access JWT configuration when implementing JWT
      // const token = this.generateJWT(result);
      // console.log('JWT Config:', this.configService.jwt);

      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Example method showing how to use ConfigService for JWT
  // Uncomment and implement when adding JWT functionality
  /*
  private generateJWT(payload: any): string {
    const { secret, expiresIn } = this.configService.jwt;
    // Use secret and expiresIn to generate JWT token
    return 'jwt-token';
  }
  */
}
