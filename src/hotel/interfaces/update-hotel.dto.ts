import { IsDefined, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateHotelParams  {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}