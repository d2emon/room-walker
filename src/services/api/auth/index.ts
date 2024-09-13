interface User {
  userId: string;
};

type Storage = { [token: string]: User };

const users: Storage = {
  'TOKEN': {
    userId: 'USER_ID',
  },
};

const getUser = async (token: string) => {
  return {
    result: true,
    user: users[token],
  };
};
  
const AuthAPI = {
  getUser,
};

export default AuthAPI;
  