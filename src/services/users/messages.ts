import { UserId } from './types';

interface MessageStorage {
  [k: string]: string[];
}

const data: MessageStorage = {};

export const addMessagesUser = async (userId: UserId) => {
  data[userId] = [];

  return userId;
};
