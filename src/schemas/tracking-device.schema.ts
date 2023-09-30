import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

import { GeoJSONPoint, geoJSONPointSchema } from "./geojson-point.schema";

export type TrackingDevice = {
  serialId: string;
  position: GeoJSONPoint;
  speed: number;
  connected: boolean;
  disconnectedAt?: Date;
  vehicle?: Types.ObjectId;
  cooperative?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const trackingDeviceSchema = new Schema<TrackingDevice>({
  // (Numéro de série)
  serialId: { type: String, required: true },

  position: { type: geoJSONPointSchema, required: true, index: "2dsphere" },

  // Speed in km/h
  speed: { type: Number, required: true, default: 0 },

  // Whether the device is currently being connected to the server or not
  connected: { type: Boolean, required: true, default: false },

  // Date-Time of the most recent disconnection of the device
  disconnectedAt: Date,

  vehicle: Schema.ObjectId,

  cooperative: {
    type: Schema.ObjectId,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },

  // Date-Time of the update of either the position, speed, connected or vehicle fields
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const TrackingDeviceModel = mongoose.model("TrackingDevice", trackingDeviceSchema, "trackingDevices");

export type TrackingDeviceDocument = HydratedDocument<TrackingDevice>;
