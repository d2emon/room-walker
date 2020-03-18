import events from "../../../../src/services/events";

interface EventMeta {
    firstEventId: number,
    lastEventId: number,
}

interface Event {
    eventId?: number,
}

interface EventData {
    firstEventId: number,
    lastEventId: number,
    events: Event[],
}

const DATA: EventData = {
    firstEventId: 0,
    lastEventId: 0,
    events: [],
};

const moveEvents = (oldEventId: number, newEventId: number, count: number) => new Promise((resolve) => {
    for (let eventId = oldEventId; eventId < oldEventId + count; eventId += 1) {
        DATA.events[oldEventId + eventId] = DATA.events[newEventId + eventId];
    }
    return resolve(count);
});

export const getFirstEventId = (): Promise<number> => Promise.resolve(DATA.firstEventId);
export const getLastEventId = (): Promise<number> => Promise.resolve(DATA.lastEventId);
export const addEvent = (event: Event): Promise<number> => {
    DATA.lastEventId = DATA.lastEventId + 1;
    DATA.events.push({
        ...event,
        eventId: DATA.lastEventId,
    });
    return Promise.resolve(DATA.lastEventId - DATA.firstEventId);
};
export const cleanUp = () => Promise.all([
    moveEvents(101, 1, 20),
    moveEvents(121, 21, 20),
    moveEvents(141, 41, 20),
    moveEvents(161, 61, 20),
    moveEvents(181, 81, 20),
])
    .then(() => {
        DATA.firstEventId = DATA.firstEventId + 100;
    });
