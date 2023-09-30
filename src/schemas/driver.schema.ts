import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export type Driver = {
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  phones: string[];
  hiredAt?: Date;
  latestTripAt?: Date;
  user?: Types.ObjectId;
  cooperative: Types.ObjectId;
  ongoingTrip?: Types.ObjectId;
  vehicle?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const driverSchema = new Schema<Driver>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: String,
  email: { type: String, required: true },
  phones: { type: [{ type: String, required: true }], required: true },
  hiredAt: { type: Date, index: true, sparse: true },
  latestTripAt: { type: Date, index: true, sparse: true },
  user: {
    type: Schema.ObjectId,
  },
  cooperative: {
    type: Schema.ObjectId,
  },
  ongoingTrip: {
    type: Schema.ObjectId,
  },
  vehicle: { type: Schema.ObjectId },
  createdAt: { type: Date, index: true },
  updatedAt: Date,
});

export const DriverModel = mongoose.model("Driver", driverSchema);

export type DriverDocument = HydratedDocument<Driver>;
