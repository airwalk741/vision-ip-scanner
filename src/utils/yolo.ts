import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import { tfModel } from "src/ts/config";

const MODEL_URL = "http://localhost:10805/model/model.json";

export const startYolo = async () => {
  // console.log(tfModel);
  // const model = await loadGraphModel(MODEL_URL);
  // console.log(model);
  // const cat = document.getElementById("cat");
  // model.execute(tf.browser.fromPixels(cat));
};
