import * as types from './actionTypes';

const initialState = {
    rooms: undefined,
    room: undefined,
};

export default function reduce(state = initialState, action = {}) {
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

// селекторы
export function getRooms(state) {
  return state.rooms.rooms;
}

export function getRoom(state) {
    return state.rooms.room;
}

export function getStarters(state) {
    return [5, 183];
}
