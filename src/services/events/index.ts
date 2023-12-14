import { getUserEventId, getUserEvents, loadEvents, postEvent, saveEvent } from './events';
import { Event, EventId } from './types';

export interface EventsResponse {
  lastEventId: EventId;
  events: Event[];
}

export interface PostEventResponse {
  eventId: EventId;
}

export interface ProcessEventsResponse {
  lastEventId?: EventId;
  events: Event[];
}

export interface EventIdResponse {
  lastEventId?: EventId;
}

const getEvents = async (eventId?: number): Promise<EventsResponse> => {
  const response = await loadEvents({
    params: {
      eventId,
    },
    data: {},
  });

  const {
    error,
    data,
  } = response;

  if (error || !data) {
    throw new Error();
  }

  return data;
};

export const sendEvent = async (event: Event): Promise<PostEventResponse> => {
  const response = await postEvent({
    params: undefined,
    data: {
      event,
    },
  });

  const {
    error,
    data,
  } = response;

  if (error || !data) {
    throw new Error();
  }

  return data;
};

export const processEvents = async (eventId?: number): Promise<ProcessEventsResponse> => {
  const response = await getUserEvents({
    params: {
      eventId,
    },
    data: undefined,
  });

  const {
    error,
    data,
  } = response;

  if (error || !data) {
    throw new Error();
  }

  return data;
};

export const getEventid = async (): Promise<EventIdResponse> => {
  const response = await getUserEventId({
    params: undefined,
    data: undefined,
  });

  const {
    error,
    data,
  } = response;

  if (error || !data) {
    throw new Error();
  }

  return data;
};

const Events = {
  getEvents,
  postEvent,
}

export default Events;
