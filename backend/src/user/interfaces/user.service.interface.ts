import { ObjectId } from 'mongoose';
import { User } from '../schemas/user.schema';
import { SearchUserParams } from './search-user.dto';

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ObjectId): Promise<User>;
  findByEmail(
    email: string,
    projection?: object | string | string[],
  ): Promise<User>;
  findAll(params: SearchUserParams): Promise<{ users: User[]; count: number }>;
}
