import { CurrentUser } from '@kir-dev/passport-authsch';
import { UserDto } from '@kir-mail/types';
import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FRONTEND_URL } from '../../config';
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
  @Redirect()
  @ApiResponse({ status: 302, description: 'Redirects to the frontend with the JWT in the query string.' })
  @ApiQuery({ name: 'code', required: true })
  oauthRedirect(@CurrentUser() user: UserDto) {
    const jwt = this.authService.login(user);
    return {
      url: `${FRONTEND_URL}?jwt=${jwt}`,
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: UserDto })
  me(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
