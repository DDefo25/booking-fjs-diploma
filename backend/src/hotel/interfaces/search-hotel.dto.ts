import { IsDefined, IsNumber, IsOptional, IsString} from "class-validator";

export class SearchHotelParams {
    @IsString()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsOptional()
    offset: number;

    @IsString()
    @IsOptional()
    title: string;
}