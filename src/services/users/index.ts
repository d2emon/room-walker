import axios from 'axios';
import { Event, EventId } from '../events/types';
import { Person } from './persons';
import {
  User,
  UserId,
} from './types';
import {
  getUser,
  postNewCharacter,
  postUser,
  postUserAction,
  postUserEvent,
  postUserEvents,
} from './users';

export interface AddUserResponse {
  user: User;
  eventId?: EventId;
  person: Person | null;
};

export interface NewCharacterData {
  sex: string;
};

export const loadUser = async (userId: UserId): Promise<User | null> => {
  /*
  const response = await getUser({
    params: {
      userId,
    },
    data: undefined,
  });
  */
  const response = await axios.get(`http://127.0.0.1:4000/api/v1.0/user/?token=${userId}`);
  const {
    data,
  } = response;
  return data?.user || null;
}

export const addUser = async (userId: UserId, name: string): Promise<User | null> => {
  /*
  const response = await postUser({
    params: {
      userId,
    },
    data: {
      name,
    },
  });
  */
  const response = await axios.post(`http://127.0.0.1:4000/api/v1.0/user/?token=${userId}`, {
    name,
  });
  const {
    data,
  } = response;
  return data?.user || null;
};

export const createCharacter = async (userId: UserId, characterData: NewCharacterData): Promise<User | null> => {
  const response = await postNewCharacter({
    params: {
      userId,
    },
    data: characterData,
  });

  const {
    error,
    data,
  } = response;

  if (error || !data) {
    throw new Error();
  }

  return data?.user || null;
};

const perform = async (userId: UserId, action: string): Promise<any> => {
  const response = await postUserAction({
    params: {
      userId,
    },
    data: {
      action,
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
}

const sendEvent = async (event: Event) => {
  const response = await postUserEvent({
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
  const response = await postUserEvents({
    params: {
      userId,
    },
    data: {
      eventId,
      force,
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
}

const UserService = {
  perform,
  processUserEvents,
  sendEvent,
  broadcast,
}

export default UserService;
