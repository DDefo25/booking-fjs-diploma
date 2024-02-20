import { IsDefined, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateHotelParams  {
    @IsString()
    @IsDefined()
    title: string;

    @IsString()
    @IsDefined()
    description: string;

    @IsString()
    @IsDefined()
    images: string[];
}