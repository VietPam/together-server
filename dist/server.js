"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const room_1 = require("routers/room");
const app = (0, express_1.default)();
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const RoomSocketHandler_1 = require("sockets/RoomSocketHandler");
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.send("hello from working together server updated 07/07/2023");
});
app.use("/room", room_1.roomRouter);
//initialize a simple http server
const server = (0, http_1.createServer)(app);
// initialize the websocket server instance
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
io.of("np").on("connection", (socket) => {
    (0, RoomSocketHandler_1.roomSocketHandler)(io, socket);
    console.log(socket.id);
});
// start my server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} `);
});
//# sourceMappingURL=server.js.map