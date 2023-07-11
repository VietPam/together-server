import { OnJoinRoomDTO } from "dto/onMessage/onJoinRoom";
import { MemberModel } from "models/MemberModel";
import { EmitMessageType, OnNewMessageType } from "models/MessageModel";
import { RoomModel } from "models/RoomModel";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number)) => void;
    newMessageToGroup: (d: EmitMessageType) => void;
    newMemberJoinRoom: (member: MemberModel, room: RoomModel) => void;
    memberLeaveRoom: (member: MemberModel, room: RoomModel) => void;
    joinRoom: (room: RoomModel) => void;
}

export interface ClientToServerEvents {
    hello: (s: string) => void;
    message: (d: OnNewMessageType) => void;
    joinRoom: (onJoinRoom: OnJoinRoomDTO) => void;
}

export interface InterServerEvents {
    ping: () => void;
}
export interface SocketData {
    name: string;
    age: number;
}