import { getUserEvents, loadEvents, saveEvent } from './events';
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

const getEvents = async (eventId?: number): Promise<EventsResponse> => {
  const response = await loadEvents(eventId);
  return response?.data;
};

const postEvent = async (event: Event): Promise<PostEventResponse> => {
  const response = await saveEvent({
    event,
  });
  return response?.data;
};

export const processEvents = async (eventId?: number): Promise<ProcessEventsResponse> => {
  const response = await getUserEvents(eventId);
  return response?.data;
}

const Events = {
  getEvents,
  postEvent,
}

export default Events;
