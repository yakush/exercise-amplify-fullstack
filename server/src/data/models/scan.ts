import mongoose, { Schema, Document, Types } from "mongoose";
import { AssetModelName } from "./asset";

export const ScanModelName = "Scan";
export type SCAN_STATUS = "pending" | "successed" | "failed";

/**  Type */
export interface IScan {
  asset_ref: Types.ObjectId; //ref to the parent asset
  date_created: Date; // required
  scan_due_date: Date; // required
  date_completed?: Date; // optional
  status: SCAN_STATUS; // one of ‘pending’, ‘successed’, ‘failed’ // required
}
export interface IScanDocument extends IScan, Document {}

/**  Schema */
export const ScanSchema = new Schema<IScanDocument>({
  asset_ref: { type: Schema.Types.ObjectId, ref: AssetModelName },
  date_created: { type: Date, required: true, default: Date.now },
  scan_due_date: { type: Date, required: true },
  date_completed: { type: Date, required: false },
  status: { type: String, required: true },
});

/**  mongoose Model */
export const ScanModel = mongoose.model<IScanDocument>(
  ScanModelName,
  ScanSchema
);
