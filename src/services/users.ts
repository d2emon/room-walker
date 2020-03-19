import axios from "axios";
import {ActionMode} from "../../services/user/src/models/users";

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
    mode: ActionMode,
    characterId: number,
    character: Character,
}

export default {
    setUser: (user: UserData): Promise<User> => axios.post(
        'http://127.0.0.1:4001/user',
        user,
    )
        .then(response => response.data)
        .then(data => data.user),
    perform: (userId: string, action: string): Promise<any> => axios.post(
        'http://127.0.0.1:4001/',
        {
            userId,
            action,
        },
    )
        .then(response => response.data)
        .then(data => data),
}
