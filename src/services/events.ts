import axios from "axios";

export interface Event {
    eventId?: number,
    code: number,
}

export interface EventsResponse {
    lastEventId: number,
    events: Event[],
}

export interface PostEventResponse {
    eventId: number,
}

export default {
    getEvents: (eventId?: number): Promise<EventsResponse> => axios.get(
        'http://127.0.0.1:4003',
        { params: {
            eventId,
        } },
    )
        .then(response => response.data),
    postEvent: (event: Event): Promise<PostEventResponse> => axios.post(
        'http://127.0.0.1:4003',
        {
            event,
        },
    )
        .then(response => response.data),
}
