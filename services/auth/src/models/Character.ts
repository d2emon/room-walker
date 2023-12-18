import {
  Document,
  Model,
  Schema,
  model,
} from 'mongoose';
import { GameCharacter } from '../interfaces/Character';

export interface CharacterDocument extends GameCharacter, Document {};

type CharacterModel = Model<GameCharacter, {}, {}>;

const characterSchema = new Schema<GameCharacter, CharacterModel>({
  /*
  characterId: {
    type: Number,
    index: true,
    unique: true,
  },
  */
  characterId: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
}, {
  toObject: {
    transform: function (doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  },
});

export default model<GameCharacter, CharacterModel>('Character', characterSchema);
    