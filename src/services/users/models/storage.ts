import { User, UserId } from '../types';

interface UserStorage {
  [k: UserId]: User;
}
  
const stored: UserStorage = {};
  
export const getUser = async (userId: UserId): Promise<User> => {
  const user = stored[userId] || {};
  return {...user};
}
  
export const setUser = async (userId: UserId, user: User): Promise<User> => {
  stored[userId] = {...user};
  return {...user};
}
