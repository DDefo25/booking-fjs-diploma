import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { SearchUserParams } from './interfaces/search-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService implements IUserService {
    constructor(
         @InjectModel(User.name) private readonly model: Model<UserDocument>
    ) {}

    async create(data: Partial<User>): Promise<User> {
        return await this.model.create(data)
    };

    async findById(id: ObjectId): Promise<User> {
        return await this.model.findById(id)
    };

    async findByEmail(email: string): Promise<User> {
        return await this.model.findOne({email})
    };

    async findAll(params: SearchUserParams): Promise<User[]> {
        const regExFields = new Set(['email', 'name', 'contactPhone'])
        const filter = {...params}

        for (let [key, value] of Object.entries(params)) {
            if (regExFields.has(key)) {
                filter[key] = new RegExp(value, 'i')
            }
        }
        
        return await this.model.find(filter);
    };
}
