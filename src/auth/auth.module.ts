import { RtStrategiest } from './../strategies/rt.strategies';
import { AtStrategiest } from './../strategies/at.strategies';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { MedicosModule } from 'src/medicos/medicos.module';

@Module({
  controllers: [AuthController],
  imports: [
    MedicosModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AtStrategiest, RtStrategiest],
  exports: [AuthService],
})
export class AuthModule {}
