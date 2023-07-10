import { CreateRoomResponse } from "dto/response/CreateRoomResponse";
import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
import { Request, Response } from "express";
export async function createRoomHandler(
    req: Request<{}, {}, CreateRoomRequestDTO>,
    res: Response<string | CreateRoomResponse>
) {
    try {
        const room = Room
    }
    catch (error: any) {
        console.log(error);
        return res.status(500).send(req.toString());
    }
}