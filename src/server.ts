import express, { Express } from 'express';
import cors from 'cors'
import { roomRouter } from '../src/routers/room';
const app: Express = express();
import { createServer } from "http"
import { Server } from "socket.io"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from 'types/websocket.type';
import { roomSocketHandler } from 'sockets/RoomSocketHandler';
import { AddressInfo } from "net";

app.use(
    cors({
        origin: "*",
    })
)

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("hello from working together server updated 07/07/2023");
});

app.use("/room", roomRouter);
//initialize a simple http server
const server = createServer(app);
// initialize the websocket server instance
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],

    }
});
io.of("np").on("connection", (socket) => {
    roomSocketHandler(io, socket);
    console.log(socket.id);
});

// start my server
server.listen(process.env.PORT || 8999, () => {
    console.log(
        `Server started on port ${(server.address() as AddressInfo).port} `
    )
})

