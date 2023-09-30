import { HydratedDocument, Schema } from "mongoose";

export type EmbeddedRegion = {
  regionName: string;
  province: string;
};

export const embeddedRegionSchema = new Schema<EmbeddedRegion>({
  regionName: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});

export type EmbeddedRegionDocument = HydratedDocument<EmbeddedRegion>;
