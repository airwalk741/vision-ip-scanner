import express from "express";
import { logger } from "src/middlewares/winston";
import { renderMain } from "src/controllers/main/render";
import {
  reScanStart,
  imageSourceSensor,
  getCameraIamge,
} from "src/controllers/main/api";

const router = express.Router();
const BASE_URL = "/";

export default (app: any) => {
  router.get("/", (req, res) => {
    logger.info(`[GET] start ${BASE_URL}`);
    renderMain(req, res);
  });

  router.get("/api/img-source-sensor", (req, res) => {
    logger.info(`[GET] start ${BASE_URL}`);
    imageSourceSensor(req, res);
  });

  router.get("/api/camera-image", (req, res) => {
    logger.info(`[GET] start ${BASE_URL}`);
    getCameraIamge(req, res);
  });

  router.post("/api", (req, res) => {
    logger.info(`[POST] start ${BASE_URL}`);
    reScanStart(req, res);
  });

  router.put("/", (req, res) => {
    logger.info(`[PUT] start ${BASE_URL}`);
  });

  router.delete("/", (req, res) => {
    logger.info(`[DELETE] start ${BASE_URL}`);
  });

  app.use(BASE_URL, router);
};
