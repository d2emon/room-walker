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

const sendEvent = (event: Event) => axios.post(
    'http://127.0.0.1:4001/event',
    {
        event,
    },
)
    .then(response => response.data)
    .then(data => data);

export default {
    setUser: (user: UserData): Promise<User> => axios.post(
        'http://127.0.0.1:4001/user',
        user,
    )
        .then(response => response.data)
        .then(data => data.user),
    perform: (userId: string, action: string): Promise<any> => axios.post(
        'http://127.0.0.1:4001/action',
        {
            userId,
            action,
        },
    )
        .then(response => response.data)
        .then(data => data),
    processEvents: (userId: string, eventId?: number, force?: boolean): Promise<any> => axios.post(
        'http://127.0.0.1:4001/events',
        {
            userId,
            eventId,
            force,
        },
    )
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
            // setErrorMessage('AberMUD: FILE_ACCESS : Access failed');
        }),
}
