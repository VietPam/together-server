import { UserModel } from "../../models/UserModel"
import { RoomModel } from "../../models/RoomModel"
import { JoinChannelAgoraRequest } from "../../models/AgoraModel";

export interface CreateRoomRequestDTO {
    user: UserModel;
    room: Pick<RoomModel, "roomName" | "description">;
    agora: JoinChannelAgoraRequest
}