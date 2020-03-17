import axios from "axios";

export interface User {
    userId: string,
    name: string,
}

export default {
    setUser: (user: User): Promise<void> => axios.post(
        'http://127.0.0.1:4001',
        user,
    ),
}
