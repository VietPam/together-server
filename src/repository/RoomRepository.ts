import { RoomModel } from "models/RoomModel";

export class RoomRepository {
    static rooms: RoomModel[] = [];
    static findById(roomId: string): RoomModel | null {
        const room = RoomRepository.rooms.find((r) => r.roomId === roomId);
        return room ? room : null;
    }

    static findByRoomCode(roomCode: number): RoomModel | null {
        console.log(RoomRepository.rooms, roomCode);
        const room = RoomRepository.rooms.find((r) => r.roomCode === roomCode);
        console.log("res: ", room);
        return room ? room : null;
    }
    static add(room: RoomModel): RoomModel {
        const newRoom = { ...room, roomId: generateString(6) }
    }
}