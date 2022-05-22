import dotenv from "dotenv";
dotenv.config();

import db from "./data/database";
import server from "./server/server";
import scheduler from "./scheduler/scheduler";

start();

async function start() {
  console.log("starting backend");

  //Database Manager
  console.log("connecting to DB...");
  await db.start();
  console.log("ok");

  //Scheduler Manager
  console.log("starting scheduler...");
  await scheduler.start();
  console.log("ok");

  //WebServer Manager
  console.log("starting web server...");
  await server.start();
  console.log("ok");
  console.log("web server connected on port", server.PORT);

  console.log("\nbackend running");
}
