import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    forcedEvents,
    resetEvents,
    setEventId,
    setInSetup,
    setName,
    TalkerAction,
} from './actions';
import {Store} from '../../reducers';
import Events, {Event} from '../../../services/events';
import {setErrorMessage} from "../errors/actions";
import {CONVERSATION_MODE_ACTION, CONVERSATION_MODE_SAY, CONVERSATION_MODE_TSS, MODE_1} from "./reducer";

// Types
type Dispatch<A extends Action> = ThunkDispatch<TalkerAction, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const makebfr = () => Promise.resolve();
const pbfr = () => Promise.resolve();
const closeworld = () => Promise.resolve();

const setFromKeyboard = (work: string) => Promise.resolve(`[l]${work}[/l]`);

const onInput = (
    getState: () => Store,
) => {
    const prepareInput = () => {
        const {
            keyBuff,
            conversationMode,
        } = getState().talker;
        if (!keyBuff) {
            return '';
        }
        if ((conversationMode !== CONVERSATION_MODE_ACTION) && keyBuff === '**') {
            // conversationMode = CONVERSATION_MODE_ACTION;
        }
        if ((keyBuff !== '*') && (keyBuff[0] === '*')) {
            return keyBuff.substr(1);
        }

        if (conversationMode === CONVERSATION_MODE_SAY) {
            return `say ${keyBuff}`;
        } else if (conversationMode === CONVERSATION_MODE_TSS) {
            return `tss ${keyBuff}`;
        } else {
            return keyBuff;
        }
    };
    const performAction = (action: string) => {
        if (getState().talker.mode === MODE_1) {
            // gamecom(action);
            return Promise.resolve();
        } else if (action && (action.toLowerCase() !== '.q')) {
            // special(work, name);
            return Promise.resolve();
        } else {
            return Promise.resolve();
        }
    };
    return Promise.resolve(prepareInput())
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

const addUser = (name: string) => Promise.resolve()
    .then(() => {
        // openworld();
    })
    .then(() => {
        /*
    if(fpbn(name)!= -1)
       {
       throw new Error("You are already on the system - you may only be on once at a time");
       }
         */
        /*
    ct=0;
    f=0;
    while((f==0)&&(ct<maxu))
       {
       if (!strlen(pname(ct))) f=1;
       else
          ct++;
       }
         */
        return 0;
    })
    .then((userId) => {
        /*
    if(ct==maxu)
       {
       throw new Error('Sorry AberMUD is full at the moment');
       }
    strcpy(pname(ct),name);
    setploc(ct,curch);
    setppos(ct,-1);
    setplev(ct,1);
    setpvis(ct,0);
    setpstr(ct,-1);
    setpwpn(ct,-1);
    setpsex(ct,0);
    mynum=ct;
         */
    });

const processEvents = (
    dispatch: Dispatch<TalkerAction>,
    name: string,
    eventId?: number,
    interrupt: boolean = false,
): Promise<void> => {
    const onProcessedEvents = () => Promise.resolve(interrupt);

    /* Print appropriate stuff from data block */
    const processEvent = (event: Event): Promise<void> => {
        /*
        if (debugMode) {
            bprintf(`\n<${event.code}>`);
        }
        */
        if (event.code < -3) {
            // gamrcv(event)
            return Promise.resolve();
        } else {
            // bprintf(event.payload);
            return Promise.resolve();
        }
    };

    return Events.getEvents(eventId)
        .then((response) => Promise.all([
            response.lastEventId,
            response.events.map(processEvent),
        ]))
        .then(([lastEventId]) => dispatch(setEventId(lastEventId)))
        .then(() => {
            // update(name);
        })
        .then(onProcessedEvents)
        .then(() => {
            // rdes=0;tdes=0;vdes=0;
        })
        .then(closeworld);
};

export const onWait = (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => processEvents(dispatch, getState().talker.name, getState().talker.eventId, true)
    .then(() => {
        // on_timing()
    });

export const beforeStart = (name: string): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => {
    makebfr()
        .then(() => dispatch(resetEvents()))
        .then(() => addUser(name))
        .then(() => dispatch(setName(name)))
        .then(() => processEvents(dispatch, getState().talker.name, undefined))
        .then(() => dispatch(resetEvents()))
        .then(() => {
            // special('.g', name);
        })
        .then(() => dispatch(setInSetup()))
        .catch(e => setErrorMessage(e));
};

export const nextTurn = (): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => Promise.resolve(getState().talker.keyBuff)
    .then(setFromKeyboard)
    .then(() => processEvents(dispatch, getState().talker.name, getState().talker.eventId))
    .then(() => onInput(getState))
    .then(() => getState().talker.forceEvents
        ? processEvents(dispatch, getState().talker.name, getState().talker.eventId)
        : undefined
    )
    .then(() => dispatch(forcedEvents()))
    .then(pbfr);
