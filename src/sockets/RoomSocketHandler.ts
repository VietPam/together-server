import { RoomService } from "services/RoomService";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "types/websocket.type";

export const roomSocketHandler = (
    io: Server<ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData>,
    socket: Socket<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData>
) => {
    socket.on("joinRoom", (onJoinRoom: OnJoinRoom) => {
        console.log("joinRoom: ", onJoinRoom);
        const [newMember, room] = RoomService.joinRoom({

        })
    })
}