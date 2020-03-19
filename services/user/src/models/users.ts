import axios from 'axios';
import config from '../config';
import {
    ActionMode,
    MODE_SPECIAL,
} from './modes';

export interface Character {
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
    userId: number,
    mode: ActionMode,
    characterId: number,
    character: Character,
    lastUpdate?: number,
}

interface UserData {
    records: User[],
}

const DATA: UserData = {
    records: [],
};

const makebfr = (): Promise<void> => Promise.resolve();
const getCharacter = (characterId: number): Promise<Character> => Promise.resolve({
    characterId,
    name: '',
    channelId: 0,
    eventId: undefined,
    level: 0,
    visibility: 0,
    strength: 0,
    weapon: undefined,
    sex: 0,
    helping: undefined,
});
const updateCharacter = (characterId: number, character: Character): Promise<void> => Promise.resolve();

const createUser = (name: string, channelId: number): Promise<Character> => axios.post(
    config.worldUrl,
    {
        name,
        channelId,
    },
)
    .then(response => response.data)
    .then(data => data.character);

export const getUsers = (): Promise<User[]> => Promise.resolve([...DATA.records]);
export const getUser = (userId: number): Promise<User> => Promise.resolve(
    DATA.records.find(user => user.userId === userId)
);
export const addUser = (userId: number, name: string): Promise<User> => axios.post(
    config.logUrl,
    {
        message: `MUD ENTRY: ${name}[${userId}]`,
    },
)
    .then(makebfr)
    .then(() => createUser(name, 5))
    .then((character): User => ({
        userId,
        characterId: character.characterId,
        character,
        mode: MODE_SPECIAL,
    }))
    .then((user) => {
        DATA.records.push(user);
        return user;
    });
export const updateUser = (user: User, eventId: number): Promise<void> => {
    const lastUpdate = user.lastUpdate || 0;
    if (Math.abs(eventId - lastUpdate) < 10) {
        return Promise.resolve();
    }
    user.lastUpdate = eventId;
    return updateCharacter(user.characterId, {
        ...user.character,
        eventId,
    });
};
export const fadeUser = (user: User): Promise<void> => updateUser(user, -2);
