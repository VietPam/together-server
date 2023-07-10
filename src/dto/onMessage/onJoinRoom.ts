import { AgoraToken } from "models/AgoraModel";
import { RoomModel } from "models/RoomModel";
import { UserModel } from "models/UserModel";

export interface JoinRoomDTO extends OnJoinRoomDTO {
    socketId: string;
}
export interface OnJoinRoomDTO {
    user: UserModel;
    room: Pick<RoomModel, "roomId">;
    offer: string;
    agoraToken: AgoraToken;
}