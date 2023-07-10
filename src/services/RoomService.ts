import { JoinRoomDTO } from "dto/onMessage/onJoinRoom";
import { MemberModel } from "models/MemberModel";
import { RoomModel } from "models/RoomModel";

export class RoomService {
    static joinRoom({
        user,
        room: { roomId },
        socketId,
        offer,
        agoraToken,
    }: JoinRoomDTO): [MemberModel, RoomModel] | [null, null] {
        if (!roomId) return [null, null];
        let roomToJoin = RoomRe
    }
}