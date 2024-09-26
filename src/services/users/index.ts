import axios from 'axios';
import { Event, EventId } from '../events/types';
import { Person } from './persons';
import {
  User,
  UserId,
} from './types';
import {
  // getUser,
  postNewCharacter,
  // postUser,
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

const API_URL = 'http://127.0.0.1:4000';
const hasBack = false;
const sampleUser = {
  userId: 'USER_ID',
  token: 'TOKEN',
  debugMode: true,
  mode: '%MODE%',
  name: 'Name',
  characterId: -1,
  character: null,
  // lastUpdate: -1,
  // eventId?: EventId,
  // channelId?: -1,

  isSaved: false,

  person: null,
};

const API = {
  createUser: (token: UserId, name: string) => (hasBack
    ? axios.post(`${API_URL}/api/v1.0/user/?token=${token}`, { name })
    : Promise.resolve({
      data: {
        user: sampleUser,
      },
    })),
  getUserByToken: (token: UserId) => (hasBack
    ? axios.get(`${API_URL}/api/v1.0/user/?token=${token}`)
    : Promise.resolve({
      data: {
        user: null,
      },
    })),
}

export const loadUser = async (token: UserId): Promise<User | null> => {
  /*
  const response = await getUser({
    params: {
      userId,
    },
    data: undefined,
  });
  */
  const response = await API.getUserByToken(token);
  return response?.data?.user || null;
}

export const addUser = async (token: UserId, name: string): Promise<User | null> => {
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
  const response = await API.createUser(token, name);
  return response?.data?.user || null;
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
