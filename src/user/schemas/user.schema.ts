import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type UserDocument = HydratedDocument<User>;
/**
 * HydratedDocument<User>
 *
 * MongoDB se jo User document aata hai uska TypeScript type.
 * Isme User class ki properties + Mongoose ke methods
 * (save, deleteOne, updateOne, etc.) available hote hain.
 */

@Schema()
export class User {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, type: String, enum: Role, default: Role.STUDENT })
  role?: string;
}

/**
 * SchemaFactory.createForClass(User)
 *
 * User class ko MongoDB schema me convert karta hai.
 *
 * Example:
 * User class
 * {
 *   firstName: string
 *   email: string
 * }
 *
 * MongoDB Schema
 * {
 *   firstName: String,
 *   email: String
 * }
 *
 * Is schema ko Mongoose collection create aur manage karne ke liye use karta hai.
 */
export const UserSchema = SchemaFactory.createForClass(User);
