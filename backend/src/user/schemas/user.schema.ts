import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { compareHash, getHash } from 'src/utility/cryptPass';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
    transform: () => '',
  })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({
    required: true,
    enum: ['client', 'admin', 'manager'],
    default: 'client',
  })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    this.passwordHash = await getHash(this.passwordHash);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods = {
  async validateHash(pass: string): Promise<boolean> {
    return await compareHash(pass, this.passwordHash);
  },
};

export { UserSchema };
