import axios from 'axios';
import { LogMessage } from 'types/LogMessage';

const API_URL = 'http://127.0.0.1:4002';

const hasBack = false;

const api = {
  get: () => (hasBack
    ? axios.get(API_URL)
    : Promise.resolve({
      data: {
        records: [],
      },
    })),
}

export default {
    getLog: async (): Promise<LogMessage[]> => {
      const response = await api.get();
      const { data } = response;
      return data.records;
    }
}
