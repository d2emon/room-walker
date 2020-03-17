import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    resetEvents,
    setInSetup,
    setName,
    TalkerAction,
} from './actions';
import  {TalkerState} from './reducer';
import {Store} from '../../reducers';

// Types
type Dispatch<A extends Action> = ThunkDispatch<TalkerAction, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const makebfr = () => {};
const pbfr = () => {};

const processEvents = (name: string): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => {
    const getEvent = (eventId, name): {} => {}

    const talker = getState().talker;
    // openworld() || sendErrorMessage('AberMUD: FILE_ACCESS : Access failed');
    const lastEventId = 0; // findend(unit);
    const firstEventId = (talker.eventId === undefined)
        ? lastEventId
        : talker.eventId;
    const events = [];
    for (let eventId = firstEventId; eventId < lastEventId; eventId++) {
        events.push(getEvent(eventId));
    }
    // events.forEach(event => mstoout(event, name));
    // cms=ct;
    // update(name);
    // eorte();
    // rdes=0;tdes=0;vdes=0;
};

export const beforeStart = (name: string): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => {
    makebfr();
    dispatch(resetEvents());
    // putmeon(name)

    // openworld() || sendErrorMessage('Sorry AberMUD is currently unavailable')
    // mynum < maxu || sendErrorMessage('Sorry AberMUD is full at the moment')
    dispatch(setName(name));
    processEvents(name)(dispatch, getState, null);
    // closeworld()

    dispatch(resetEvents());
    // special('.g', name);
    dispatch(setInSetup());
};

export const nextTurn = (name: string): TalkerThunkAction<TalkerAction> => (
    dispatch: Dispatch<TalkerAction>,
    getState: () => Store,
) => {
    pbfr();
    // sendmsg(name);
    // if (rd_qd) {
    processEvents(name)(dispatch, getState, null);
    //     rd_qd = 0;
    // }
    // closeworld();
    pbfr();
};
