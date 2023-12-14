import { UserModelInterface } from './models/UserModel';

export const noAction = () => ({});

export const startGame = async (userModel: UserModelInterface) => {
  await userModel.startGame();
  const user = await userModel.save();

  return {
    user,
    character: user?.character,
    person: user?.person,
  };
};
