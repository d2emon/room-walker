import users from '../../../services/users';

export const performAction = (userId: string) => (action: string) => users.perform(userId, action);
