import GameUser from './User';

export default interface CharacterInterface<CharacterId, User> {
  characterId: CharacterId,
  name: string,
  user: User,
}

export type GameCharacter = CharacterInterface<number, GameUser>;
