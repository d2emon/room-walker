import axios from 'axios';
import config from '../config';
import {User} from "./users";

export interface Event {
    eventId?: number,
    code: number,
    payload?: any,
}

interface EventsResponse {
    lastEventId: number,
    events: Event[],
}

interface PostEventResponse {
    eventId: number,
}

const sendMessage = (message: string): Promise<void> => Promise.resolve();

const getEvents = (eventId?: number): Promise<EventsResponse> => axios.get(
    config.eventsUrl,
    { params: {
        eventId,
    } },
)
    .then(response => response.data);

const postEvent = (event: Event): Promise<PostEventResponse> => axios.post(
    config.eventsUrl,
    {
        event,
    }
)
    .then(response => response.data);

/* Print appropriate stuff from data block */
const processEvent = (event: Event): Promise<void> => Promise.resolve(false)
    .then(debugMode => debugMode && sendMessage(`\n<${event.code}>`))
    .then(() => ((event.code < -3)
        ? // gamrcv(event)
            Promise.resolve()
        : sendMessage(event.payload)
    ));

export const processEvents = (
    user: User,
    eventId?: number,
    interrupt: boolean = false,
): Promise<number> => {
    const onProcessedEvents = () => Promise.resolve(interrupt);

    const onEvents = (lastEventId: number, events: Event[]) => Promise
        .all(events.map(processEvent))
        .then(() => {
            // update(user.character.name);
        })
        .then(onProcessedEvents)
        .then(() => {
            // rdes=0;tdes=0;vdes=0;
        })
        .then(() => lastEventId);

    return getEvents(eventId)
        .then(response => onEvents(response.lastEventId, response.events));
};

export const sendEvent = (event: Event): Promise<void> => postEvent(event)
    .then(() => null)
    .catch(() => {
        // logOut();
        throw new Error('AberMUD: FILE_ACCESS : Access failed');
    });
