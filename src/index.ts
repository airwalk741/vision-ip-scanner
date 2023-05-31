import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import https from "https";
import cors from "cors";
import { config } from "src/ts/config";
import db from "src//models";
import autoDB from "./models/orm";
import Routes from "src/routes/index";
import { logger } from "./middlewares/winston";
import { startScan } from "src/utils/scan";
import { socketConnect } from "src/utils/socket";
import http from "http";
import path from "path";
import process from "process";

const app = express();
const server = http.createServer(app);

const {
  node: { port },
} = config;

const HTTP_PORT = port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use(express.static(__dirname));
app.use("/model", express.static(`${getDir()}/../config/model`));
console.log(`${getDir()}/../config`);
Routes(app);

server.listen(HTTP_PORT, async () => {
  await socketConnect(server);
  console.log(`http://localhost:${HTTP_PORT}`);
  await startScan();
  logger.info(`Server listening on port ${HTTP_PORT}`);
});

function getDir() {
  if (process.env.NODE_ENV !== "develop") {
    return path.resolve(process.execPath + "/..");
  } else {
    return path.join(require.main ? require.main.path : process.cwd());
  }
}

// const options = {
//   key: fs.readFileSync("certs/private.pem"),
//   cert: fs.readFileSync("certs/server.crt"),
// };

// const httpsServer = https.createServer(options, app);

// httpsServer.listen(HTTP_PORT, async () => {
//   // await autoDB.run();
//   await db.sequelize.sync(); // DB 연결
//   logger.info(`Server listening on port ${HTTP_PORT}`);
// });
