import { JoinChannelAgoraRequest } from "models/AgoraModel";
import { RoomModel } from "models/RoomModel";
import { UserModel } from "models/UserModel";

export interface JoinRoomRequestDTO {
    user: UserModel;
    room: Pick<RoomModel, "roomCode">;
    agora: JoinChannelAgoraRequest;
}