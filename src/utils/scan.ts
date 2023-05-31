import dgram from "dgram";
import { mySocket, mySocket as scoket } from "./socket";
import _ from "lodash";

let client: dgram.Socket | null = null;
let addr = "255.255.255.255";
let udpPort = 64988;
let meg = Buffer.from([
  0x68, 0x76, 0x01, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);

export let ipScanData: any = [];
export const startScan = () => {
  return new Promise<void>((res, rej) => {
    if (client) {
      ipScanData = [];
      client.close();
      client = null;
    }
    client = dgram.createSocket("udp4");
    client.bind(udpPort);
    client.send(meg, 0, meg.length, udpPort, addr);

    client.on("listening", async () => {
      let address = client.address();
      console.log(
        "UDP client listening on " + address.address + ":" + address.port
      );
      client.setBroadcast(true);
      res();
    });

    client.on("error", (err: any) => {
      console.log(err);
      throw rej(err);
    });

    client.on("message", function (message: Buffer) {
      if (message.length === 11) {
        return;
      }

      const messageEncode: any = {};

      messageEncode["ipAddress"] = bufferSlice(message, 11, 27);
      messageEncode["gateway"] = bufferSlice(message, 27, 43);

      messageEncode["macAddress"] = bufferSlice(message, 43, 63);
      messageEncode["streamPort"] = message.readUInt32LE(63);
      messageEncode["httpPort"] = message.readUInt32LE(67);
      messageEncode["ipType"] = bufferSlice(message, 71, 72)
        ? "DHCP"
        : "Static";
      messageEncode["subnetMask"] = bufferSlice(message, 72, 88);

      messageEncode["audioInCount"] = bufferSlice(message, 124, 126);

      messageEncode["audioOutCount"] = bufferSlice(message, 162, 164);

      messageEncode["alarmInCount"] = bufferSlice(message, 200, 202);

      messageEncode["alarmOutCount"] = bufferSlice(message, 238, 240);

      messageEncode["model"] = bufferSlice(message, 276, 308);

      messageEncode["resolutions"] = bufferSlice(message, 344, 408);

      messageEncode["firmwareVersion"] = bufferSlice(message, 444, 476);

      messageEncode["videoFormat"] = bufferSlice(message, 512, 544);

      messageEncode["serverName"] = bufferSlice(message, 580, 644);

      messageEncode["upgradePort"] = bufferSlice(message, 680, 685);

      messageEncode["mcuModel"] = bufferSlice(message, 721, 724);

      messageEncode["mcuVersion"] = bufferSlice(message, 760, 792);

      // console.log(res);
      // const keys = Object.keys(ipScanData);
      // if (!keys.includes(messageEncode["macAddress"])) {
      //   ipScanData[messageEncode["macAddress"]] = {
      //     ...messageEncode,
      //   };
      // }

      const isExist = _.findIndex(ipScanData, {
        macAddress: messageEncode.macAddress,
      });
      if (isExist === -1) {
        ipScanData.push(messageEncode);
      }
      if (mySocket) {
        mySocket.emit("message", ipScanData);
      }
    });

    client.on("close", function () {
      console.log("client has closed, closing server");
    });
  });
};

function bufferSlice(message: Buffer, start: number, end: number) {
  const res = message.toString("ascii", start, end);

  const idx = res.indexOf("\x00");

  return res.slice(0, idx);
}
