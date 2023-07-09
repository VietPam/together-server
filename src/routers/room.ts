import { Router } from "express";


export const roomRouter = Router();

roomRouter.post("/create-room", createRoomHandler);
