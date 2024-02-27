import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { SearchUserParams } from './interfaces/search-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  create(data: Partial<User>): Promise<User> {
    return this.model.create(data);
  }

  findById(id: ObjectId): Promise<User> {
    return this.model.findById(id);
  }

  findByEmail(
    email: string,
    projection: object | string | string[] = null,
  ): Promise<User> {
    return this.model.findOne({ email }, projection);
  }

  async findAll(
    params: SearchUserParams,
  ): Promise<{ users: User[]; count: number }> {
    const searchFields: Array<keyof User> = [
      'email',
      'name',
      'contactPhone',
      'role',
    ];
    const { limit, offset, filter: filterString } = params;

    const regex = new RegExp(filterString, 'i');
    const filter = { $or: searchFields.map((key) => ({ [key]: regex })) };
    return {
      users: await this.model.find(filter).skip(offset).limit(limit),
      count: await this.model.countDocuments(filter),
    };
  }
}
