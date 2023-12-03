import axios from "axios";
import {Event} from './events';

export interface UserData {
    userId: string,
    name: string,
}

interface Character {
    characterId?: number,
    name: string,
    channelId: number,
    eventId?: number,
    level: number,
    visibility: number,
    strength: number,
    weapon?: number,
    sex: number,
    helping?: number,
}

export interface User {
    userId: string,
    mode: string,
    characterId: number,
    character: Character,
}

const sendEvent = (event: Event) => Promise.resolve({ data: {} })
/*
axios.post(
    'http://127.0.0.1:4001/event',
    {
        event,
    },
)
*/
    .then(response => response.data)
    .then(data => data);

export default {
    // makebfr();
    // cms = -1;
    // putmeon(name);
    // if (mynum>=maxu) {printf("\nSorry AberMUD is full at the moment\n");return(0);}
    setUser: (user: UserData): Promise<User> => Promise.resolve({ data: {
        user: {
            userId: user.userId,
            mode: '',
            characterId: 0,
            character: {
                name: user.name,
                channelId: 0,
                level: 0,
                visibility: 0,
                strength: 0,
                sex: 0,
            },
        
        },
    } })
    /*
    axios.post(
        'http://127.0.0.1:4001/user',
        user,
    )
    */
        .then(response => response.data)
        .then(data => data.user),
    // cms = -1;
    // special('.q', name);
    perform: (userId: string, action: string): Promise<any> => Promise.resolve({ data: {} })
    /*
    axios.post(
        'http://127.0.0.1:4001/action',
        {
            userId,
            action,
        },
    )
    */
        .then(response => response.data)
        .then(data => data),
  // openworld();
  // rte(name);
  // closeworld();
  processEvents: (userId: string, eventId?: number, force?: boolean): Promise<any> => Promise.resolve({ data: {} })
    /*
    axios.post(
        'http://127.0.0.1:4001/events',
        {
            userId,
            eventId,
            force,
        },
    )
    */
        .then(response => response.data)
        .then(data => data),
    sendEvent,
    broadcast: (message: string) => sendEvent({
        code: -1,
        payload: message,
    })
        // .then(() => dispatch(forceEvents))
        .catch(() => {
            // logOut();
            // setErrorMessage(null, 'AberMUD: FILE_ACCESS : Access failed');
        }),
}
