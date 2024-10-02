import dataStorage from './dataStorage';

export interface MudData {
  sessionId: string;
  //
  userId: string;
  name: string;
  //
  isActive: boolean;
  isPlaying: boolean;
  isSetAlarm: boolean;
  isWaiting: boolean;
};

const storage = dataStorage<MudData>();

export default storage;
