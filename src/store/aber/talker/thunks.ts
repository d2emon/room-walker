import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    setInSetup,
    setName,
    TalkerAction,
} from './actions';
import {CONVERSATION_MODE_ACTION, CONVERSATION_MODE_SAY, CONVERSATION_MODE_TSS, MODE_1} from "./reducer";
import {Store} from '../../reducers';
import {setErrorMessage} from "../errors/actions";
import {
    forcedEvents,
    resetEvents,
    EventsAction,
} from '../events/actions';
import {processEvents} from '../events/thunks';

// Types
type Dispatch<A extends Action> = ThunkDispatch<TalkerAction, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const makebfr = () => Promise.resolve();
const openworld = () => Promise.resolve();
const pbfr = () => Promise.resolve();
const findUserByName = (name: string): Promise<any> => Promise.resolve(null);

const setFromKeyboard = (work: string) => Promise.resolve(`[l]${work}[/l]`);

const special = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
    action: string,
) => {
    const start = (name: string) => Promise.resolve()
        .then(() => {
            // mode = MODE_1;
            // channelId = 5;
            // initme();
        })
        .then(openworld)
        .then(() => {
            // setpstr(userId, myStr);
            // setplev(userId, myLev);
            // setpvis(userId, (myLev < 10000) ? 0 : 10000);
            // setpwpn(userId, undefined);
            // setpsexall(userId, mySex);
            // setphelping(userId, undefined);
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
        .then(() => processEvents(dispatch, name))
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
        });

    if (!action) {
        return Promise.resolve();
    }
    if (action[0] !== '.') {
        return Promise.resolve();
    }

    const code = action.substr(1).toLowerCase();
    if (code === 'g') {
        return start(getState().talker.name);
    } else {
        return Promise.reject(new Error('Unknown . option'));
    }
};

const onInput = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => {
    const prepareInput = (action: string): Promise<string> => new Promise((resolve) => {
        const {
            conversationMode,
        } = getState().talker;
        if (!action) {
            return resolve('');
        }
        if ((conversationMode !== CONVERSATION_MODE_ACTION) && action === '**') {
            // conversationMode = CONVERSATION_MODE_ACTION;
        }
        if ((action !== '*') && (action[0] === '*')) {
            return resolve(action.substr(1));
        }
        if (conversationMode === CONVERSATION_MODE_SAY) {
            return resolve(`say ${action}`);
        } else if (conversationMode === CONVERSATION_MODE_TSS) {
            return resolve(`tss ${action}`);
        } else {
            return resolve(action);
        }
    });
    const performAction = (action: string) => {
        if (getState().talker.mode === MODE_1) {
            // gamecom(action);
            return Promise.resolve();
        } else if (action && (action.toLowerCase() !== '.q')) {
            return special(dispatch, getState, action);
        } else {
            return Promise.resolve();
        }
    };
    return prepareInput(getState().talker.keyBuff)
        .then(performAction)
        .then(() => {
            /*
            if (fighting) {
                if (!pname(fighting) || (ploc(fighting) !== channelId)) {
                    inFight = 0;
                    fighting = null;
                }
            }
             */
        })
        .then(() => {
            /*
            if (inFight) {
                inFight -= 1;
            }
             */
        });
};

const addUser = (
    dispatch: Dispatch<TalkerAction | EventsAction>,
    name: string,
) => Promise.resolve()
    .then(openworld)
    .then(() => findUserByName(name))
    .then(user => user && Promise.reject(new Error('You are already on the system - you may only be on once at a time')))
    .then(() => {
        const users: number[] = [];
        /*
        for (let userId = 0; userId < MAX_USER_ID; userId += 1) {
            if (!pname(userId)) {
                users.push(userId);
            }
        }
         */
        return users;
    })
    .then(users => users.length ? users[0] : Promise.reject(new Error('Sorry system is full at the moment')))
    .then((userId) => {
        // setpname(userId, name);
        // setploc(userId, channelId);
        // setppos(userId, undefined);
        // setplev(userId, 1);
        // setpvis(userId, 0);
        // setpstr(userId, -1);
        // setpwpn(userId, undefined);
        // setpsex(userId, 0);
        // setUserId(userId);
    })
    .then(() => dispatch(resetEvents()))
    .then(() => dispatch(setName(name)));

export const onWait = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => processEvents(dispatch, getState().talker.name, getState().events.eventId, true)
    .then(() => {
        // onTiming()
    });

export const beforeStart = (name: string): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction | EventsAction>,
    getState: () => Store,
) => makebfr()
    .then(() => addUser(dispatch, name))
    .then(() => processEvents(dispatch, getState().talker.name))
    .then(() => special(dispatch, getState, '.g'))
    .then(() => dispatch(setInSetup()))
    .catch(e => setErrorMessage(e));

export const nextTurn = (): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction | EventsAction>,
    getState: () => Store,
) => Promise.resolve(getState().talker.keyBuff)
    .then(setFromKeyboard)
    .then(() => processEvents(dispatch, getState().talker.name, getState().events.eventId))
    .then(() => onInput(dispatch, getState))
    .then(() => getState().events.forceEvents
        ? processEvents(dispatch, getState().talker.name, getState().events.eventId)
        : undefined
    )
    .then(() => dispatch(forcedEvents()))
    .then(pbfr);
