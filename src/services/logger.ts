import axios from "axios";

export interface Message {
    date: number,
    message: string,
}

export default {
    getLog: (): Promise<Message[]> => axios.get('http://127.0.0.1:4002')
        .then(response => response.data)
        .then(data => data.records),
}
