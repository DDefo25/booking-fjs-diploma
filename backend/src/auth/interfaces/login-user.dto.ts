import { IsDefined, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
