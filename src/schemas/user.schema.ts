import mongoose, { HydratedDocument, Schema } from "mongoose";
import { EmbeddedCityDocument, embeddedCitySchema } from "./embedded-city.schema";

// The possible user role values
export enum UserRole {
  Basic = "BASIC",
  Manager = "MANAGER",
  Regulator = "REGULATOR",
  Driver = "DRIVER",
  Admin = "ADMIN",
  SuperAdmin = "SUPER_ADMIN",
}
// Array of user roles
export const USER_ROLES = [
  UserRole.Basic,
  UserRole.Manager,
  UserRole.Regulator,
  UserRole.Driver,
  UserRole.SuperAdmin,
  UserRole.Admin,
];
// Array of user roles that is associated with a cooperative
export const COOPERATIVE_USER_ROLES = [UserRole.Manager, UserRole.Regulator, UserRole.Driver];
// Array of user roles of users that are the application's administrators
export const ADMIN_USER_ROLES = [UserRole.SuperAdmin, UserRole.Admin];

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  photo?: string;
  city?: EmbeddedCityDocument;
  email: string;
  phone?: string;
  password: string;
  roles: UserRole[];
};

export const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  photo: String,
  city: embeddedCitySchema,
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  roles: {
    type: [{ type: String, required: true, enum: USER_ROLES }],
    required: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);

export type UserDocument = HydratedDocument<User>;
