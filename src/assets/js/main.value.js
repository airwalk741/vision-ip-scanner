export const scanBtn = document.querySelector("#scan-btn");

export const scanDataListTable = document.querySelector(
  ".scan-data-list-table"
);

export const scanDataListTableBody = document.querySelector(
  ".scan-data-list-table > tbody"
);

export const scanDataListTableBodyTrList = document.querySelectorAll(
  ".scan-data-list-table > tbody > tr"
);

const ipAddressDataTag = document.querySelector("#ipAddress");

const macAddressDataTag = document.querySelector("#macAddress");

const ipTypeDataTag = document.querySelector("#ipType");

const streamPortDataTag = document.querySelector("#streamPort");

const httpPortDataTag = document.querySelector("#httpPort");

const upgradePortDataTag = document.querySelector("#upgradePort");

const serverNameDataTag = document.querySelector("#serverName");

const modelDataTag = document.querySelector("#model");

const firmwareVersionDataTag = document.querySelector("#firmwareVersion");

const resolutionsDataTag = document.querySelector("#resolutions");

const videoFormatDataTag = document.querySelector("#videoFormat");

export const detailDataTags = {
  ipAddress: ipAddressDataTag,
  macAddress: macAddressDataTag,
  ipType: ipTypeDataTag,
  streamPort: streamPortDataTag,
  httpPort: httpPortDataTag,
  upgradePort: upgradePortDataTag,
  serverName: serverNameDataTag,
  model: modelDataTag,
  firmwareVersion: firmwareVersionDataTag,
  resolutions: resolutionsDataTag,
  videoFormat: videoFormatDataTag,
};

export const canvas = document.querySelector("#camera");
export const detailContainer = document.querySelector(".detail-container");
