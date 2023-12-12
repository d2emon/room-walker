// import axios from 'axios';
import { UserId } from 'services/users/types';
import { Event, EventId } from './types';

interface SaveEventRequestData {    
  event: Event;
}

interface EventsResponse {
  data: {
    lastEventId: EventId;
    events: Event[];
  };
}

interface EventResponse {
  data: {
    eventId: EventId;
  };
}

interface PostUserEventsRequestData {
  userId?: UserId;
  eventId?: number;
  force?: boolean;
}

interface PostUserEventsResponse {
  data: {
    lastEventId: EventId;
    events: Event[];
  };
}

interface EventStorage {
  firstEventId: EventId;
  lastEventId: EventId;
  events: {
    [k: EventId]: Event;
  };
}

const stored: EventStorage = {
  firstEventId: 1,
  lastEventId: 1,
  events: {},
};

const getLastEventId = async () => (stored.lastEventId);

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
  for (let id = firstEventId; id < lastEventId; id += 1) {
    eventIds.push(id);
  }

  const events = await Promise.all(eventIds.map(getEvent));

  return events.filter(event => !!event) as Event[];
};

export const loadEvents = async (eventId?: number): Promise<EventsResponse> => {
  /*
  axios.get(
    'http://127.0.0.1:4001/event/:eventId',
  )
  */
        
  const events: Event[] = Object.values(stored);
  
  return {
    data: {
      lastEventId: stored.lastEventId,
      events,
    },
  };
};

export const saveEvent = async (data: SaveEventRequestData): Promise<EventResponse> => {
  /*
  axios.post(
    'http://127.0.0.1:4001/event',
    event,
  )
  */
  const eventId: EventId = 0;
  const {
    event,
  } = data;

  stored.events[eventId] = event;
  
  return {
    data: {
      eventId,
    },
  };
};

export const getUserEvents = async (eventId?: EventId): Promise<PostUserEventsResponse> => {
  /*
  axios.get(
    'http://127.0.0.1:4001/events/:eventId',
  )
  */
     
  const lastEventId = await getLastEventId();

  if (!eventId) {
    return {
      data: {
        lastEventId,
        events: [],
      },
    };  
  }

  const events = await getEvents(eventId);
  const newEventId: EventId | undefined = events.length
    ? events[events.length - 1].eventId
    : lastEventId;

  return {
    data: {
      lastEventId: newEventId || -1,
      events,
    },
  };
};
