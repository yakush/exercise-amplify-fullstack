import mongoose, { Document, Schema } from "mongoose";
import { IAppService } from "../types/appService";
import { AssetModel, IAsset } from "./models/asset";
import { IScan, ScanModel, SCAN_STATUS } from "./models/scan";

function buildConnectionString(
  host?: string,
  dbname?: string,
  username?: string,
  password?: string
) {
  if (username && password) {
    return `mongodb://${username}:${password}@${host}/${dbname}`;
  }
  return `mongodb://${host}/${dbname}`;
}

function isValidId(id: any) {
  if (typeof id === "string") {
    return mongoose.Types.ObjectId.isValid(id);
  }
  if (id instanceof mongoose.Types.ObjectId) {
    return true;
  }
}

export class Database implements IAppService{
  //-------------------------------------------------------
  // DB

  start() {
    const URL = buildConnectionString(
      process.env.MONGO_HOST,
      process.env.MONGO_DB,
      process.env.MONGO_USERNAME,
      process.env.MONGO_PASSWORD
    );
    // console.log("connecting to ", URL);
    return mongoose.connect(URL, { authSource: "admin" });
  }

  stop() {
    return mongoose.disconnect();
  }

  //-------------------------------------------------------
  // assets

  async getAssets() {
    return AssetModel.find().sort({ date_created: "desc" });
  }
  async getAsset(id: any) {
    if (!isValidId(id)) {
      return null;
    }

    return AssetModel.findById(id);
  }

  async addAsset(asset: IAsset) {
    return AssetModel.create(asset);
  }

  //-------------------------------------------------------
  // scans
  async getScans(assetId: any) {
    if (!isValidId(assetId)) {
      return [];
    }
    return ScanModel.find({ asset_ref: assetId }).sort({
      date_created: "desc",
    });
    //.populate("asset", "name -_id");
  }

  async addScan(scan: IScan) {
    return ScanModel.create(scan);
  }

  async updateScanStatus(scanId: any, status: SCAN_STATUS) {
    if (!isValidId(scanId)) {
      return null;
    }

    return ScanModel.findOneAndUpdate(
      { _id: scanId },
      { status },
      { new: true }
    );
  }
}

//export instance
const db = new Database();
export default db;
