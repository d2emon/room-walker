// import axios from 'axios';
import { Event } from '../events';
import { addNewCharacter } from './characters';
import { addMessagesUser } from './messages';
import {
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

interface PostUserEventsRequestData {
  eventId?: number;
  force?: boolean;
}
      
interface PostUserEventsResponse {
  data: any;
}

interface PostUserEventRequestData {
  event: Event;
}
        
interface PostUserEventResponse {
  data: any;
}
        
interface UserStorage {
  [k: UserId]: User;
}

const stored: UserStorage = {};

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

  await addMessagesUser(userId);

  // putmeon(name);
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

export const postUserEvents = async (userId: UserId, data: PostUserEventsRequestData): Promise<PostUserEventsResponse> => {
  /*
  axios.post(
    'http://127.0.0.1:4001/action',
    {
      userId,
      eventId,
      force,
    },
  )
  */
      
  // openworld();
  // rte(name);
  // closeworld();
      
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
