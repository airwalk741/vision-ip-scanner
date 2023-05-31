import axios from "axios";

class ClientAPI {
  imageSourceSensor_URL: string;
  constructor() {
    this.imageSourceSensor_URL = "/cgi-bin/param.cgi?action";
  }

  async GET_ImageSourceSensor(url: string, typeValue: string) {
    const URL = `${url}${this.imageSourceSensor_URL}=list&ImageSource.I0.Sensor.${typeValue}`;

    try {
      const res = await axios({
        method: "GET",
        url: URL,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async POST_ImageSourceSensor(
    url: string,
    typeValue: string,
    value: string | number
  ) {
    const URL = `${url}${this.imageSourceSensor_URL}=update&ImageSource.I0.Sensor.${typeValue}=${value}`;
    await fetch(URL, {
      method: "GET",
    });
    return;
  }
}

export default new ClientAPI();
