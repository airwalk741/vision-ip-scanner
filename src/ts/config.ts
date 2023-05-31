import fs from "fs";
import path from "path";

let config: any;
let tfModel: any;

if (process.env.NODE_ENV !== "develop") {
  const serverPath = process.execPath.split("/");
  serverPath.pop();
  const configFileName = serverPath.join("/") + "/config/config.json";
  const modelFileName = serverPath.join("/") + "/config/model/model.json";
  let rawdata: any = fs.readFileSync(configFileName);
  let modelData: any = fs.readFileSync(modelFileName);
  config = JSON.parse(rawdata);
  tfModel = modelFileName;
} else {
  config = require(path.join(process.cwd(), "/config/config.json"));
  tfModel = path.join(process.cwd(), "/config/model/model.json");
}

export { config, tfModel };
