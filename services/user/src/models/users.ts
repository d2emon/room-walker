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

interface ChannelData {
    text: string,
    messages: string[],
    dead: boolean,
    exitMessage: string,
    listContents: boolean,
}

export interface User {
    userId: number,
    mode: ActionMode,
    characterId: number,
    character: Character,
    lastUpdate?: number,
    //
    isBlind: boolean,
    briefMode: boolean,
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

const afterLook = (data: ChannelData): Promise<ChannelData> => Promise.resolve()
    .then(() => {
        // bprintf(data.text);
    })
    .then(() => {
        /*
                if(data.listContent && !ail_blind)
                {
                    lisobs();
                    if (getState().talker.actionMode === MODE_ACTION) {
                        lispeople();
                    }
                }
                bprintf("\n");
                onlook();
         */
    })
    .then(() => data);

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
        isBlind: false,
        briefMode: false,
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
const showChannel = (user: User, channelId: number, briefMode: boolean) => Promise.resolve()
    .then(() => {
        /*
        if (user.level > 9) {
            showname(channelId);
        }
         */
        /*
        // return openroom(channelId,"r");
        return {
            channelId,
            deathRoom: false,
            noBrief: false,
            title: '',
            content: '',
            isDark: isdark(),
        };
         */
        return {
            channelId,
            deathRoom: false,
            noBrief: false,
            title: '',
            content: `You are on channel ${channelId}\n`,
            isDark: false,
        };
    })
    .then((channel) => {
        const brief = briefMode && !channel.noBrief;
        const data: ChannelData = {
            text: '',
            messages: [''],
            dead: false,
            exitMessage: '',
            listContents: true,
        };
        if (user.isBlind) {
            data.messages.push('You are blind... you can\'t see a thing!\n');
        }
        // lodex(channel);
        if (channel.deathRoom) {
            /*
            if (my_lev > 9) {
                data.messages.push('<DEATH ROOM>\n');
            } else {
                data.dead = true;
                data.exitMessage = 'bye bye.....\n';
            }
             */
        }
        if (channel.isDark) {
            data.text = 'It is dark\n';
            data.listContents = false;
        } else {
            data.text = (channel.deathRoom || !user.isBlind)
                ? `${channel.title}\n${brief ? '' : channel.content}\n`
                : '';
        }
        return afterLook(data);
    });
export const changeChannel = (user: User, channelId: number): Promise<ChannelData> => Promise.resolve()
    .then(() => updateCharacter(user.characterId, {
        ...user.character,
        channelId,
    }))
    .then(() => showChannel(user, channelId, user.briefMode));
