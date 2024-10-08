import { CurrentUser } from '@kir-dev/passport-authsch';
import { UserDto } from '@kir-mail/types';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { COOKIE_DOMAIN, FRONTEND_URL } from '../../config';
import { getHostFromUrl } from '../utils/auth.utils';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('authsch'))
  @Get('login')
  @ApiResponse({ status: 302, description: 'Redirects to the AuthSch login page.' })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('authsch'))
  @ApiResponse({
    status: 302,
    description: 'Redirects to the frontend and sets cookie with JWT.',
  })
  @ApiQuery({ name: 'code', required: true })
  oauthRedirect(@CurrentUser() user: UserDto, @Res() res: Response): void {
    const jwt = this.authService.login(user);
    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
      domain: COOKIE_DOMAIN,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    res.redirect(FRONTEND_URL);
  }

  @Get('logout')
  @ApiResponse({
    status: 302,
    description: 'Redirects to the frontend and clears the JWT cookie.',
  })
  logout(@Res() res: Response): void {
    res.clearCookie('jwt', {
      domain: COOKIE_DOMAIN,
    });
    res.redirect(FRONTEND_URL);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: UserDto })
  me(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
