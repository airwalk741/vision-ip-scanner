import db from "src/models/index";
import _ from "lodash";
import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import { logger } from "src/middlewares/winston";

const BASE_URL = "/render/main";

const renderMain = async (req: Request, res: Response) => {
  return res.render("main");
};

const readApi = async (req: Request, res: Response) => {};

const updateApi = async (req: Request, res: Response) => {};

const deleteApi = async (req: Request, res: Response) => {};

export { renderMain };
