import { promises } from "fs";

export const getData = async () => {
  const data = await promises.readFile("src/data/scanData.json", "utf-8");
  return JSON.parse(data);
};
