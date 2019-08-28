import {Action, AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import * as types from './actionTypes';
import { RoomState } from './reducer';
import RoomsService from '../../services/rooms';
import {
    Room,
} from '../../types';

interface SetRooms {
    type: types.ROOMS_FETCHED,
    rooms: any,
}

interface SetRoom {
    type: types.ROOM_FETCHED,
    room: Room,
}

export type RoomAction = SetRooms | SetRoom;
type RoomDispatch<A extends Action> = ThunkDispatch<RoomState, any, A>;
type RoomThunkAction<A extends Action> = ThunkAction<Promise<any>, RoomState, any, A>;

const setRooms = (rooms: any): SetRooms => ({
    type: types.ROOMS_FETCHED,
    rooms,
});

const setRoom = (room: Room): SetRoom => ({
    type: types.ROOM_FETCHED,
    room,
});

export const fetchRooms: RoomThunkAction<SetRooms> = (
    dispatch: RoomDispatch<SetRooms>,
) => RoomsService
    .getRooms()
    .then(response => dispatch(setRooms(response)))
    .catch(console.error);

export const getRoom = (
    roomId: number,
): RoomThunkAction<SetRoom> => (
    dispatch: RoomDispatch<SetRoom>,
) => RoomsService
    .getRoom(roomId)
    .then(room => dispatch(setRoom(room)))
    .catch(console.error);
