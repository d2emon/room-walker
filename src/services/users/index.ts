import { Event } from '../events';
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

export const addUser = async (name: string): Promise<User> => {
  const response = await postUser({
    name,
  });

  return response?.data?.user;
};

const perform = async (userId: UserId, action: string): Promise<any> => {
  const response = await postUserAction(userId, {
    action,
  });

  return response?.data;
}

const processEvents = async (userId: UserId, eventId?: number, force?: boolean): Promise<any> => {
  const response = await postUserEvents(userId, {
    eventId,
    force,
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

const UserService = {
  perform,
  processEvents,
  sendEvent,
  broadcast,
}

export default UserService;
