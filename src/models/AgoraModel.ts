export interface AgoraModel {
    uid: number;
    role: "PUBLISHER" | "SUBSCRIBER";
    tokenType: "uid";
    channel: string;
}
export type JoinChannelAgoraRequest = Omit<AgoraModel, "channel">;

export interface AgoraToken {
    rtcToken: string;
    rtmToken: string;
}

export type AgoraPayloadResponse = AgoraModel & AgoraToken;