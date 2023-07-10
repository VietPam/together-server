import { AgoraToken } from "../models/AgoraModel"

export interface MemberModel {
    socketId: string;
    username: string;
    offer?: Object;
    answer?: Object;
    roomId: string;
    agoraToken: AgoraToken;
}