import axios from 'axios';
import config from '../config';
import {setLoggedIn, setMode, TalkerAction} from "../../../../src/store/aber/talker/actions";
import {EventsAction} from "../../../../src/store/aber/events/actions";
import {Store} from "../../../../src/store/reducers";
import {processEvents} from "../../../../src/store/aber/events/thunks";
import {setErrorMessage} from "../../../../src/store/aber/errors/actions";
import {TalkerThunkAction} from "../../../../src/store/aber/talker/thunks";

export const MODE_SPECIAL = 'MODE_SPECIAL';
export const MODE_ACTION = 'MODE_ACTION';

export type ActionMode = typeof MODE_SPECIAL | typeof MODE_ACTION;

interface User {
    userId: number,
    name: string,
    mode: ActionMode,
    channelId: number,
}

interface UserData {
    records: User[],
}

interface Character {
    userId: number,
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

const DATA: UserData = {
    records: [],
};

const MAX_USER_ID = 16;

const makebfr = (): Promise<void> => Promise.resolve();
const findUserByName = (name: string): Promise<any> => Promise.resolve(null);
const getUser = (userId: number): Character => ({
    userId,
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

const start = (user: User) => Promise.resolve()
    .then(() => {
        user.mode = MODE_ACTION;
        user.channelId = 5;
        // initme();
    })
    .then(() => {
        const myLev = 0;
        const myStr = 0;
        const mySex = 0;
        const character: Character = {
            userId: user.userId,
            name: user.name,
            channelId: 5,
            // eventId: undefined,
            level: myLev,
            visibility: (myLev < 10000) ? 0 : 10000,
            strength: myStr,
            weapon: undefined,
            sex: mySex,
            // sexAll: mySex,
            helping: undefined,
        }
        /*
        sendsys(
            name,
            name,
            -10113,
            channelId,
            ifSeePlayer(name, `[ ${name}  has entered the game ]\n`),
        );
         */
    })
    // .then(() => processEvents(dispatch, name))
    .then(() => {
        // channelId = (randperc() > 50) ? -5 : -183;
        // trapch(channelId);
        /*
        sendsys(
            name,
            name,
            -10000,
            channelId,
            ifSeePlayer(name, `${name}  has entered the game\n`),
        );
         */
    })
    // .then(() => dispatch(setLoggedIn()))
    .then(() => null);

const createUser = (name: string): Promise<void> => findUserByName(name)
    .then(user => user && Promise.reject(new Error('You are already on the system - you may only be on once at a time')))
    .then(() => {
        const users: Character[] = [];
        for (let userId = 0; userId < MAX_USER_ID; userId += 1) {
            const user = getUser(userId);
            if (!user.name) {
                users.push(user);
            }
        }
        return users;
    })
    .then(users => users.length ? users[0] : Promise.reject(new Error('Sorry system is full at the moment')))
    .then((user) => {
        user.name = name;
        user.channelId = 0; // channelId;
        user.eventId = undefined;
        user.level = 1;
        user.visibility = 0;
        user.strength = -1;
        user.weapon = undefined;
        user.sex = 0;
        // setUserId(userId);
    });

export const getUsers = (): Promise<User[]> => Promise.resolve([...DATA.records]);
export const addUser = (userId: number, name: string): Promise<boolean> => axios.post(
    config.logUrl,
    {
        message: `MUD ENTRY: ${name}[${userId}]`,
    },
)
    .then((): User => ({
        userId,
        name,
        channelId: 5,
        mode: MODE_SPECIAL,
    }))
    .then(user => DATA.records.push(user))
    .then(makebfr)
    .then(() => createUser(name))
    .then(() => true);
