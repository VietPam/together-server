import { RtcRole, RtcTokenBuilder, RtmTokenBuilder } from "agora-access-token";
import { AgoraConfig } from "constants/agoraConfig";
import { AgoraModel, AgoraToken } from "models/AgoraModel";

export class AgoraService {
    static generateToken(agora: AgoraModel): AgoraToken {
        const role =
            agora.role === "PUBLISHER" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
        const expiredTime = 10000;
        const { appCertificate, appId } = AgoraConfig;
        const { channel, uid } = agora;

        const rtcToken = RtcTokenBuilder.buildTokenWithUid(
            appId,
            appCertificate,
            channel,
            uid,
            role,
            expiredTime
        )

        const rtmToken = RtmTokenBuilder.buildToken(
            appId,
            appCertificate,
            channel,
            uid,
            role,
        )

        return { rtcToken, rtmToken };
    }
}