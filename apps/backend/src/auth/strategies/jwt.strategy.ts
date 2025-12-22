import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { IJwtPayload, UserRole, UserStatus } from '@project-valkyrie/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  validate(payload: { sub: string; email: string; role: UserRole; status: UserStatus }): IJwtPayload {
    return { userId: payload.sub, email: payload.email, role: payload.role, status: payload.status };
  }
}
