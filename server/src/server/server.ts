import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server as HttpServer } from "http";

import apiRouter from "./apiRouter";
import schedulerAdminRouter from "./schedulerAdminRouter";
import { IAppService } from "../types/appService";

/**
 * Manager for Server (web server)
 */
export class Server implements IAppService {
  public app: express.Express;
  public PORT = +(process.env.PORT || 5000);
  public httpServer?: HttpServer;

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
      res.send("hello");
    });

    return new Promise<void>((resolve, reject) => {
      this.httpServer = this.app.listen(this.PORT, () => {
        resolve();
      });
    });
  }

  async stop() {
    if (this.httpServer) {
      this.httpServer.close();
      this.httpServer = undefined;
    }
  }
}

//-------------------------------------------------------
//export instance
const server = new Server();
export default server;
