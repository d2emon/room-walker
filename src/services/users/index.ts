import { Event, EventId } from '../events/types';
import { Person } from './persons';
import {
  User,
  UserId,
} from './types';
import {
  postUser,
  postUserAction,
  postUserEvent,
  postUserEvents,
} from './users';

interface AddUserResponse {
  user: User;
  eventId: EventId;
  person: Person | null;
};

export const addUser = async (name: string): Promise<AddUserResponse> => {
  const response = await postUser({
    name,
  });

  return response?.data;
};

const perform = async (userId: UserId, action: string): Promise<any> => {
  const response = await postUserAction(userId, {
    action,
  });

  return response?.data;
}

const sendEvent = async (event: Event) => {
  const response = await postUserEvent({
    event,
  });

  return response?.data;
}

const broadcast = async (message: string) => {
  try {
    const response = await sendEvent({
      code: -1,
      payload: message,
    });
    // return dispatch(forceEvents(response));
    return response;
  } catch(e) {
    // logOut();
    // setErrorMessage(null, 'AberMUD: FILE_ACCESS : Access failed');
  }
}

const processUserEvents = async (userId: UserId, eventId?: EventId, force?: boolean) => {
  const response = await postUserEvents(userId, {
    eventId,
    force,
  });

  return response?.data;
}

const UserService = {
  perform,
  processUserEvents,
  sendEvent,
  broadcast,
}

export default UserService;
