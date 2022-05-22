import Bull, { Job } from "bull";
import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";
import { IAppService } from "../types/appService";
import scanQueue, { IScan } from "./queue/scanQueue";

export class Scheduler implements IAppService {
  constructor() {}

  async start() {}
  async stop() {}

  //scan queue:
  async addScan(data: IScan, delay: number) {
    return scanQueue.add(data, {
      delay,
      attempts: 5,
    });
  }
}

//export instance
const scheduler = new Scheduler();
export default scheduler;
