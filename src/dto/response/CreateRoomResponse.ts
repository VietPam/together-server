import { AgoraPayloadResponse } from "models/AgoraModel";
import { RoomModel } from "models/RoomModel";

export interface CreateRoomResponse {
    agora: AgoraPayloadResponse;
    room: RoomModel;
}