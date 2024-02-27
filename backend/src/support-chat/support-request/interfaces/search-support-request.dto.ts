import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsNumber } from 'class-validator';

export class SearchSupportRequestParams {
  @IsNumber()
  @IsDefined()
  limit: number;

  @IsNumber()
  @IsDefined()
  offset: number;

  @IsBoolean()
  @IsDefined()
  @Transform(({ value }) => !!value)
  isActive: boolean;
}
