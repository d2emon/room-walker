import axios from 'axios';
import config from '../config';

interface User {
    userId: number,
    name: string,
}

interface UserData {
    records: User[],
}

const DATA: UserData = {
    records: [],
};

export const getUsers = (): Promise<User[]> => Promise.resolve([...DATA.records]);
export const addUser = (userId: number, name: string): Promise<boolean> => axios.post(
    config.logUrl,
    {
        message: `MUD ENTRY: ${name}[${userId}]`,
    },
)
    .then(() => ({
        userId,
        name,
    }))
    .then(user => DATA.records.push(user))
    .then(() => true);
