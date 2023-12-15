import { GameCharacter } from './Character';
import { GameUser } from './User';

export default interface UserResponse {
  characters?: GameCharacter[],
  user: GameUser | null,
  result?: any,
}
  