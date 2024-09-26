// import axios from 'axios';
import { UserId } from 'services/users/types';
import { Event, EventId } from './types';
import mockQueryDecorator, { MockQuery } from 'services/mock';

// SaveEvent

interface SaveEventRequestData {    
  event: Event;
}

type SaveEventRequest = MockQuery<any, SaveEventRequestData>;

// Events

interface EventsRequestParams {
  userId?: UserId,
  eventId?: EventId,
  force?: boolean,
}

type EventsRequest = MockQuery<EventsRequestParams, any>;

interface EventsResponse {
  lastEventId: EventId;
  events: Event[];
}

// Event

interface EventResponse {
  eventId: EventId;
}

// UserEvents

interface UserEventsRequestParams {
  eventId?: EventId,
}

type UserEventsRequest = MockQuery<UserEventsRequestParams, any>;

interface UserEventsResponse {
  lastEventId: EventId;
  events: Event[];
}

// EventId

type EventIdRequest = MockQuery<any, any>;

interface EventIdResponse {
  lastEventId: EventId;
}

// Storage

interface EventStorage {
  firstEventId: EventId;
  lastEventId: EventId;
  events: {
    [k: string]: Event;
  };
}

const stored: EventStorage = {
  firstEventId: 0,
  lastEventId: 2,
  events: {},
};

// Helpers

const getLastEventId = async () => (stored.lastEventId);

const setEvent = async (event: Event): Promise<EventId> => {
  const {
    firstEventId,
    lastEventId,
  } = stored;

  const eventId = 2 * lastEventId - firstEventId;

  stored.lastEventId += 1;
  stored.events[eventId] = {...event};

  return eventId;
};

const getEvent = async (eventId: EventId): Promise<Event | undefined> => {
  const {
    firstEventId,
    events,
  } = stored;
  const actualEventId = eventId * 2 - firstEventId;
  return events[actualEventId];
};

const getEvents = async (eventId: EventId): Promise<Event[]> => {
  const lastEventId = await getLastEventId();
  const firstEventId: number = eventId || lastEventId;

  const eventIds: EventId[] = [];
  for (let id = firstEventId; id <= lastEventId; id += 1) {
    eventIds.push(id);
  }

  const events = await Promise.all(eventIds.map(getEvent));

  return events.filter(event => !!event) as Event[];
};

// Handlers

export const loadEvents = mockQueryDecorator<
  EventsRequest,
  EventsResponse
>('GET', 'http://127.0.0.1:4001/event/events', async (): Promise<EventsResponse> => {
  const events: Event[] = Object.values(stored);
  
  return {
    lastEventId: stored.lastEventId,
    events,
  };
});

export const saveEvent = mockQueryDecorator<
  SaveEventRequest,
  EventResponse
>('POST', 'http://127.0.0.1:4001/event/save', async (query): Promise<EventResponse> => {
  const eventId: EventId = 0;
  const {
    data: {
      event,
    },
  } = query;

  stored.events[eventId] = event;
  
  return {
    eventId,
  };
});

export const getUserEvents = mockQueryDecorator<
  UserEventsRequest,
  UserEventsResponse
>('GET', 'http://127.0.0.1:4001/event/:eventId/', async (query): Promise<UserEventsResponse> => {
  const {
    params: {
      eventId,
    },
  } = query;

  console.log(stored);

  const lastEventId = await getLastEventId();

  if (!eventId) {
    return {
      lastEventId,
      events: [],
    };  
  }

  const events = await getEvents(eventId);
  const newEventId: EventId | undefined = events.length
    ? events[events.length - 1].eventId
    : lastEventId;

  return {
    lastEventId: newEventId || -1,
    events,
  };
});

export const getUserEventId = mockQueryDecorator<
  EventIdRequest,
  EventIdResponse
>('GET', 'http://127.0.0.1:4001/event/', async (): Promise<EventIdResponse> => {
  const lastEventId = await getLastEventId();

  return {
    lastEventId,
  };  
});

export const postEvent = mockQueryDecorator<
  SaveEventRequest,
  EventResponse
>('POST', 'http://127.0.0.1:4001/event/', async (query): Promise<EventResponse> => {
  const {
    data: {
      event,
    },
  } = query;
  /*
  const {
    receiver,
    sender,
    code,
    channelId,
    payload,
  } = event;
  const block = [
    channelId,
    code,
    [
      receiver,
      sender,
    ],
    payload,
  ];
  */

  const eventId = await setEvent(event);

  if (eventId >= 199) {
    /*
    cleanup(inpbk);
    longwthr();
    */
  }

  return {
    eventId,
  };
});
