import { IsDefined, IsString } from 'class-validator';

export class CreateClientSupportRequestDto {
  @IsString()
  @IsDefined()
  text: string;
}
