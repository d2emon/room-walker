import * as Events from 'services/events';
import { EventId, Event } from 'services/events/types';
import { getUser, setUser } from './storage';
import { saveCharacter } from '../characters';
import { addMessagesUser } from '../messages';
import { getPersonData, Person, postPersonData } from '../persons';
import { Character, User, UserId } from '../types';

export interface CharacterData {
  sex: string;
}

interface PersonResponse {
  error?: string;
  data?: {
    person: Person | null,
  },
}
  
interface ProcessedEvents {
  lastEventId: EventId | undefined,
  messages: string[],
  rdes: number,
  tdes: number,
  vdes: number,
}
  
export interface UserModelInterface {
  getData: () => User,
  initializeUser: () => Promise<void>,
  getPersonData: () => Promise<Person | null>,
  postPersonData: (data: CharacterData) => Promise<Person | null>,
  goToChannel: (channelId: number) => Promise<void>,
  processEvents: () => Promise<ProcessedEvents>,
  save: (user: User) => Promise<User>,
  updateEventId: (eventId?: EventId) => Promise<User | null>,
};
  
// Helpers

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
};

const UserModel = (user: User): UserModelInterface => {
  const values = user;

  const getData = () => values;

  const save = (data: User) => setUser(data.userId, data);

  const updateEventId = async (eventId?: EventId): Promise<User | null> => {
    values.eventId = eventId;

    if (!eventId) {
      return save(values);
    }
          
    const lastUpdate = values.lastUpdate || 0;
          
    const newEvents = (eventId < lastUpdate)
      ? (eventId - lastUpdate)
      : (lastUpdate - eventId);
          
    if (newEvents < 10) {
      return save(values);
    }
          
    const char: Character = user?.character || {};
    saveCharacter(user.characterId, {
      ...char,
      eventId,
    });


    values.lastUpdate = lastUpdate;
    return save(values);  
  };
  
  const initializeUser = async () => {
    // syslog("GAME ENTRY: %s[%s]",globme,cuserid(NULL));
    console.log(`GAME ENTRY: ${values.name}[${values.userId}]`);

    await addMessagesUser(values.userId);

    await processEvents();
  };

  const loadPersonData = async () => {
    const response = await getPersonData({
      params: {
        name: values.name,
      },
      data: {},
    });

    const person = getPersonFromResponse(response);
    values.isSaved = !!person;
    return person;
  };

  const savePersonData = async (data: CharacterData) => {
    const response = await postPersonData({
      params: {
        name: values.name,
      },
      data,
    });

    const person = getPersonFromResponse(response);
    values.isSaved = !!person;
    return person;
  };

  const processEvents = async () => {
    const eventId = user?.eventId;
    
    let lastEventId: number | undefined;
    let messages: string[] = [];
    if (eventId) {
      const eventData = await Events.processEvents(user?.eventId);
      lastEventId = eventData?.lastEventId;

      const events = eventData?.events || [];
      messages = await Promise.all(events.map(processEvent(user)));
    } else {
      const eventData = await Events.getEventid();
      lastEventId = eventData?.lastEventId;
    }

    await updateEventId(lastEventId);

    // eorte();

    return {
      lastEventId,
      messages,
      rdes: 0,
      tdes: 0,
      vdes: 0,  
    };
  };

  return {
    getData,
    initializeUser,
    getPersonData: loadPersonData,
    postPersonData: savePersonData,
    goToChannel: async(channelId: number) => {
        await saveCharacter(user.characterId, {
        ...user.character,
        channelId,
        });
        
        console.log(channelId);
        // lookin(chan);  
    },
    processEvents,
    save,
    updateEventId,
  }
};
  
export default UserModel;

export const loadUser = async (userId: UserId) => {
  const user = await getUser(userId);
  return UserModel(user);
};

export const newUser = async (character: Character) => {
  const user: User = {
    userId: 'NEW_USER_ID',
    mode: '',
    name: character.name,
    characterId: character.characterId || 0,
    debugMode: true,
    
    channelId: 0,
    eventId: undefined,
    
    isSaved: false,
    character,
  };
  return UserModel(user);
};
  