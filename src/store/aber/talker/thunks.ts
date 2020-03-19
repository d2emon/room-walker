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
import {
    EventsAction,
    forcedEvents,
} from '../events/actions';
import {Store} from '../../reducers';
import Users from '../../../services/users';

// Types
type Dispatch<A extends Action> = ThunkDispatch<TalkerAction, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const openworld = () => Promise.resolve();
const closeworld = () => Promise.resolve();
const pbfr = () => Promise.resolve();
const saveme = () => Promise.resolve();
const chksnp = () => Promise.resolve();
const onTiming = () => Promise.resolve();

const setFromKeyboard = (work: string) => Promise.resolve(`[l]${work}[/l]`);

const onInput = (
    dispatch: Dispatch<TalkerAction | EventsAction>,
    getState: () => Store,
    userId: string,
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
    const performAction = (action: string) => Users.perform(userId, action);
    const updateEnemy = (): Promise<void> => Promise.resolve({
        characterId: getState().talker.enemyId,
        name: '',
        channelId: 0,
    })
        .then((enemy) => enemy && enemy.name && (enemy.channelId === getState().talker.channelId))
        .then((canFight) => {
            if (canFight) {
                return;
            }
            // setEnemyId(undefined);
            // setFightingCounter(undefined);
        });
    const tickFight = (): Promise<void> => new Promise((resolve) => {
        if (!getState().talker.fightingCounter) {
            return resolve();
        }
        // setFightingCounter(getState().talker.fightingCounter - 1);
    });
    const afterInput = (): Promise<void> => (getState().events.forceEvents
        ? Users.processEvents(userId, getState().events.eventId)
            .then(() => dispatch(forcedEvents()))
            .then(() => undefined)
        : Promise.resolve()
    );

    return prepareInput(getState().talker.keyBuff)
        .then(performAction)
        .then(updateEnemy)
        .then(tickFight)
        .then(afterInput)
        .then(pbfr);
};

export const finishUser = (getState: () => Store) => Promise.resolve()
    .then(openworld)
    .then(() => getState().talker.name)
    .then(name => Promise.all([
        // dumpitems(),
        getState().talker.isFullyInvisible && Users.sendEvent({
            sender: name,
            receiver: name,
            code: -10113,
            channelId: 0,
            payload: `${name} has departed\n`,
        }),
        // setpname(userId, ''),
    ]))
    .then(closeworld)
    .then(() => Promise.all([
        // zapped || saveme(),
        chksnp(),
    ]));

const updateUser = (userId: string, eventId: number): Promise<void> => Promise.resolve(0)
    // getState().events.eventId;
    // getState().events.lastUpdate;
    .then(lastUpdate => Math.abs(eventId - lastUpdate) < 10)
    .then(update => update && Promise.resolve()
        .then(() => {
            // openworld()
        })
        .then(() => {
            // setppos(userId, eventId);
            // setLastUpdate(eventId);
        })
        .then(() => null)
    )
    .then(() => undefined);

export const onWait = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
    userId: string,
) => Users.processEvents(userId, getState().events.eventId, true)
    .then(onTiming);

export const nextTurn = (): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction | EventsAction>,
    getState: () => Store,
) => Promise.resolve(getState().talker.keyBuff)
    .then(setFromKeyboard)
    .then(() => Users.processEvents(getState().mainWindow.userId, getState().events.eventId))
    .then(() => onInput(dispatch, getState, getState().mainWindow.userId));
