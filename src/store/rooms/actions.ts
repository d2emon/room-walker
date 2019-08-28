import * as types from './actionTypes';
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

const setRooms = (rooms: any): SetRooms => ({
    type: types.ROOMS_FETCHED,
    rooms,
});

const setRoom = (room: Room): SetRoom => ({
    type: types.ROOM_FETCHED,
    room,
});

export const fetchRooms = (dispatch: any): Promise<any> => RoomsService
    .getRooms()
    .then(response => dispatch(setRooms(response)))
    .catch(console.error);

export const getRoom = (roomId: number): any => (dispatch: any): Promise<any> => RoomsService
    .getRoom(roomId)
    .then(room => dispatch(setRoom(room)))
    .catch(console.error);
