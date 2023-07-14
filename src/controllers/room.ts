import { Request, Response } from "express";
import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
import { JoinRoomRequestDTO } from "../dto/request/JoinRoomRequestDTO";
import { CreateRoomResponse } from "../dto/response/CreateRoomResponse";
import { JoinRoomResponse } from "../dto/response/JoinRoomResponse";
import { AgoraService } from "../services/AgoraService";
import { RoomService } from "../services/RoomService";

export async function createRoomHandler(
    req: Request<{}, {}, CreateRoomRequestDTO>,
    res: Response<string | CreateRoomResponse>
) {
    try {
        console.log("xu ly createRoomHandler");
        const room = RoomService.createRoom(req.body);
        const { uid, role, tokenType } = req.body.agora;
        const channel = room.roomId as string;
        const token = AgoraService.generateToken({
            uid,
            role,
            tokenType,
            channel: room.roomId as string,
        });
        console.log("uid: ", uid);
        console.log("token: ", token);
        res.send({
            room,
            agora: { ...req.body.agora, ...token, channel: channel },

        }

        );
        console.log("xu ly createRoomHandler DONE");

    } catch (error: any) {
        console.log("Loi server, createRoomHandler");
        console.log(error);
        return res.status(500).send(req.toString());
    }
}

export async function requestJoinRoom(
    req: Request<{}, {}, JoinRoomRequestDTO>,
    res: Response<JoinRoomResponse | string>
) {
    try {
        console.log("xu ly request join room, requestJoinRoom");
        const room = RoomService.requestJoinRoom(req.body);
        if (!room) return res.status(404).send("Room Not Found");
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
        console.log("Loi server, requestJoinRoom");

        return res.status(500).send(req.toString());
    }
}
