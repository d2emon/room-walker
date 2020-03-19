interface Character {
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

interface CharacterData {
    records: Character[],
}

const DATA: CharacterData = {
    records: [],
};

const MAX_USER_ID = 16;

const findUserByName = (name: string): Promise<any> => Promise.resolve(null);

export const fillCharacters = (): Promise<void> => {
    for (let characterId = 0; characterId < MAX_USER_ID; characterId += 1) {
        DATA.records.push({
            name: '',
            channelId: 0,
            eventId: undefined,
            level: 1,
            visibility: 0,
            strength: -1,
            weapon: undefined,
            sex: 0,
        })
    }
    return Promise.resolve();
};
export const getCharacters = (): Promise<Character[]> => Promise.resolve([...DATA.records]);
export const addCharacter = (name: string, channelId: number): Promise<Character> => findUserByName(name)
    .then(user => user && Promise.reject(new Error('You are already on the system - you may only be on once at a time')))
    .then(() => DATA.records.find((character) => (character.characterId < MAX_USER_ID) && !character.name))
    .then(character => character || Promise.reject(new Error('Sorry system is full at the moment')))
    .then(character => ({
        ...character,
        name,
        channelId,
        eventId: undefined,
        level: 1,
        visibility: 0,
        strength: -1,
        weapon: undefined,
        sex: 0,
        // setUserId(userId);
    }))
    .then((character: Character) => {
        DATA.records[character.characterId - 1] = character;
        return character;
    });
