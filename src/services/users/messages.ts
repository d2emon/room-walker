import { UserId } from './types';

interface MessageStorage {
  [k: UserId]: string[];
}

const data: MessageStorage = {};

export const addMessagesUser = async (userId: UserId) => {
  data[userId] = [];

  return userId;
};
