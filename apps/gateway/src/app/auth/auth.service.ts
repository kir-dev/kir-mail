import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWT_SECRET } from '../../config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: object): string {
    return this.jwtService.sign(user, {
      secret: JWT_SECRET,
      expiresIn: '7 days',
    });
  }
}
