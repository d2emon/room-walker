import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    TalkerAction,
} from './actions';
import {
    CONVERSATION_MODE_ACTION,
    CONVERSATION_MODE_SAY,
    CONVERSATION_MODE_TSS,
} from './modes';
import {Store} from '../../reducers';
import {
    EventsAction,
    forcedEvents,
} from '../events/actions';
import {processEvents} from '../events/thunks';
import {performAction} from './perform';

// Types
type Dispatch<A extends Action> = ThunkDispatch<TalkerAction, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const pbfr = () => Promise.resolve();

const setFromKeyboard = (work: string) => Promise.resolve(`[l]${work}[/l]`);

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
        .then(performAction(getState().mainWindow.userId))
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
