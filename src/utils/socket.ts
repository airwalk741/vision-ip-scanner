import { Server, Socket } from "socket.io";
import http from "http";
import { ipScanData } from "./scan";
// import { getData } from "src/ts/service";

// https://socket.io/docs/v4/typescript/

//  이벤트 보내기
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (data: any) => void;
}

// 이벤트 수신
interface ClientToServerEvents {
  hello: () => void;
}

// 서버간 통신
interface InterServerEvents {
  ping: () => void;
  error: () => void;
  disconnect: () => void;
}

// 속성 입력
interface SocketData {
  name: string;
  age: number;
}

export let mySocket: Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> | null = null;

// 소켓부터 연결하고 udp 연결
export const socketConnect = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  return new Promise<void>((res, rej) => {
    const io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(server);

    io.on("connection", async (socket) => {
      // const data = await getData();
      socket.emit("message", ipScanData);
      socket.emit("noArg");
      socket.emit("basicEmit", 1, "2", Buffer.from([3]));
      socket.emit("withAck", "4", (e) => {
        // e is inferred as number
      });
      mySocket = socket;
      // works when broadcast to all
      io.emit("noArg");
      // works when broadcasting to a room
      io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
    });
    res();
  });
};
