import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";
import scanQueue from "../scheduler/queue/scanQueue";

const {
  router: schedulerAdminRouter,
  setQueues,
  replaceQueues,
  addQueue,
  removeQueue,
} = createBullBoard([new BullAdapter(scanQueue)]);

export default schedulerAdminRouter;
