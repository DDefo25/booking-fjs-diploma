import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsMongoId, IsNumber, IsOptional, IsString} from "class-validator";
import { ObjectId } from "mongoose";

export class SearchRoomsParams {
    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    limit: number;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    offset: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsMongoId()
    @IsOptional()
    hotel: string;

    @IsBoolean()
    @IsOptional()
    @Transform(({value}) => !!Number(value))
    isEnabled?: boolean;

    @IsDate()
    @IsOptional()
    @Transform(({value}) => new Date(value))
    dateStart?: Date

    @IsDate()
    @IsOptional()
    @Transform(({value}) => new Date(value))
    dateEnd?: Date;
}