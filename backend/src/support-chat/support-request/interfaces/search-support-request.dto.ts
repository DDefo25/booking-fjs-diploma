import { IsBoolean, IsDefined, IsNumber} from "class-validator";

export class SearchSupportRequestParams {
    @IsNumber()
    @IsDefined()
    limit: number;

    @IsNumber()
    @IsDefined()
    offset: number;

    @IsBoolean()
    @IsDefined()
    isActive: boolean;
  }