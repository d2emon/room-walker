export type EventId = number;

export interface Event {
    eventId?: EventId;
    sender?: string;
    receiver?: string;
    code: number;
    channelId?: number;
    payload?: any;
}
