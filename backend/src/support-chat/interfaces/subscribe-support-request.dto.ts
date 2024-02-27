import { IsDefined, IsString } from 'class-validator';

export class SubscribeToSupportRequestDto {
  @IsString()
  @IsDefined()
  chatId: string;
}
