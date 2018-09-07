import * as types from './actionTypes';
import RoomsService from '../../services/rooms';

export const fetchRooms = dispatch => {
    return RoomsService.getRooms()
        .then(response => {
            dispatch({ type: types.ROOMS_FETCHED, response });
	    }).catch(error => {
            console.error(error);
	    });
};

export const getRoom = roomId => dispatch => {
    return RoomsService.getRoom(roomId)
        .then(response => {
            const room = response;
            dispatch({ type: types.ROOM_FETCHED, room });
        }).catch(error => {
            console.error(error);
        });
};
