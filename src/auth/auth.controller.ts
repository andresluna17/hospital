import { CreateMedicoDto } from 'src/medicos/dto/create-medico.dto';
import { AuthService } from './auth.service';
import { RtGuard } from '@/common-x/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '@/common-x/decorator';

import { AuthDto } from './../dto/auth.dto';
import { Tokens } from './../types/tokens.type';

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller({
  path: 'auth',
  version: '1.0.2',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @Public()
  @Get('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateMedicoDto): Promise<Tokens> {
    return await this.authService.register(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() medicoId: number,
  ) {
    return await this.authService.refreshTokens(medicoId, refreshToken);
  }
}
