import { IsNumber, IsOptional, IsString, IsDefined } from "class-validator";

export class SearchUserParams {
    @IsNumber()
    @IsDefined()
    limit: number;

    @IsNumber()
    @IsDefined()
    offset: number;

    @IsString()
    @IsDefined()
    filter: string;
  }