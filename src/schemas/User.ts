import { Schema, model, Document, Types } from "mongoose";

const USER_ROLE = ["admin", "user"] as const;

export const USER_ROLE_DEFAULT = "user";
export const USER_ROLE_ADMIN = "admin";
export const USER_ROLE_USER = "user";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: (typeof USER_ROLE)[number];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: USER_ROLE, default: USER_ROLE_DEFAULT },
});

const User = model<IUser>("User", userSchema);

export default User;
