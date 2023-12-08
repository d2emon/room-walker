import { Character } from './types';

interface CharacterStorage {
  [k: number]: Character;
}
  
const maxCharacterId = 16;

const characterIds: number[] = [];
for (let characterId = 0; characterId < maxCharacterId; characterId += 1) {
  characterIds.push(characterId);
}

const stored: CharacterStorage = {};

const getCharacter = async (characterId: number): Promise<Character | null> => {
  const char = stored[characterId];
  if (!char) {
    return null;
  }

  const characterName = char?.name;
  if (!characterName) {
    return null;
  }

  return char;
};

const fpbn = (name: string): Promise<Character | null> => Promise.resolve(null);

export const getNewCharacterId = async (): Promise<number | null> => {
  const characters = await Promise.all(characterIds.map(getCharacter));
  const newCharacterId = characterIds.find((characterId) => (!characters[characterId]));

  if (newCharacterId === undefined) {
    return null;
  }

  if (newCharacterId >= maxCharacterId) {
    return null;
  }

  return newCharacterId;
};

export const addNewCharacter = async (name: string) => {
  const found = await fpbn(name);
  if (found) {
    throw new Error('You are already on the system - you may only be on once at a time');
  }
  
  const characterId = await getNewCharacterId();
  console.log('characterId', characterId);
  if (characterId === null) {
    throw new Error('Sorry AberMUD is full at the moment');
  }

  const char: Character = {
    name,
    channelId: 0, // curch
    eventId: -1,
    level: 1,
    visibility: 0,
    strength: -1,
    weapon: -1,
    sex: 0,
  };
  stored[characterId] = char;
  return char;
};
