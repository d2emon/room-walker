import { sendEvent } from 'services/events';
import { User } from './types';

const GLOBAL_MESSAGE = -10000;
const ADMIN_MESSAGE = -10113;

export const sendGlobalMessage = async (user: User, channelId: number | undefined, message: string) => {
  await sendEvent({
    sender: user?.name,
    receiver: user?.name,
    code: GLOBAL_MESSAGE,
    channelId,
    payload: message,
  });
};
  
export const sendAdminMessage = async (user: User, message: string) => {
  await sendEvent({
    sender: user?.name,
    receiver: user?.name,
    code: ADMIN_MESSAGE,
    channelId: -5,
    payload: message,
  });
};
