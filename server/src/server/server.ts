import express from "express";
import bodyParser from "body-parser";
const cors = require("cors");

import apiRouter from "./apiRouter";
import schedulerAdminRouter from "./schedulerAdminRouter";

export class Server {
  public app: express.Express;
  public PORT = 5000;

  constructor() {
    this.app = express();
  }

  async start() {
    // const corsOption = { origin: ["http://localhost:4200"] }; // angular dev app
    const corsOption = {};
    this.app.use(cors(corsOption));

    this.app.use(bodyParser.json());

    this.app.use("/admin/queues", schedulerAdminRouter);
    this.app.use("/api", apiRouter);

    this.app.get("/", async (req, res) => {
      res.send("hello ");
    });

    return this.app.listen(this.PORT);
  }
}

//export instance
const server = new Server();
export default server;
