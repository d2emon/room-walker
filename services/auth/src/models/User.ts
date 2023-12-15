import mongoose, {
  Schema,
  Document,
} from 'mongoose';
import GameUser from '../interfaces/User';

export interface UserModelInterface extends Document, GameUser {}

const userSchema: Schema<UserModelInterface> = new mongoose.Schema<UserModelInterface>({
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

export default mongoose.model<UserModelInterface>('User', userSchema);
