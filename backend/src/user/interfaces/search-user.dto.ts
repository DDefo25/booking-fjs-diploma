import { IsNumber, IsOptional, IsString} from "class-validator";

export class SearchUserParams {
    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsNumber()
    @IsOptional()
    offset?: number;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    contactPhone?: string;
  }