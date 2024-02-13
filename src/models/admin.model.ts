import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
}

const UsersSchema = new Schema<IUser>({
  id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  address: { type: String },
});

export const AdminModel = model<IUser>("Admins", UsersSchema);
