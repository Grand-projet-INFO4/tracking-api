import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

import { UserRole, COOPERATIVE_USER_ROLES } from "./user.schema";
import { Cooperative } from "./cooperative.schema";

export type CooperativeAdmin = {
  role: UserRole;
  user: Types.ObjectId;
  cooperative: Types.ObjectId;
};

export const cooperativeAdminSchema = new Schema<CooperativeAdmin>(
  {
    role: { type: String, required: true, enum: COOPERATIVE_USER_ROLES },
    user: {
      type: Schema.ObjectId,
      required: true,
    },
    cooperative: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { collection: "cooperativeAdmins" },
);

export const CooperativeAdminModel = mongoose.model("CooperativeAdmin");

export type CooperativeAdminDocument = HydratedDocument<Cooperative>;
