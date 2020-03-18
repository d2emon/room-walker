import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    setLoggedIn,
    setMode,
    setName,
    TalkerAction,
} from './actions';
import {
    ActionMode,
    CONVERSATION_MODE_ACTION,
    CONVERSATION_MODE_SAY,
    CONVERSATION_MODE_TSS,
    MODE_ACTION,
    MODE_SPECIAL
} from './modes';
import {Store} from '../../reducers';
import {setErrorMessage} from '../errors/actions';
import {
    EventsAction,
    forcedEvents,
} from '../events/actions';
import {processEvents} from '../events/thunks';

// Types
type Dispatch<A extends Action> = ThunkDispatch<TalkerAction, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const openworld = () => Promise.resolve();
const pbfr = () => Promise.resolve();
const findUserByName = (name: string): Promise<any> => Promise.resolve(null);

const setFromKeyboard = (work: string) => Promise.resolve(`[l]${work}[/l]`);

const gamecom = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
    action: string,
) => {};

const special = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
    action: string,
) => {
    const start = (name: string) => Promise.resolve()
        .then(() => {
            dispatch(setMode(MODE_ACTION));
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
        })
        .then(() => dispatch(setLoggedIn()))
        .then(() => null);

    if (!action) {
        return Promise.resolve();
    }
    if (action.toLowerCase() === '.q') {
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

const performAction = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
    action: string,
    mode: ActionMode,
) => {
    if (!action) {
        return Promise.resolve();
    } else if (mode === MODE_ACTION) {
        return gamecom(dispatch, getState, action);
    } else if (mode === MODE_SPECIAL) {
        return special(dispatch, getState, action);
    } else {
        return Promise.resolve();
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
    return prepareInput(getState().talker.keyBuff)
        .then(action => performAction(dispatch, getState, action, getState().talker.actionMode))
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
) => Promise.resolve()
    .then(() => {
        // setUserId(userId);
        dispatch(setName(name));
    })
    .then(() => processEvents(dispatch, getState().talker.name))
    .then(() => performAction(dispatch, getState, '.g', getState().talker.actionMode))
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
