import { CreateRoomResponse } from "dto/response/CreateRoomResponse";
import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
import { Request, Response } from "express";
import { RoomRepository } from "repository/RoomRepository";
import { RoomService } from "services/RoomService";
import { AgoraService } from "services/AgoraService";
import { JoinRoomRequestDTO } from "dto/request/JoinRoomRequestDTO";
import { JoinRoomResponse } from "dto/response/JoinRoomResponse";
export async function createRoomHandler(
    req: Request<{}, {}, CreateRoomRequestDTO>,
    res: Response<string | CreateRoomResponse>
) {
    try {
        const room = RoomService.createRoom(req.body);
        const { uid, role, tokenType } = req.body.agora;
        const channel = room.roomId as string;
        const token = AgoraService.generateToken({
            uid,
            role,
            tokenType,
            channel: room.roomId as string,
        });
    }
    catch (error: any) {
        console.log(error);
        return res.status(500).send(req.toString());
    }
}

export async function requestJoinRoom(
    req: Request<{}, {}, JoinRoomRequestDTO>,
    res: Response<JoinRoomResponse | string>
) {
    try {
        const room = RoomService.requestJoinRoom(req.body);
        if (!room) return res.status(400).send("Room not found");
        const { uid, role, tokenType } = req.body.agora;
        const channel = room.roomId as string;
        const token = AgoraService.generateToken({
            uid,
            role,
            tokenType,
            channel: room.roomId as string,
        });

        res.send({
            room,
            agora: { ...req.body.agora, ...token, channel: channel },
        });
    } catch (error: any) {
        return res.status(500).send(req.toString());
    }
}