import * as types from './actionTypes';
import { RoomAction } from './actions';

export interface RoomState {
    rooms?: any,
    room?: any,
}

export default (state: RoomState = {}, action: RoomAction): RoomState => {
    switch (action.type) {
        case types.ROOMS_FETCHED:
            return {
                ...state,
                rooms: action.rooms
            };
        case types.ROOM_FETCHED:
            return {
                ...state,
                room: action.room
            };
	    default:
            return state;
    }
};

// Selectors
export const getRooms = (state: RoomState) => state.rooms.rooms;
export const getRoom = (state: RoomState) => state.rooms.room;
export const getStarters = () => [5, 183];
