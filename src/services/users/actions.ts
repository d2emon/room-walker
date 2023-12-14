import { getPersonData } from './persons';
import {
  Character,
} from './types';
import { sendAdminMessage, sendGlobalMessage } from './events';
import UserModel, { UserModelInterface } from './models/UserModel';

export const noAction = () => ({});

export const startGame = async (userModel: UserModelInterface) => {
  const user = userModel.getData();

  const channelId = (Math.floor(Math.random() % 100) > 50) ? -5 : -183;
  
  const personResponse = await getPersonData({
    params: {
      name: user?.name,
    },
    data: {},
  });
  const {
    person,
  } = personResponse?.data || {};
  
  if (!person) {
    return null;
  }
  
  sendAdminMessage(user, `[s name="${user?.name}"][ ${user?.name}  has entered the game ]\n[/s]`);
  
  const {
    level,
    sex,
    strength,
  } = person;
  const visibility = (level < 10000) ? 0 : 10000;
  
  const character: Character = {
    characterId: user?.characterId,
    channelId: user?.character?.channelId,
    helping: -1,
    level,
    name: user?.character?.name,
    sex,
    strength,
    visibility,
    weapon: -1,
  };
  
  user.character = character;
  user.channelId = channelId;
  user.eventId = undefined;
  user.mode = '1';

  const model = UserModel(user);
  const processed = await model.processEvents();
  await model.goToChannel(channelId);
  
  sendGlobalMessage(user, channelId, `[s name="${user?.name}"]${user?.name}  has entered the game\n[/s]`);
  
  return {
    user,
    processed,
    character,
    messages: processed?.messages,
  };
};
