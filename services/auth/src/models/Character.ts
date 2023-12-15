import mongoose, {
  Schema,
  Document,
} from 'mongoose';
import { GameCharacter } from '../interfaces/Character';

export interface CharacterModelInterface extends Document, GameCharacter {}

const characterSchema: Schema<CharacterModelInterface> = new mongoose.Schema<CharacterModelInterface>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  characterId: Number,
  name: String,
}, {
  toObject: {
    transform: function (doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  },
});

export default mongoose.model<CharacterModelInterface>('Character', characterSchema);
    