import {
  Document,
  Model,
  Schema,
  model,
} from 'mongoose';
import GameUser from '../interfaces/User';
import Character, { CharacterDocument } from './Character';

export interface UserDocument extends GameUser, Document {};

interface UserMethods {
  withCharacters(): Promise<CharacterDocument[]>;
}

type UserModel = Model<GameUser, {}, UserMethods>;

const userSchema = new Schema<GameUser, UserModel>({
  token: {
    type: String,
    index: true,
    unique: true,
  },
  debugMode: Boolean,
  mode: String,
  name: String,
  characterId: Number,
  lastUpdate: Number,
  channelId: Number,
}, {
  toObject: {
    transform: function (doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  },
});
userSchema.method('withCharacters', async function (): Promise<CharacterDocument[]> {
  const characters = await Character
    .find({ user: this.id })
    .populate('user');
  return characters;
});

export default model<GameUser, UserModel>('User', userSchema);
