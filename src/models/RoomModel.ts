import { MemberModel } from "./MemberModel";

export interface RoomModel {
    roomName: string;
    roomId: string;
    roomCode: number;
    description: string;
    members: MemberModel[];
}
export type RequestJoinRoom = {
    roomId: string;
}