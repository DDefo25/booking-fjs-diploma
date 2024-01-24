import { IsDefined, IsMongoId, IsString} from "class-validator";

export class CreateClientSupportRequestDto  {
    @IsString()
    @IsDefined()
    text: string
}