import { canvas } from "/assets/js/main.value.js";

export let globalModel;
export const yoloColor = [];
export const names = [
  "person",
  "bicycle",
  "car",
  "motorcycle",
  "airplane",
  "bus",
  "train",
  "truck",
  "boat",
  "traffic light",
  "fire hydrant",
  "stop sign",
  "parking meter",
  "bench",
  "bird",
  "cat",
  "dog",
  "horse",
  "sheep",
  "cow",
  "elephant",
  "bear",
  "zebra",
  "giraffe",
  "backpack",
  "umbrella",
  "handbag",
  "tie",
  "suitcase",
  "frisbee",
  "skis",
  "snowboard",
  "sports ball",
  "kite",
  "baseball bat",
  "baseball glove",
  "skateboard",
  "surfboard",
  "tennis racket",
  "bottle",
  "wine glass",
  "cup",
  "fork",
  "knife",
  "spoon",
  "bowl",
  "banana",
  "apple",
  "sandwich",
  "orange",
  "broccoli",
  "carrot",
  "hot dog",
  "pizza",
  "donut",
  "cake",
  "chair",
  "couch",
  "potted plant",
  "bed",
  "dining table",
  "toilet",
  "tv",
  "laptop",
  "mouse",
  "remote",
  "keyboard",
  "cell phone",
  "microwave",
  "oven",
  "toaster",
  "sink",
  "refrigerator",
  "book",
  "clock",
  "vase",
  "scissors",
  "teddy bear",
  "hair drier",
  "toothbrush",
];

for (let i = 0; i < 50000; i++) {
  while (true) {
    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    const r = parseInt(Math.random() * 255);
    const g = parseInt(Math.random() * 255);
    const b = parseInt(Math.random() * 255);
    const candidate = `rgba(${r}, ${g}, ${b})`;
    if (!yoloColor.includes(candidate)) {
      // yoloColor.push(candidate);
      yoloColor.push("green");
      break;
    }
  }
}

const tfLoad = async () => {
  try {
    globalModel = await tf.loadGraphModel("/model/model.json");
    console.log(globalModel);
  } catch (e) {
    console.log(e);
  }
};

tfLoad();
