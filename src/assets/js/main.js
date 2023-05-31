import { io } from "socket.io-client";
import {
  scanDataListTableBody,
  detailDataTags,
  canvas,
  detailContainer,
  scanBtn,
} from "/assets/js/main.value.js";
import { globalModel, yoloColor, names } from "/assets/js/tensorflow.js";

let imageAxios = false;

scanBtn.addEventListener("click", async () => {
  try {
    fetch("/api", {
      method: "POST",
    }).then((res) => {});
  } catch (e) {
    alert("예러");
  }
});

const socket = io();
let img;

socket.on("message", (dataList) => {
  const existedDataList = [];

  const scanDataListNodes = scanDataListTableBody.childNodes;

  for (let tag of scanDataListNodes) {
    const isData = _.find(dataList, { macAddress: tag.id });
    if (isData) {
      existedDataList.push(isData);
    } else {
      // tag.replaceChildren();
    }
  }

  for (let data of dataList) {
    const isExist = _.findIndex(existedDataList, {
      macAddress: data.macAddress,
    });

    if (isExist === -1) {
      const tr = createScanData(data);
      scanDataListTableBody.appendChild(tr);
    }
  }

  if (!_.isEmpty(dataList)) {
    if (!detailDataTags.ipAddress.textContent) {
      createDetailData(dataList[0]);
    }
  }
});

/**
 * 왼쪽 테이블 데이터 만드는 것
 * @param {*} param0 scan data
 * @returns tr > td(ip, mac) 리턴
 */
function createScanData(data) {
  const { ipAddress, macAddress } = data;
  const tr = returnCreateElement("tr");
  tr.setAttribute("id", data.macAddress);
  const ipTD = returnCreateElement("td");
  const macTd = returnCreateElement("td");

  ipTD.innerText = ipAddress;
  macTd.innerText = macAddress;

  tr.appendChild(ipTD);
  tr.appendChild(macTd);
  tr.addEventListener("click", () => {
    createDetailData(data);
  });
  return tr;
}

let videoInterval = null;
/**
 * 자세하 보고자 하는 데이터 만들기
 * @param {*} data 스캔데이터
 */
function createDetailData(data) {
  if (videoInterval) {
    clearInterval(videoInterval);
    videoInterval = null;
  }
  detailDataTags.ipAddress.innerText = data.ipAddress;
  detailDataTags.macAddress.innerText = data.macAddress;
  detailDataTags.ipType.innerText = data.ipType;
  detailDataTags.streamPort.innerText = data.streamPort;
  detailDataTags.httpPort.innerText = data.httpPort;
  detailDataTags.upgradePort.innerText = data.upgradePort;
  detailDataTags.serverName.innerText = data.serverName;
  detailDataTags.model.innerText = data.model;
  detailDataTags.firmwareVersion.innerText = data.firmwareVersion;
  detailDataTags.resolutions.innerText = data.resolutions;
  detailDataTags.videoFormat.innerText = data.videoFormat;

  const url =
    location.protocol +
    "//" +
    data.ipAddress +
    "/cgi-bin/video.cgi?mode=1&res=9"; //url to load image from

  const refreshInterval = 500;

  const context = canvas.getContext("2d");
  const width = detailContainer.offsetWidth - 50;
  const height = (detailContainer.clientWidth * 480) / 640;

  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  img = new Image();

  img.onload = async function () {
    context.drawImage(this, 0, 0, width, height);
    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(canvas), [640, 640])
        .div(255.0)
        .expandDims(0);
    });

    globalModel.executeAsync(input).then((res) => {
      // Font options.
      const font = "16px sans-serif";
      context.font = font;
      context.textBaseline = "top";

      const [boxes, scores, classes, valid_detections] = res;
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      const valid_detections_data = valid_detections.dataSync()[0];

      tf.dispose(res);

      let lables = [];
      var i;
      for (i = 0; i < valid_detections_data; ++i) {
        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= canvas.width;
        x2 *= canvas.width;
        y1 *= canvas.height;
        y2 *= canvas.height;
        const width = x2 - x1;
        const height = y2 - y1;
        const klass = names[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        context.strokeStyle = yoloColor[classes_data[i]];
        context.lineWidth = 4;
        context.strokeRect(x1, y1, width, height);

        lables.push([classes_data[i], score, x1, y1, width, height, true, i]);
        context.fillStyle = yoloColor[classes_data[i]];
        const textWidth = context.measureText(klass + ":" + score).width;
        const textHeight = parseInt(font, 10); // base 10
        context.fillRect(x1, y1, textWidth + 4, textHeight + 4);
      }

      for (i = 0; i < valid_detections_data; ++i) {
        let [x1, y1, ,] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= canvas.width;
        y1 *= canvas.height;
        const klass = names[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        context.fillStyle = "white";
        context.fillText(klass + ":" + score, x1, y1);
      }
      imageAxios = false;
    });
  };

  videoInterval = setInterval(async () => {
    if (imageAxios) return;
    getCameraImage(url);
  }, refreshInterval);
  // getCameraDatas(data);
}

async function getCameraImage(url) {
  imageAxios = true;
  const params = {
    cameraURL: url + "?t=" + new Date().getTime(),
  };
  const queryString = new URLSearchParams(params);
  const requrl = `/api/camera-image/?${queryString}`;
  const res = await fetch(requrl, {}).then((res) => res.json());
  img.src = `data:image/png;base64,${res.data}`;
}

/**
 * document 쓰기 귀찮아서 만든거
 * @param {*} tag 테그 이름
 * @returns 테그 만든거 반환
 */
function returnCreateElement(tag) {
  return document.createElement(tag);
}

// async function getCameraDatas(data) {
//   const url = `http://${data.ipAddress}`;

//   const res = await ClientAPI.GET_ImageSourceSensor(url, "Brightness");
//   // console.log(res);
// }
