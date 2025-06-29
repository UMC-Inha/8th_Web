import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket as WSWebSocket } from "ws";
import { parse } from "url";
import cors from "cors";

const app = express();
app.use(cors());
const server = createServer(app);
const wss = new WebSocketServer({ server });

interface RoomMap {
  [roomId: string]: Set<WSWebSocket>;
}

const rooms: RoomMap = {};

wss.on("connection", (ws, req) => {
  const { query } = parse(req.url || "", true);
  const roomId = query.room as string;

  if (!roomId) {
    ws.close();
    return;
  }

  // 해당 room이 존재하지 않으면 새로 만들고 현재 연결된 클라이언트를 추가
  rooms[roomId] = rooms[roomId] || new Set();
  rooms[roomId].add(ws);

  // 메세지를 받았을 때 같은 room에 있는 다른 클라이언트에게만 메세지를 Broadcast한다.
  // 자신에게는 보내지 않도록 client !== ws 조건을 추가
  // client.readyState === ws.OPEN 조건을 추가하여 연결이 열린 상태인 클라이언트에게만 메세지를 보낸다.
  ws.on("message", (message) => {
    rooms[roomId].forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    rooms[roomId].delete(ws);
  });
});

const PORT = 3001;

app.get("/rooms", (req, res) => {
  res.json(Object.keys(rooms));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// 1. 낙네임 입력
// 2. 방 선택
// 3. 그 방에 입장해서 OPEN인 상태일 때 메세지를 주고받기