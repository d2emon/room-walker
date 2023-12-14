import { User, UserId } from '../types';

interface UserStorage {
  [k: UserId]: User;
}
  
const stored: UserStorage = {};
  
export const getUser = async (userId: UserId): Promise<User | null> => {
  const user = stored[userId];
  return user ? {...user} : null;
}
  
export const setUser = async (userId: UserId, user: User): Promise<User> => {
  stored[userId] = {...user};
  return {...user};
}
