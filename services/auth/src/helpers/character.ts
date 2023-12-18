import Character, { CharacterDocument } from '../models/Character';
import { UserDocument } from '../models/User';

interface CharacterData {
  name: string,
};

export const createCharacter = (user: UserDocument, data: CharacterData): CharacterDocument => {
  const {
    name,
  } = data;
  // const character = await addNewCharacter(name);
  return new Character({
    user,
    name,
  });
};