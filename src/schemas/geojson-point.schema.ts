import { Schema } from "mongoose";

export type GeoJSONPoint = {
  type: "Point";
  coordinates: [number, number];
};

export const geoJSONPointSchema = new Schema<GeoJSONPoint>(
  {
    type: {
      type: String,
      required: true,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: {
      type: [{ type: Number, required: true }],
      required: true,
    },
  },
  {
    timestamps: false,
    autoCreate: false,
  },
);
