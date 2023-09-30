import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

import { EmbeddedCityDocument, embeddedCitySchema } from "./embedded-city.schema";

// Zone scope of the cooperative's transport
export enum CooperativeZone {
  National = "NATIONAL",
  Regional = "REGIONAL",
}
// Array of copereatives zones
export const COOPERATIVE_ZONES: CooperativeZone[] = [CooperativeZone.National, CooperativeZone.Regional];

export type Cooperative = {
  coopName: string;
  slug: string;
  description?: string;
  zone: CooperativeZone;
  profilePhoto: string;
  transparentLogo?: string;
  coverPhoto?: string;
  city: EmbeddedCityDocument;
  address: string;
  email?: string;
  phones: string[];
  websiteURL?: string;
  highways: string[];
};

export const cooperativeSchema = new Schema<Cooperative>({
  coopName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  zone: {
    type: String,
    required: true,
    enum: COOPERATIVE_ZONES,
    default: CooperativeZone.National,
  },
  profilePhoto: { type: String, required: true },
  transparentLogo: String,
  coverPhoto: String,
  city: { type: embeddedCitySchema, required: true },
  address: { type: String, required: true },
  email: String,
  phones: { type: [{ type: String, required: true }], required: true },
  websiteURL: String,
  highways: {
    type: [{ type: String, required: true }],
  },
});

export const CooperativeModel = mongoose.model("Cooperative", cooperativeSchema);

export type CooperativeDocument = HydratedDocument<Cooperative>;
