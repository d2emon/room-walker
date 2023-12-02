import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from 'types';

export interface RoomState {
  rooms?: any,
  room?: any,
}

const initialState: RoomState = {};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state: RoomState, action: PayloadAction<any>) => {
      state.rooms = action.payload;
    },
    setRoom: (state: RoomState, action: PayloadAction<Room>) => {
      state.rooms = action.payload;
    },
  },
});

// Selectors
export const getRooms = (state: RoomState) => state.rooms.rooms;
export const getRoom = (state: RoomState) => state.rooms.room;
export const getStarters = () => [5, 183];

export const {
  setRoom,
  setRooms,
} = roomSlice.actions;

export default roomSlice.reducer;
