export interface ServiceResult {
  sessionId?: string;
  isSetAlarm?: boolean;
  isWaiting?: boolean;
  messages?: any;
  name?: string;
  // Key
  prompt?: string;
  input?: string;
};

export interface ServiceError {
  code: number;
  message: string;
};
    
export interface ServiceResponse {
  error?: ServiceError;
  result?: ServiceResult;
};
  