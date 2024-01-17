import { IsBoolean, IsDefined, IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class GetChatListParams {
    @IsMongoId()
    user: ObjectId | null;

    @IsBoolean()
    @IsDefined()
    isActive: boolean
}