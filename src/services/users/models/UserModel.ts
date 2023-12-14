import * as Events from 'services/events';
import { EventId, Event } from 'services/events/types';
import { getUser, setUser } from './storage';
import { saveCharacter } from '../characters';
import { sendAdminMessage, sendGlobalMessage } from '../events';
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
  goToChannel: (channelId: number) => Promise<void>,
  processEvents: () => Promise<ProcessedEvents>,
  save: () => Promise<User>,
  updateEventId: (eventId?: EventId) => Promise<User | null>,
  startGame: () => Promise<void>,
  // PersonData
  loadPersonData: () => Promise<Person | null>,
  savePersonData: (data: CharacterData) => Promise<Person | null>,
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

  const save = () => setUser(values.userId, values);

  const updateEventId = async (eventId?: EventId): Promise<User | null> => {
    values.eventId = eventId;

    if (!eventId) {
      return save();
    }
          
    const lastUpdate = values.lastUpdate || 0;
          
    const newEvents = (eventId < lastUpdate)
      ? (eventId - lastUpdate)
      : (lastUpdate - eventId);
          
    if (newEvents < 10) {
      return save();
    }
          
    const char: Character = user?.character || {};
    saveCharacter(user.characterId, {
      ...char,
      eventId,
    });


    values.lastUpdate = lastUpdate;
    return save();  
  };
  
  const loadPersonData = async () => {
    const response = await getPersonData({
      params: {
        name: values.name,
      },
      data: {},
    });

    const person = getPersonFromResponse(response);

    values.person = person;
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

    values.person = person;
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

  const goToChannel = async (channelId: number) => {
    await saveCharacter(user.characterId, {
      ...user.character,
      channelId,
    });

    console.log(channelId);
    // lookin(chan);
  };

  const startGame = async () => {
    const person = values.person;

    if (!person) {
      return;
    }

    sendAdminMessage(values, `[s name="${values?.name}"][ ${values?.name}  has entered the game ]\n[/s]`);

    const {
      level,
      // score,
      sex,
      strength,
    } = person;
    const visibility = (level < 10000) ? 0 : 10000;
    const channelId = (Math.floor(Math.random() % 100) > 50) ? -5 : -183; 

    const character: Character = {
      ...user?.character,
      // From person
      level,
      sex,
      strength,
      visibility,
      // Other
      helping: -1,
      weapon: -1,
    };
    
    values.character = character;
    values.channelId = channelId;
    values.eventId = undefined;
    values.mode = '1';

    await processEvents();

    await goToChannel(channelId);

    sendGlobalMessage(values, values.channelId, `[s name="${values.name}"]${values.name}  has entered the game\n[/s]`);
  };

  return {
    getData,
    loadPersonData,
    savePersonData,
    goToChannel,
    processEvents,
    save,
    updateEventId,
    startGame,
  }
};
  
export default UserModel;

export const loadUser = async (userId: UserId) => {
  const user = await getUser(userId);

  if (!user) {
    return user;
  }

  const model = UserModel(user);

  await model.loadPersonData();

  return model;
};

export const newUser = async (userId: UserId, character: Character) => {
  const user: User = {
    userId,
    mode: '',
    name: character.name,
    characterId: character.characterId || 0,
    debugMode: true,
    
    channelId: 0,
    eventId: undefined,
    
    isSaved: false,
    character,
    person: null,
  };
  console.log(user);

  // syslog("GAME ENTRY: %s[%s]",globme,cuserid(NULL));
  console.log(`GAME ENTRY: ${user.name}[${userId}]`);

  await addMessagesUser(userId);

  return UserModel(user);
};
  