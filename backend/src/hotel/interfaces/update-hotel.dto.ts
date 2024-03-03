import { IsDefined, IsString } from 'class-validator';

export class UpdateHotelParams {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsString({ each: true })
  @IsDefined()
  images: string[];
}
