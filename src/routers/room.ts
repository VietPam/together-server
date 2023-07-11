import { createRoomHandler, requestJoinRoom } from "../controllers/room";
import { Router } from "express";

export const roomRouter = Router();

roomRouter.post("/create-room", createRoomHandler);
roomRouter.post("join-room", requestJoinRoom);

