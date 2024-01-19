import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from 'src/user/users.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
  ]),
  ],
  controllers: [UsersController],
  providers: [UserService]
})
export class UserModule {}
