import axios from 'axios';
import config from '../config';

interface EventMeta {
    firstEventId: number,
    lastEventId: number,
}

interface EventResponse extends EventMeta {
    eventId: number,
}

interface Event {
    eventId?: number,
}

const getEventMeta = (): Promise<EventMeta> => axios.get(`${config.worldUrl}/events-meta`)
    .then(response => response.data);
const addEvent = (event: Event): Promise<EventResponse> => axios.post(`${config.worldUrl}/events`, event)
    .then(response => response.data);
const cleanUp = (): Promise<void> => axios.delete(`${config.worldUrl}/events`);

const getEvent = (eventId: number): Promise<Event> => Promise.resolve({});
const revise = (cutoff: number) => Promise.resolve()
    .then(() => {
        const users = [];
        for (let userId = 0; userId < 16; userId += 1) {
            // if (!pname(userId) || ppos(userId) >= cutoff || ppos(userId) === -2) {
            //     continue;
            // }
            users.push(userId);
        }
        return users;
    })
    .then(users => users.forEach((userId) => {
        // broad(`${pname(userId)} has been timed out\n`);
        // dumpstuff(userId, ploc(userId));
        // setpname(userId, '');
    }));
const changeWeather = (): Promise<void> => Promise.resolve();

const onTimeout = (timeout: number): Promise<void> => Promise.all([
    cleanUp(),
    revise(timeout),
    changeWeather(),
])
    .then(() => null);

export const getEvents = (eventId?: number): Promise<Event[]> => getEventMeta()
    .then((data) => {
        const {
            lastEventId,
        } = data;
        const promises = [];
        for (let currentEventId = eventId || lastEventId; currentEventId < lastEventId; currentEventId++) {
            promises.push(getEvent(currentEventId));
        }
        return Promise.all(promises);
    })
    .catch(() => Promise.reject(new Error('WORLD: FILE_ACCESS : Access failed')));

export const sendEvent = (event: Event): Promise<number> => addEvent(event)
    .then((data) => {
        const promises = [];
        if (data.eventId >= 199) {
            return onTimeout(data.lastEventId - 50)
                .then(() => data.eventId)
        }
        return data.eventId;
    })
    .catch(() => Promise.reject(new Error('WORLD: FILE_ACCESS : Access failed')));
