import Bull, { Job } from "bull";
import db from "../../data/database";
import { createQueue } from "../config";

export interface IScanJob {
  scan_ref: string;
}

// create queue
export const SCAN_QUEUE_NAME = "scan";
export const scanQueue = createQueue<IScanJob>(SCAN_QUEUE_NAME);

// processes
scanQueue.process(async (job, done) => {
  console.log("exec job on scan queue:", job.data);
  const { scan_ref } = job.data;

  try {
    await db.updateScanStatus(scan_ref, "successed");
    done();
  } catch (err) {
    done(new Error(`error changing scan status (id : ${scan_ref})`));
  }
});

scanQueue.on("failed", async (job, err) => {
  console.log("failed job on scan queue:", job.data, err.message);
  const { scan_ref } = job.data;
  try {
    await db.updateScanStatus(scan_ref, "failed");
  } catch (err) {}
});

scanQueue.on("error", (err) => {
  console.log("error on scan queue:", err);
});

export default scanQueue;
