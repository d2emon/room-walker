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
  userId: UserId,
  mode: string,
  characterId: number,
  character: Character,
}
  