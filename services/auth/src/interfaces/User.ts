export default interface UserInterface<UserId> {
  userId: UserId;
  debugMode: boolean;
  mode: string;
  name: string;
  lastUpdate?: number;
  // eventId?: EventId;
  channelId?: number;
  
  isSaved: boolean;
  
  // person: Person | null;
}

export type GameUser = UserInterface<string>;
