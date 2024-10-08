import dataStorage from '../dataStorage';

export interface TalkerData {
  bufferId: string;
  channelId: number; // curch
  eventId: number; // cms
  hasStarted: boolean; // curmode
  isActive: boolean; // i_setup
  lastUpdate: number;
  name: string;
  playerId: string; // mynum: number;
  rdQd: boolean;
  worldId: string;
};
    
const storage = dataStorage<TalkerData>();
  
export default storage;
  