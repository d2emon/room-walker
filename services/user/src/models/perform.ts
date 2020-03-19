import {
    MODE_ACTION,
    MODE_SPECIAL,
} from './modes';
import {
    Character,
    User,
} from './users';

const initme = () => Promise.resolve({
    level: 0, // myLev
    strength: 0, // myStr
    sex: 0, // mySex
    // flags: [], // mySex
});

const start = (user: User) => Promise.resolve()
    .then(() => {
        user.mode = MODE_ACTION;
        user.character.channelId = 5;
    })
    .then(initme)
    .then((data): Character => ({
        characterId: user.characterId,
        name: user.character.name,
        channelId: 5,
        // eventId: undefined,
        level: data.level,
        visibility: (data.level < 10000) ? 0 : 10000,
        strength: data.strength,
        weapon: undefined,
        sex: data.sex,
        // flags: data.flags,
        helping: undefined,
    }))
    .then(() => {
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
    })
    .then(() => {
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

const gamecom = (user: User, action: string) => {};

const special = (user: User, action: string) => {
    if (!action.startsWith('.')) {
        return Promise.resolve();
    }

    const code = action.substr(1).toLowerCase();
    if (code === 'q') {
        return Promise.resolve();
    } else if (code === 'g') {
        return start(user);
    } else {
        return Promise.reject(new Error('Unknown . option'));
    }
};

export const performAction = (user: User, action: string) => {
    if (!action) {
        return Promise.resolve();
    } else if (user.mode === MODE_ACTION) {
        return gamecom(user, action);
    } else if (user.mode === MODE_SPECIAL) {
        return special(user, action);
    } else {
        return Promise.resolve();
    }
};
