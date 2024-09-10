import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { RoomState, SetRoomAction, SetRoomsAction, setRoom, setRooms } from './roomsSlice';
import RoomsService from '../../services/rooms';

type RoomDispatch<A extends Action> = ThunkDispatch<RoomState, any, A>;
type RoomThunkAction<A extends Action> = ThunkAction<Promise<any>, RoomState, any, A>;

export const fetchRooms: RoomThunkAction<SetRoomsAction> = (
    dispatch: RoomDispatch<SetRoomsAction>,
) => RoomsService
    .getRooms()
    .then(response => dispatch(setRooms(response)))
    .catch(console.error);

export const getRoom = (
    roomId: number,
): RoomThunkAction<SetRoomAction> => (
    dispatch: RoomDispatch<SetRoomAction>,
) => RoomsService
    .getRoom(roomId)
    .then(room => dispatch(setRoom(room)))
    .catch(console.error);
