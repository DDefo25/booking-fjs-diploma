import { IsDefined, IsString } from 'class-validator';

export class RegisterClientDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  contactPhone: string;
}
