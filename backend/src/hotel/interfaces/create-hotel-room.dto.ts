import { Transform } from "class-transformer";
import { IsBoolean, IsDefined, IsMongoId, IsNumber, IsOptional, IsString} from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import mongoose, { ObjectId, Schema } from "mongoose";

export class CreateHotelRoomDto {
    @IsString()
    @IsDefined()
    description: string;

    @IsString()
    @IsDefined()
    title: string;

    @IsObjectId()
    @IsDefined()
    @Transform(({value}) => new mongoose.Types.ObjectId(value))
    hotel: ObjectId;

    @IsBoolean()
    @IsOptional()
    isEnabled?: boolean;

    @IsOptional()
    imagesFiles: Express.Multer.File[];

    @IsString()
    @IsDefined()
    images: string[];
}