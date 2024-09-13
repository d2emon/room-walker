import AuthAPI from '../auth';
import LoggerAPI from '../logger';

const start = async (token: string, name: string) => {
  const userId = AuthAPI.getUser(token);
  LoggerAPI.addRecord(`GAME ENTRY: ${name}[${userId}]`);
  return {
    result: true,
  };
};
  
const SystemAPI = {
  start,
};

export default SystemAPI;
  