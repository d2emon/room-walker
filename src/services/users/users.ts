// import axios from 'axios';
import * as Events from 'services/events';
import { Event, EventId } from '../events/types';
import { addNewCharacter, saveCharacter } from './characters';
import { addMessagesUser } from './messages';
import {
  Character,
  User,
  UserId,
} from './types';

interface AddUserRequestData {    
  name: string;
}
  
interface AddUserResponse {
  data: {
    user: User,
  };
}

interface PostUserActionRequestData {    
  action: string;
}
    
interface PostUserActionResponse {
  data: any;
}

interface PostUserEventRequestData {
  event: Event;
}
        
interface PostUserEventResponse {
  data: any;
}

interface PostUserEventsRequestData {
  userId?: UserId;
  eventId?: EventId;
  force?: boolean;
}
        
interface PostUserEventsResponse {
  data: any;
}
        
interface UserStorage {
  [k: UserId]: User;
}

const stored: UserStorage = {};

const getUser = async (userId: UserId) => {
  const user = stored[userId] || {};
  return {
    ...user,
  };
}

const setUser = async (userId: UserId, user: User) => {
  stored[userId] = user;
}

const updateEventId = async (userId: UserId, eventId: EventId) => {
  const user = await getUser(userId);
  const lastUpdate = user?.lastUpdate || 0;

  const newEvents = (eventId < lastUpdate)
    ? (eventId - lastUpdate)
    : (lastUpdate - eventId);

  if (newEvents < 10) {
    return;
  }

  const char:Character = user?.character || {};
  saveCharacter(user?.characterId, {
    ...char,
    eventId,
  });

  setUser(userId, {
    ...user,
    // eventId,
    lastUpdate,
  });
};

export const postUser = async (data: AddUserRequestData): Promise<AddUserResponse> => {
  /*
  axios.post(
    'http://127.0.0.1:4001/user',
     user,
  )
  */
  const userId: UserId = 'NEW_USER_ID';
  const {
    name,
  } = data;

  // syslog("GAME ENTRY: %s[%s]",globme,cuserid(NULL));
  console.log(`GAME ENTRY: ${name}[${userId}]`);

  await addMessagesUser(userId);

  const character = await addNewCharacter(name);
  
  const user: User = {
    userId,
    mode: '',
    characterId: character.characterId || 0,
    character,
    // eventId: null,
  };
  
  stored[userId] = user;

  return {
    data: {
      user,
    },
  };
};

export const postUserAction = async (userId: UserId, data: PostUserActionRequestData): Promise<PostUserActionResponse> => {
  /*
  axios.post(
    'http://127.0.0.1:4001/action',
    {
      userId,
      action,
    },
  )
  */
    
  // cms = -1;
  // special('.q', name);
    
  return {
    data: {},
  };
};

export const postUserEvent = async (data: PostUserEventRequestData): Promise<PostUserEventResponse> => {
  /*
  axios.post(
    'http://127.0.0.1:4001/event',
    {
        event,
    },
  )
  */
        
  return {
    data: {},
  };
};

export const postUserEvents = async (userId: UserId, data: PostUserEventsRequestData): Promise<PostUserEventsResponse> => {
  // async (eventId?: EventId, force?: boolean) => {
  const {
    eventId,
    force,
  } = data;
  const response = await Events.processEvents(userId, eventId, force);
  const { lastEventId } = response?.data || {};

  await updateEventId(userId, lastEventId);

  // eorte();

  return {
    data: {
      lastEventId,
      rdes: 0,
      tdes: 0,
      vdes: 0,  
    },
  };
};
