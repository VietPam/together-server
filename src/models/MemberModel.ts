import { AgoraToken } from "../models/AgoraModel"

export interface MemberModel {
    socketid: string;
    username: string;
    offer?: Object;
    answer?: Object;
    roomId: string;
    agoraToken: AgoraToken;
}