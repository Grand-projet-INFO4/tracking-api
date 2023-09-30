import { HydratedSingleSubdocument, Schema } from "mongoose";

import { EmbeddedRegionDocument, embeddedRegionSchema } from "./embedded-region.schema";

export type EmbeddedCity = {
  cityName: string;
  region: EmbeddedRegionDocument;
  weight?: number;
};

export const embeddedCitySchema = new Schema({
  cityName: { type: String, required: true },
  region: { type: embeddedRegionSchema, required: true },
  weight: Number,
});

export type EmbeddedCityDocument = HydratedSingleSubdocument<EmbeddedCity>;
