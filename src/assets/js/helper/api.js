export const fecthAPI = async ({ url, method, params, data }) => {
  const res = fetch(url, {
    method,
    params,
    data,
  });
  return res.then((res) => res.json());
};

class ClientAPI {
  constructor() {
    this.imageSourceSensor_URL = "/cgi-bin/param.cgi?action=";
  }

  async GET_ImageSourceSensor(url, typeValue) {
    const params = {
      url,
      typeValue,
    };
    const queryString = new URLSearchParams(params);
    const requrl = `/api/img-source-sensor/?${queryString}`;
    fetch(requrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    // const res = await fecthAPI({
    //   url: requrl,
    //   method: "GET",
    // });
    // return 'ett';
  }

  async POST_ImageSourceSensor(url, typeValue, value) {
    const URL = `${url}${this.imageSourceSensor_URL}update&ImageSource.I0.Sensor.${typeValue}=${value}`;
    await fetch(URL, {
      method: "GET",
    });
    return;
  }
}

export default new ClientAPI();
