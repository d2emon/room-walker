interface EventMeta {
    firstEventId: number,
    lastEventId: number,
}

interface EventData {
    firstEventId: number,
    lastEventId: number,
    events: {}[],
}

const DATA: EventData = {
    firstEventId: 0,
    lastEventId: 0,
    events: [],
};

export const getFirstEventId = (): Promise<number> => Promise.resolve(DATA.firstEventId);
export const getLastEventId = (): Promise<number> => Promise.resolve(DATA.lastEventId);
