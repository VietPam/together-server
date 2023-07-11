import { AgoraPayloadResponse } from "models/AgoraModel";
import { RoomModel } from "models/RoomModel";

export interface JoinRoomResponse {
    agora: AgoraPayloadResponse;
    room: RoomModel;
}