import db from "src/models/index";
import _ from "lodash";
import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import { logger } from "src/middlewares/winston";
import { startScan } from "src/utils/scan";
import ClientAPI from "src/controllers/main/camera/camera";
import { tfModel } from "src/ts/config";
import { startYolo } from "src/utils/yolo";
import axios from "axios";

const BASE_URL = "/api";
///////////////////////////////////////////////////////////////////////////////////////////
// api
const reScanStart = async (req: Request, res: Response) => {
  try {
    await startScan();
    return res.status(200).json();
  } catch (e) {
    logger.info(`[POST] reScanStart ${BASE_URL} `);
    return res.status(500).json();
  }
};

const imageSourceSensor = async (req: Request, res: Response) => {
  const { url, typeValue }: any = req.query;
  try {
    const response = await ClientAPI.GET_ImageSourceSensor(url, typeValue);
    logger.info(`[GET] reScanStart ${BASE_URL} `);
    return res.status(200).json({ data: response });
  } catch (e) {
    console.log(e);
    logger.error(`[GET] reScanStart ${BASE_URL} `);
    return res.status(500).json({});
  }
};

const getCameraIamge = async (req: Request, res: Response) => {
  const { cameraURL }: any = req.query;

  try {
    const response = await axios.get(cameraURL, {
      responseType: "arraybuffer",
    });
    logger.info(`[GET] reScanStart ${BASE_URL} `);
    return res
      .status(200)
      .json({ data: Buffer.from(response.data, "binary").toString("base64") });
  } catch (e) {
    console.log(e);
    logger.error(`[GET] reScanStart ${BASE_URL} `);
    return res.status(500).json({});
  }
};

const updateApi = async (req: Request, res: Response) => {};

const deleteApi = async (req: Request, res: Response) => {};

export { reScanStart, imageSourceSensor, updateApi, deleteApi, getCameraIamge };

///////////////////////////////////////////////////////////////////////////////////////////
// render
