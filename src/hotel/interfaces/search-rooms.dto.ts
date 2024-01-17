import { IsBoolean, IsDefined, IsMongoId, IsNumber, IsOptional, IsString} from "class-validator";
import { ObjectId } from "mongoose";

export class SearchRoomsParams {
    @IsString()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsOptional()
    offset: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsMongoId()
    @IsOptional()
    hotel: ObjectId;

    @IsBoolean()
    @IsOptional()
    isEnabled?: boolean;
}