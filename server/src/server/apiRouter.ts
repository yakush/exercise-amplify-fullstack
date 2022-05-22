import { Router } from "express";
import db from "../data/database";
import { IAsset } from "../data/models/asset";
import { SCAN_STATUS } from "../data/models/scan";
import scheduler from "../scheduler/scheduler";
import ApiResponse from "./apiResponse";

const apiRouter = Router();

apiRouter.all("/", async (req, res) => {
  res.send(ApiResponse.OK("hello api"));
});

// assets

apiRouter.get("/assets", async (req, res) => {
  try {
    const assets = await db.getAssets();
    res.send(ApiResponse.OK(assets));
  } catch (err) {
    console.log(err);
    res.send(ApiResponse.ERROR("error getting assets"));
  }
});

apiRouter.get("/assets/:id", async (req, res) => {
  try {
    const asset = await db.getAsset(req.params.id);
    if (!asset) {
      res.send(ApiResponse.ERROR("not found"));
      return;
    }
    res.send(ApiResponse.OK(asset));
  } catch (err) {
    console.log(err);
    res.send(ApiResponse.ERROR("error getting asset"));
  }
});

apiRouter.put("/assets", async (req, res) => {
  const item: IAsset = {
    ip: req.body.ip,
    name: req.body.name,
    description: req.body.description,
    date_created: new Date(),
  };
  try {
    const asset = await db.addAsset(item);
    res.send(ApiResponse.OK(asset));
  } catch (err) {
    console.log(err);
    res.send(ApiResponse.ERROR("error inserting new asset"));
  }
});

// scans
apiRouter.get("/scans", async (req, res) => {
  const { asset_ref } = req.query;

  if (!asset_ref) {
    res.send(ApiResponse.ERROR("missing query: asset_ref"));
    return;
  }

  try {
    const scans = await db.getScans(asset_ref);
    res.send(ApiResponse.OK(scans));
  } catch (err) {
    console.log(err);
    res.send(ApiResponse.ERROR("error getting scans for asset"));
  }
});

apiRouter.put("/scans", async (req, res) => {
  console.log("put scan");

  const { asset_ref, scan_due_date } = req.body;

  //TODO: test if asset exists
  //TODO: test if due date is in the future

  //add to db
  try {
    const scan = await db.addScan({
      asset_ref,
      date_created: new Date(),
      scan_due_date,
      status: "pending",
    });

    //add to scheduler
    const dateNow = new Date();
    const dateDue = new Date(scan_due_date);
    const scanDelay = dateDue.getTime() - dateNow.getTime();
    console.log({ diffTime: scanDelay });
    await scheduler.addScan({ scan_ref: scan.id }, scanDelay);

    res.send(ApiResponse.OK(scan));
  } catch (error) {
    res.send(ApiResponse.ERROR("error adding scan"));
    console.log(error);
  }
});

apiRouter.put("/scans/updateStatus/:id", async (req, res) => {
  console.log("put scan updateStatus");

  const { id } = req.params;
  const status = req.query.status || "successed";

  console.log("id", id, "status", status);

  //add to db
  try {
    const scan = await db.updateScanStatus(id, status as SCAN_STATUS);
    res.send(ApiResponse.OK(scan));
  } catch (error) {
    res.send(ApiResponse.ERROR("error updating scan status"));
    console.log(error);
  }
});

export default apiRouter;
