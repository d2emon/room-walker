export default interface GameUser {
  token: string;
  debugMode: boolean;
  mode: string;
  name: string;
  lastUpdate?: number;
  // eventId?: EventId;
  channelId?: number;
  
  isSaved: boolean;
  
  // person: Person | null;
}
