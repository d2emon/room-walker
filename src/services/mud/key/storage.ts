import dataStorage from '../dataStorage';

export interface KeyData {
  isSet: boolean;
  prompt: string;
  input: string;
  mode: boolean;
};
    
const storage = dataStorage<KeyData>();
  
export default storage;
  