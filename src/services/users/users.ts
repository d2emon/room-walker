import { Event, EventId } from '../events/types';
import { addNewCharacter } from './characters';
import { Person } from './persons';
import {
  Character,
  User,
  UserId,
} from './types';
import mockQueryDecorator, { MockQuery } from '../mock';
import { loadUser, newUser } from './models/UserModel';
import { noAction, startGame } from './actions';

interface UserRequestParams {
  userId: UserId,
}

// GetUser

interface GetUserRequestParams {    
  userId: UserId;
}

type GetUserRequest = MockQuery<GetUserRequestParams, any>;

interface GetUserResponse {
  user: User | null,
}

// AddUser

interface AddUserRequestData {    
  name: string;
}

type AddUserRequest = MockQuery<any, AddUserRequestData>;

interface AddUserResponse {
  user: User,
  eventId?: EventId,
  error?: string;
}

// NewCharacter

export interface NewCharacterData {
  sex: string;
};
export type NewCharacterRequest = MockQuery<UserRequestParams, NewCharacterData>;

// PostUserAction

interface PostUserActionRequestData {    
  action: string;
}
    
type PostUserActionRequest = MockQuery<UserRequestParams, PostUserActionRequestData>;

type PostUserActionResponse = any;

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
        
// Handlers

/*
export const getUser = mockQueryDecorator<
  GetUserRequest,
  GetUserResponse
> ('GET http://127.0.0.1:4001/user/:userId/', async (query): Promise<GetUserResponse> => {
  const {
    params: {
      userId,
    },
  } = query;

  const model = await loadUser(userId);
  const user = model ? model.getData() : null;

  return {
    user,
  };
});
*/

/*
export const postUser = mockQueryDecorator<
  AddUserRequest,
  AddUserResponse
> ('POST http://127.0.0.1:4001/user/:userId', async (query): Promise<AddUserResponse> =>  {
  const {
    data: {
      name,
    },
    params: {
      userId,
    },
  } = query;

  const character = await addNewCharacter(name);
  const model = await newUser(userId, character);

  const processed = await model.processEvents();
  console.log(processed);

  await model.loadPersonData();
  const user = await model.save();
  console.log(user.person);
  return {
    user,
  };
});
*/

interface UsersQueryParams {
  token: UserId;
};
interface UsersQueryData {
  name: string;
};
interface UserResponseData {
  user: User | null;
};

export const API_URL = 'http://127.0.0.1:4000/api/v1.0/user/';

const postNewUserHandler = mockQueryDecorator<
  MockQuery<UsersQueryParams, UsersQueryData>,
  UserResponseData
> ('POST', API_URL, async (query) => {
  const userId = crypto.randomUUID();
  const character: Character = {
    channelId: -1,
    level: -1,
    name: query?.data?.name,
    sex: -1,
    strength: -1,
    visibility: -1,
  };
  const model = await newUser(userId, character);

  if (!model) {
    throw new Error('No user!');
  }

  const user = await model.save();

  return {
    user,
  };
});

export const postNewUser = (token: UserId, name: string) => postNewUserHandler({
  data: {
    name,
  },
  params: {
    token,
  },
});

const postNewCharacterHandler = (userId: UserId) => mockQueryDecorator<
  NewCharacterRequest,
  AddUserResponse
> ('POST', `${API_URL}${userId}/character`, async (query): Promise<AddUserResponse> =>  {
  const {
    data: {
      sex,
    },
  } = query;

  const model = await loadUser(userId);

  if (!model) {
    throw new Error('No user!');
  }

  await model.savePersonData({
    sex,
  });
  const user = await model.save();
  return {
    user,
  };
});

export const postNewCharacter = (userId: UserId, data: NewCharacterData) => postNewCharacterHandler(userId)({
  data,
  params: {
    userId,
  },
});

export const postUserAction = mockQueryDecorator<
  PostUserActionRequest,
  PostUserActionResponse
> ('POST', 'http://127.0.0.1:4001/user/:userId/action/', async (query): Promise<PostUserActionResponse> => {
  const {
    data: {
      action,
    },
    params: {
      userId,
    },
  } = query;

  const model = await loadUser(userId);

  if (!model) {
    throw new Error('No user!');
  }

  if (action[0] !== '.') {
    return noAction();
  }

  if (action[1].toLowerCase() === 'g') {
    return startGame(model);
  }

  throw new Error('Unknown . option');
});

export const postUserEvents = mockQueryDecorator<
  PostUserEventsRequest,
  PostUserEventsResponse
> ('POST', 'http://127.0.0.1:4001/user/:userId/events/', async (query): Promise<PostUserEventsResponse> =>  {
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

  const model = await loadUser(userId);
 
  if (!model) {
    throw new Error('No user!');
  }

  return model.processEvents();
});

export const postUserEvent = mockQueryDecorator<
  PostUserEventRequest,
  PostUserEventResponse
> ('POST', 'http://127.0.0.1:4001/user/event', async (): Promise<PostUserEventResponse> => {
  return {
    data: {},
  };
});

/*
  lookin(room)
  long room; *//* Lords ???? *//*
     {
     extern char globme[];
     FILE *un1,un2;
     char str[128];
     long xxx;
     extern long brmode;
     extern long curmode;
     extern long ail_blind;
     long ct;
     extern long my_lev;
     closeworld();
     if(ail_blind)
     {
         bprintf("You are blind... you can't see a thing!\n");
     }
     if(my_lev>9) showname(room);
     un1=openroom(room,"r");
     if (un1!=NULL)
     {
 xx1:   xxx=0;
        lodex(un1);
            if(isdark())
            {
                   fclose(un1);
                   bprintf("It is dark\n");
                         openworld();
                   onlook();
                   return;
               }
        while(getstr(un1,str)!=0)
           {
           if(!strcmp(str,"#DIE"))
              {
              if(ail_blind) {rewind(un1);ail_blind=0;goto xx1;}
              if(my_lev>9)bprintf("<DEATH ROOM>\n");
              else
                 {
                 loseme(globme);
                 crapup("bye bye.....\n");
                 }
              }
           else
 {
 if(!strcmp(str,"#NOBR")) brmode=0;
 else
              if((!ail_blind)&&(!xxx))bprintf("%s\n",str);
           xxx=brmode;
 }
           }
        }
     else
        bprintf("\nYou are on channel %d\n",room);
     fclose(un1);
     openworld();
     if(!ail_blind)
     {
         lisobs();
         if(curmode==1) lispeople();
     }
     bprintf("\n");
     onlook();
     }
*/
