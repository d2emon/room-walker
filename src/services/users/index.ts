import axios from 'axios';
import mockQueryDecorator, { MockQuery } from '../mock';
import { Event, EventId } from '../events/types';
import { Person } from './persons';
import {
  User,
  UserId,
} from './types';
import {
  API_URL,
  // getUser,
  postNewCharacter,
  postNewUser,
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

const hasBack = false;

interface UsersQueryParams {
  token: UserId;
};
interface UserResponseData {
  user: User | null;
};

const getUserByTokenHandler = mockQueryDecorator<
  MockQuery<UsersQueryParams, undefined>,
  UserResponseData
> ('GET', API_URL, async (query) => ({
  user: null,
}));

const API = {
  createUser: (token: UserId, name: string) => (hasBack
    ? axios.post(`${API_URL}?token=${token}`, { name })
    : postNewUser(token, name)),
  getUserByToken: (token: UserId) => (hasBack
    ? axios.get(`${API_URL}?token=${token}`)
    : getUserByTokenHandler({
      data: undefined,
      params: {
        token,
      },
    })),
  createCharacter: (userId: UserId, data: NewCharacterData) => (hasBack
    ? axios.post(`${API_URL}${userId}/character`)
    : postNewCharacter(userId, data)),
};

const loadUser = async (token: UserId): Promise<User | null> => {
  if (!token) {
    throw new Error('Authorization token is required!');
  }
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

const addUser = async (token: string, name: string): Promise<User | null> => {
  if (!token) {
    throw new Error('Authorization token is required!');
  }
  if (!name) {
    throw new Error('Name is required!');
  }
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

const createCharacter = async (token: string, characterData: NewCharacterData) => {
  if (!token) {
    throw new Error('Authorization token is required!');
  }
  const response = await API.createCharacter(token, characterData);

  if (!response?.data || response?.data?.error) {
    throw new Error();
  }

  return response?.data?.user || null;
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
    // setError({ message: 'AberMUD: FILE_ACCESS : Access failed'});
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
  addUser,
  loadUser,
  createCharacter,
  //
  perform,
  processUserEvents,
  sendEvent,
  broadcast,
}

export default UserService;
