import { JoinRoomDTO } from "dto/onMessage/onJoinRoom";
import { CreateRoomRequestDTO } from "dto/request/CreateRoomRequestDTO";
import { MemberModel } from "models/MemberModel";
import { RoomModel } from "models/RoomModel";
import { RoomRepository } from "../repository/RoomRepository";
import { JoinRoomRequestDTO } from "../dto/request/JoinRoomRequestDTO";
export class RoomService {
    static joinRoom({
        user,
        room: { roomId },
        socketId,
        offer,
        agoraToken,
    }: JoinRoomDTO): [MemberModel, RoomModel] | [null, null] {
        if (!roomId) return [null, null];
        let roomToJoin = RoomRepository.findById(roomId);

        if (!roomToJoin) return [null, null];
        const newMember: MemberModel = {
            roomId: roomId,
            username: user.username,
            socketId: socketId,
            offer: offer,
            agoraToken: agoraToken,
        }
        roomToJoin.members.push(newMember);
        RoomRepository.updateById(roomId, roomToJoin);
        return [newMember, roomToJoin];
    }

    static leaveRoom(
        roomId: string,
        socketId: string
    ): [MemberModel, RoomModel] | [null, null] {
        let roomToLeave = RoomRepository.findById(roomId);
        if (!roomToLeave) return [null, null];
        const memberLeftIndex = roomToLeave.members.findIndex(
            (mem) => mem.socketId === socketId)
        if (memberLeftIndex < 0) return [null, null];
        const memberLeft = roomToLeave.members[memberLeftIndex];
        roomToLeave.members.splice(memberLeftIndex, 1);
        RoomRepository.updateById(roomId, roomToLeave);
        return [memberLeft, roomToLeave];
    }

    static generateRoomCode(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }

    static createRoom({ user, room }: CreateRoomRequestDTO): RoomModel {
        const newRoom = RoomRepository.add({
            ...room,
            members: [],
            roomCode: RoomService.generateRoomCode(),
        });
        return newRoom;
    }

    static requestJoinRoom({
        user,
        room: { roomCode },
    }: JoinRoomRequestDTO): RoomModel | null {
        if (!roomCode) return null;
        const room = RoomRepository.findByRoomCode(roomCode);
        console.log('requestJoinRoom, room: ', room);
        return room;
    }
}