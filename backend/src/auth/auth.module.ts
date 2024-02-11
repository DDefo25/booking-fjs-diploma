import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './guards/http.roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategyCookies } from './jwtCookies.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    })
  ],
  providers: [
    AuthService, 
    JwtStrategy,
    JwtStrategyCookies,
    JwtConfigService
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
