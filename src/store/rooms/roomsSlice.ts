import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  Room,
} from '../../types';

interface SetRoomsPayload {
  rooms: any,
}
  
interface SetRoomPayload {
  room: Room,
}
  
export type SetRoomsAction = PayloadAction<SetRoomsPayload>;
export type SetRoomAction = PayloadAction<SetRoomPayload>;

export type RoomAction = SetRoomsAction | SetRoomAction;

export interface RoomState {
  rooms?: any,
  room?: any,
}

const initialState: RoomState = {
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state: RoomState, action: SetRoomsAction) => ({
      ...state,
      rooms: action.payload.rooms,
    }),
    setRoom: (state: RoomState, action: SetRoomAction) => ({
      ...state,
      room: action.payload.room,
    }),
  },
});

export const { setRoom, setRooms } = roomSlice.actions;

export default roomSlice.reducer;
