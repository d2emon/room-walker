import { EventId } from "services/events/types";

export type UserId = number | string;

export interface Character {
  characterId?: number,
  name: string,
  channelId: number,
  eventId?: number,
  level: number,
  visibility: number,
  strength: number,
  weapon?: number,
  sex: number,
  helping?: number,
}
  
export interface User {
  userId: UserId;
  debugMode: boolean;
  mode: string;
  name: string;
  characterId: number;
  character: Character;
  lastUpdate?: number;
  eventId?: EventId;

  isSaved: boolean;
}
  