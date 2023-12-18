import {
  NextFunction,
  Request,
  Response,
} from 'express';
import Debug from 'debug';
import GameUser from '../interfaces/User';
import UserRequest from '../interfaces/UserRequest';
import UserResponse from '../interfaces/UserResponse';
import User from '../models/User';
import { createCharacter } from '../helpers/character';
  
interface UserQueryParams {
  token?: string;
}

interface PostUserBody {
  name?: string;
}
  
const checkToken = (req: Request<UserRequest, UserResponse, {}, UserQueryParams>): string => {
  const {
    token = '',
  } = req.query;
      
  if (!token) {
    throw new Error('Token is required!');
  }

  return token;
};

export const getUserHandler = async (
  req: Request<UserRequest, UserResponse, {}, UserQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = checkToken(req);
  
    const user = await User.findOne({ token });
  
    if (!user) {
      return res.json({
        user: null,
      });
    }
  
    const characters = await user.withCharacters();
    // TODO: Load personal data

    return res.json({
      user: user.toObject(),
      characters: characters.map(character => character.toObject()),
    });          
  } catch (error) {
    next(error);
  }
};

export const postUserHandler = async (
  req: Request<UserRequest, UserResponse, PostUserBody, UserQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = checkToken(req);
    const {
      name = '',
    } = req.body;

    const exists = await User.findOne({ token });
    if (exists) {
      throw new Error('User allready exists!');
    }

    Debug('auth:auth')(`GAME ENTRY: ${name}[${token}]`);

    const userData: GameUser = {
      token,
      // characterId: character.characterId || 0,
      debugMode: true,
      mode: '',
      name,
      isSaved: false,

      // channelId: 0,
      // eventId: undefined,
    };
    const user = new User(userData);
    const userResult = await user.save();

    // TODO: Create message storage for user

    const character = createCharacter(user, {
      name,
    });
    const characterResult = await character.save();
  
    // TODO: Start event processor

    const saved = await User.findOne({ token });
    // TODO: Load personal data

    return res.json({
      user: saved?.toObject() || null,
      characters: [character.toObject()],
      result: {
        user: userResult,
        character: characterResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const putUserHandler = async (
  req: Request<UserRequest, UserResponse, PostUserBody, UserQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = checkToken(req);

    const {
      name = '',
    } = req.body;

    // const character = await addNewCharacter(name);
    const userResult = await User.updateOne({ token }, { name });
    // const model = await newUser(userId, character);
    // const processed = await model.processEvents();

    /*
    await model.loadPersonData();
    const user = await model.save();
    */

    const user = await User.findOne({ token });

    return res.json({
      user: user?.toObject() || null,
      result: {
        user: userResult,
      },
    });          
  } catch (error) {
    next(error);
  }
};

export const delUserHandler = async (
  req: Request<UserRequest, UserResponse, {}, UserQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = checkToken(req);

    const result = await User.deleteMany({ token });

    return res.json({
      result,
    });          
  } catch (error) {
    next(error);
  }
};
