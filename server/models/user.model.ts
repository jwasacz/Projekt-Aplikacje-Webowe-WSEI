import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "Admin" | "Developer" | "Devops";

export interface IUser extends Document {
  name: string;
  surname: string;
  role: UserRole;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Developer", "Devops"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
