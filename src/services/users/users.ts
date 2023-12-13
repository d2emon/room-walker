// import axios from 'axios';
import * as Events from 'services/events';
import { Event, EventId } from '../events/types';
import { addNewCharacter, saveCharacter } from './characters';
import { addMessagesUser } from './messages';
import { getPersonData, Person } from './persons';
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
    eventId: EventId,
    person: Person | null,
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

const updateEventId = async (userId: UserId, eventId?: EventId) => {
  if (!eventId) {
    return;
  }

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

const startGame = async (user: User) => {
  const channelId = -5;
  /*
  if(randperc()>50)trapch(-5);
  else{curch= -183;trapch(-183);}
  */
  const eventId = undefined;
  const mode = '1';

  const personResponse = await getPersonData(user?.name);
  const {
    person,
  } = personResponse?.data;

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
    eventId,
    mode,
    name: user?.name,

    isSaved: true,
    character,
  };

  const xx = `[s name="${user?.name}"][ ${user?.name}  has entered the game ]\n[/s]`;
  const xy = `[s name="${user?.name}"]${user?.name}  has entered the game\n[/s]`;
  // sendsys(name, name, -10113, -5, xx);
  // rte(name);
  // trapch(channelId);
  // sendsys(name, name, -10000, curch, xy);

  return {};
}

export const postUserEvents = async (userId: UserId, data: PostUserEventsRequestData): Promise<PostUserEventsResponse> => {
  // async (eventId?: EventId, force?: boolean) => {
  const {
    eventId,
    // force,
  } = data;

  const [
    user,
    eventData,
  ] = await Promise.all([
    getUser(userId),
    Events.processEvents(eventId),
  ]);

  const {
    lastEventId,
    events,
  } = eventData || {};

  const messages = await Promise.all(events.map(processEvent(user)));

  await updateEventId(userId, lastEventId);

  // eorte();

  return {
    data: {
      lastEventId,
      messages,
      rdes: 0,
      tdes: 0,
      vdes: 0,  
    },
  };
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
    name: character?.name || name,
    characterId: character?.characterId || 0,
    // eventId: null,
    debugMode: true,

    isSaved: false,
    character,
  };

  const processed = await postUserEvents(userId, {});
  const eventId = processed?.data?.lastEventId;

  const personResponse = await getPersonData(user?.name);
  const {
    person,
  } = personResponse?.data;

  user.isSaved = !!person;

  stored[userId] = user;

  return {
    data: {
      user,
      eventId,
      person,
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
  const {
    action,
  } = data;

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
