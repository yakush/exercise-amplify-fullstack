import dotenv from "dotenv";
dotenv.config();

import db from "./data/database";
import server from "./server/server";
import scheduler from "./scheduler/scheduler";

start();

async function start() {
  console.log("starting...");

  await db.start();
  console.log("connected to DB");

  await scheduler.start();
  console.log("scheduler started");

  await server.start();
  console.log("server connected on port", server.PORT);
}
