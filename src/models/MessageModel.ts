export interface MessageModel {
    content: string;
    username: String;
}

export type OnNewMessageType = MessageModel;
export type EmitMessageType = MessageModel & { socketId: string };