import { Event, EventId } from '../events/types';
import { Person } from './persons';
import {
  User,
  UserId,
} from './types';
import {
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

export const addUser = async (name: string): Promise<AddUserResponse> => {
  const response = await postUser({
    params: undefined,
    data: {
      name,
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

export const createCharacter = async (userId: UserId, characterData: NewCharacterData): Promise<AddUserResponse> => {
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

  return data;
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
