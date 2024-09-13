export interface KeyFlags {
  echo: boolean;
  icanon: boolean;
};
  
export interface KeyStateInterface {
  saved: KeyFlags;
  actual: KeyFlags;
  prompt: string;
  keyBuffer: string;
  isInput: boolean;
};
