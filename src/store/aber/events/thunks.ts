import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    // forcedEvents,
    // resetEvents,
    setEventId,
    EventsAction, forcedEvents,
} from './actions';
import {Store} from '../../reducers';
import Events, {Event} from '../../../services/events';

// Types
type Dispatch<A extends Action> = ThunkDispatch<EventsAction, any, A>;
export type EventsThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const closeworld = () => Promise.resolve();

export const processEvents = (
    dispatch: Dispatch<EventsAction>,
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

export const sendEvent = (event: Event): EventsThunkAction<EventsAction> => (
    dispatch: Dispatch<EventsAction>,
    getState: () => Store,
) => Events.postEvent(event)
    .catch(() => {
        // logOut();
        // setErrorMessage('AberMUD: FILE_ACCESS : Access failed');
    });

export const broadcastMessage = (payload: string): EventsThunkAction<EventsAction> => (
    dispatch: Dispatch<EventsAction>,
    getState: () => Store,
) => Events.postEvent({
    code: -1,
    payload,
})
    // .then(() => dispatch(forceEvents))
    .catch(() => {
        // logOut();
        // setErrorMessage('AberMUD: FILE_ACCESS : Access failed');
    });
