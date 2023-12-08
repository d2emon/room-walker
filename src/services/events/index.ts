import { UserId } from 'services/users/types';
import { loadEvents, postUserEvents, saveEvent } from './events';
import { Event, EventId } from './types';

export interface EventsResponse {
    lastEventId: EventId;
    events: Event[];
}

export interface PostEventResponse {
    eventId: EventId;
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

export const processEvents = async (userId: UserId, eventId?: number, force?: boolean): Promise<any> => {
  const response = await postUserEvents(userId, {
    eventId,
    force,
  });
  return response?.data;
}

const Events = {
  getEvents,
  postEvent,
}

export default Events;
