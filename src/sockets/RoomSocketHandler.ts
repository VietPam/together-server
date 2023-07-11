import { OnJoinRoomDTO } from "dto/onMessage/onJoinRoom";
import { EmitMessageType, OnNewMessageType } from "models/MessageModel";
import { RoomService } from "../services/RoomService";
import { Server, Socket } from "socket.io";
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
    socket.on("joinRoom", (onJoinRoom: OnJoinRoomDTO) => {
        console.log("joinRoom: ", onJoinRoom);
        const [newMember, room] = RoomService.joinRoom({
            ...onJoinRoom,
            socketId: socket.id,
        });
        if (!room || room.roomId) return;
        socket.join(room.roomId);
        socket.to(room.roomId).emit("newMemberJoinRoom", newMember, room);
        socket.on("message", (data: OnNewMessageType) => {
            console.log("new message: ", socket.id, ". content: ", data.content, ". Username: ", data.username);
            const messageToBroadcast: EmitMessageType = {
                ...data,
                socketId: socket.id,
            };
            socket
                .to(room.roomId as string)
                .emit("newMessageToGroup", messageToBroadcast);
            socket.emit("newMessageToGroup", messageToBroadcast);
        });
        socket.on("disconnect", () => {
            if (room.roomId) {
                const [memberLeft, roomUpdated] = RoomService.leaveRoom(
                    room.roomId,
                    socket.id,
                );
                if (memberLeft) {
                    socket
                        .to(room.roomId)
                        .emit("memberLeaveRoom", memberLeft, roomUpdated);
                }
            }
        })
    })
    socket.on("hello", (s: string) => {
        console.log(s);
    })
    socket.on("disconnect", () => {
        console.log(socket.id, " disconnected");
    })
};