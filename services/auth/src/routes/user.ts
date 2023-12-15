import express from 'express';
import { GameUser } from '../interfaces/User';
import UserRequest from '../interfaces/UserRequest';
import UserResponse from '../interfaces/UserResponse';
import User from '../models/User';
import Character from '../models/Character';

const router = express.Router();

router.get<UserRequest, UserResponse>('/:userId', async (req, res, next) => {
  try {
    const {
      userId = '',
    } = req.params;
    
    if (!userId) {
      throw new Error('No userId!');
    }

    const user = await User.findOne({ userId });
    // const model = await loadUser(userId);

    if (!user) {
      return res.json({
        user: null,
      });
    }

    const characters = await Character
      .find({ user: user.id })
      .populate('user');

    return res.json({
      user: user.toObject(),
      characters: characters.map(character => character.toObject()),
    });          
  } catch (error) {
    next(error);
  }
});
    
router.post<UserRequest, UserResponse>('/:userId', async (req, res, next) => {
  try {
    const {
      userId = '',
    } = req.params;
    const {
      name = '',
    } = req.body;
      
    if (!userId) {
      throw new Error('No userId!');
    }

    // const character = await addNewCharacter(name);
    const userData: GameUser = {
      userId,
      debugMode: true,
      mode: '',
      name,
      isSaved: false,
    };

    const user = new User(userData);
    // const model = await newUser(userId, character);
    // const processed = await model.processEvents();
    const userResult = await user.save();

    const character = new Character({
      user,
      name,
    });
    const characterResult = await character.save();

    /*
    await model.loadPersonData();
    const user = await model.save();
    */

    const saved = await User.findOne({ userId });

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
});

router.put<UserRequest, UserResponse>('/:userId', async (req, res, next) => {
  try {
    const {
      userId = '',
    } = req.params;
    const {
      name = '',
    } = req.body;
        
    if (!userId) {
      throw new Error('No userId!');
    }
    
    // const character = await addNewCharacter(name);
    const userResult = await User.updateOne({ userId }, { name });
    // const model = await newUser(userId, character);
    // const processed = await model.processEvents();
  
    /*
    await model.loadPersonData();
    const user = await model.save();
    */
  
    const user = await User.findOne({ userId });

    return res.json({
      user: user?.toObject() || null,
      result: {
        user: userResult,
      },
    });          
  } catch (error) {
    next(error);
  }
});


router.delete<UserRequest, any>('/:userId', async (req, res, next) => {
  try {
    const {
      userId = '',
    } = req.params;
          
    if (!userId) {
      throw new Error('No userId!');
    }
 
    const result = await User.deleteOne({ userId });

    return res.json({
      result,
    });          
  } catch (error) {
    next(error);
  }
});

export default router;
