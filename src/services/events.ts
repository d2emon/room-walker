import axios from "axios";

export interface Event {
    code: number,
}

export interface EventsResponse {
    lastEventId: number,
    events: Event[],
}

export default {
    getEvents: (eventId?: number): Promise<EventsResponse> => axios.get(
        'http://127.0.0.1:4003',
        { params: {
            eventId,
        } },
    )
        .then(response => response.data),
}
