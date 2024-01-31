import { IsBoolean, IsDefined, IsMongoId, IsOptional } from "class-validator";
import { ObjectId } from "mongoose";

export class GetChatListParams {
    @IsMongoId()
    @IsOptional()
    user?: ObjectId;

    @IsBoolean()
    @IsDefined()
    isActive: boolean
}