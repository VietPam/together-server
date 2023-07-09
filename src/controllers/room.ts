import { CreateRoomResponse } from "dto/request/CreateRoomRequestDTO";

export async function createRoomHandler(
    req: Request<{}, {}, CreateRoomRequestDTO>,
    res: Response<string | CreateRoomResponse>
)