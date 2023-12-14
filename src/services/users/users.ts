// import axios from 'axios';
import * as Events from 'services/events';
import { Event, EventId } from '../events/types';
import { addNewCharacter, saveCharacter } from './characters';
import { addMessagesUser } from './messages';
import { getPersonData, Person, postPersonData } from './persons';
import {
  Character,
  User,
  UserId,
} from './types';
import mockQueryDecorator, { MockQuery } from './mock';

interface UserRequestParams {
  userId: UserId,
}

interface PersonResponse {
  error?: string;
  data?: {
    person: Person | null,
  },
}

// AddUser

interface AddUserRequestData {    
  name: string;
}

type AddUserRequest = MockQuery<any, AddUserRequestData>;

interface AddUserResponse {
  user: User,
  eventId?: EventId,
  person: Person | null,
}

// NewCharacter

type NewCharacterRequest = MockQuery<UserRequestParams, any>;

// PostUserAction

interface PostUserActionRequestData {    
  action: string;
}
    
type PostUserActionRequest = MockQuery<UserRequestParams, PostUserActionRequestData>;

interface PostUserActionResponse {
  data: any;
}

// PostUserEvent

interface PostUserEventRequestData {
  event: Event;
}
        
type PostUserEventRequest = MockQuery<any, PostUserEventRequestData>;

interface PostUserEventResponse {
  data: any;
}

// PostUserEvents

interface PostUserEventsRequestData {
  userId?: UserId,
  eventId?: EventId,
  force?: boolean,
}
        
type PostUserEventsRequest = MockQuery<UserRequestParams, PostUserEventsRequestData>;

interface PostUserEventsResponse {
  lastEventId?: EventId,
  messages: string[],
  rdes: number,
  tdes: number,
  vdes: number,  
}
        
// Storage

interface UserStorage {
  [k: UserId]: User;
}

const stored: UserStorage = {};

// Helpers

const getUser = async (userId: UserId) => {
  const user = stored[userId] || {};
  return {
    ...user,
  };
}

const setUser = async (userId: UserId, user: User) => {
  stored[userId] = user;
}

const updateEventId = async (user: User, eventId?: EventId) => {
  if (!user) {
    return;
  }

  if (!eventId) {
    return;
  }

  const lastUpdate = user.lastUpdate || 0;

  const newEvents = (eventId < lastUpdate)
    ? (eventId - lastUpdate)
    : (lastUpdate - eventId);

  if (newEvents < 10) {
    return;
  }

  const char:Character = user?.character || {};
  saveCharacter(user.characterId, {
    ...char,
    eventId,
  });

  setUser(user.userId, {
    ...user,
    eventId,
    lastUpdate,
  });
};

const processEvent = (user: User) => async (event: Event) => {
  // Print appropriate stuff from data block
  let message: string = '';
  if (event.code < -3) {
    // const luser = user.name.toLowerCase();
    // sysctrl(block,luser);
  } else {
    message = `${event.payload}`;
  }

  if (user.debugMode) {
    return `&lt;${event.code}&gt;\n${message}`
  }

  return message;
}

const processEvents = async (user: User) => {
  const eventData = await Events.processEvents(user?.eventId);

  const {
    lastEventId,
    events,
  } = eventData || {};

  const messages = await Promise.all(events.map(processEvent(user)));

  await updateEventId(user, lastEventId);

  // eorte();

  return {
    lastEventId,
    messages,
    rdes: 0,
    tdes: 0,
    vdes: 0,  
  };
}

const startGame = async (user: User) => {
  const channelId = -5;
  /*
  if(randperc()>50)trapch(-5);
  else{curch= -183;trapch(-183);}
  */
  // const eventId = undefined;
  const mode = '1';

  const personResponse = await getPersonData({
    params: {
      name: user?.name,
    },
    data: {},
  });
  const {
    person,
  } = personResponse?.data || {};

  if (!person) {
    return null;
  }

  const {
    level,
    sex,
    strength,
  } = person;
  const visibility = (level < 10000) ? 0 : 10000;

  // Load world

  // cuserid(us);

  const character: Character = {
    characterId: user?.characterId,
    channelId: user?.character?.channelId,
    helping: -1,
    level,
    name: user?.character?.name,
    sex,
    strength,
    visibility,
    weapon: -1,
  };
  const newUser: User = {
    userId: user?.userId || -1,
    // channelId,
    characterId: user?.characterId,
    debugMode: user?.debugMode || false,
    eventId: undefined,
    mode,
    name: user?.name,

    isSaved: user?.isSaved,
    character,
  };

  const xx = `[s name="${user?.name}"][ ${user?.name}  has entered the game ]\n[/s]`;
  const xy = `[s name="${user?.name}"]${user?.name}  has entered the game\n[/s]`;

  // sendsys(name, name, -10113, -5, xx);

  const processed = await processEvents(user);
  console.log(processed);

  // trapch(channelId);

  // sendsys(name, name, -10000, curch, xy);

  return {};
}

const getPersonFromResponse = (response: PersonResponse): Person | null => {
  const {
    error,
    data,
  } = response;
  if (error || !data) {
    throw new Error(error);
  }

  const {
    person,
  } = data;

  return person || null;
};

// Handlers

export const postUserEvents = mockQueryDecorator<
  PostUserEventsRequest,
  PostUserEventsResponse
> ('POST http://127.0.0.1:4001/user/:userId/events/', async (query): Promise<PostUserEventsResponse> =>  {
  const {
    /*
    data: {
      eventId,
      // force,  
    },
    */
    params: {
      userId,
    },
  } = query;

  const user = await getUser(userId);
  return processEvents(user);
});

export const postUser = mockQueryDecorator<
  AddUserRequest,
  AddUserResponse
> ('POST http://127.0.0.1:4001/user/', async (query): Promise<AddUserResponse> =>  {
  const {
    data: {
      name,
    },
  } = query;
  const userId: UserId = 'NEW_USER_ID';

  // syslog("GAME ENTRY: %s[%s]",globme,cuserid(NULL));
  console.log(`GAME ENTRY: ${name}[${userId}]`);

  await addMessagesUser(userId);

  const character = await addNewCharacter(name);
  
  const user: User = {
    userId,
    mode: '',
    name: character?.name || name,
    characterId: character?.characterId || 0,
    // eventId: null,
    debugMode: true,

    isSaved: false,
    character,
  };
  await setUser(userId, user);

  const processed = await processEvents(user);
  const eventId = processed?.lastEventId;

  const personResponse = await getPersonData({
    params: {
      name: user?.name,
    },
    data: {},
  });
  const person = getPersonFromResponse(personResponse);

  user.isSaved = !!person;

  await setUser(userId, user);

  return {
    user,
    eventId,
    person,
  };
});

export const postNewCharacter = mockQueryDecorator<
  NewCharacterRequest,
  AddUserResponse
> ('POST http://127.0.0.1:4001/user/:userId/character', async (query): Promise<AddUserResponse> =>  {
  const {
    data: {
      sex,
    },
    params: {
      userId,
    },
  } = query;

  const user = await getUser(userId);

  const personResponse = await postPersonData({
    params: {
      name: user?.name,
    },
    data: {
      sex,
    },
  });
  const person = getPersonFromResponse(personResponse);

  user.isSaved = !!person;

  stored[userId] = user;

  return {
    user,
    eventId: user?.eventId,
    person,
  };
});

export const postUserAction = mockQueryDecorator<
  PostUserActionRequest,
  PostUserActionResponse
> ('POST http://127.0.0.1:4001/user/:userId/action/', async (query): Promise<PostUserActionResponse> => {
  const {
    data: {
      action,
    },
    params: {
      userId,
    },
  } = query;

  const user = await getUser(userId);

  if (action[0] !== '.') {
    const data = {};
    return {
      data,
    };
  }

  if (action[1].toLowerCase() === 'g') {
    const data = await startGame(user);
    return {
      data,
    };
  }

  return {
    data: {
      error: 'Unknown . option',
    },
  };
});

export const postUserEvent = mockQueryDecorator<
  PostUserEventRequest,
  PostUserEventResponse
> ('POST http://127.0.0.1:4001/user/event', async (): Promise<PostUserEventResponse> => {
  return {
    data: {},
  };
});
