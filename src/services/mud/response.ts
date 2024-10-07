import { keySetBack } from './key';
import storage, { MudData } from './storage';
import { ServiceError, ServiceResponse, ServiceResult } from './types';

const dashes = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-';
export const makeError = (error: ServiceError): ServiceError => ({
  code: error.code,
  message: error.code === 0
    ? `\n${dashes}\n\n${error.message}\n\n${dashes}\n`
    : error.message,
});

export const makeResult = (
  data: MudData | null,
  result: ServiceResult,
): ServiceResult => ({
  ...result,
  sessionId: data?.sessionId || '',
  isSetAlarm: !!data?.isSetAlarm,
  isWaiting: !!data?.isWaiting,
  name: data?.name || '',
});

const bprintfModule = {
  setPrDue: (value: boolean) => null,
  pbfr: async (data: MudData, response: ServiceResponse): Promise<ServiceResponse> => ({
    ...response,
    result: {
      ...response.result,
      sessionId: data?.sessionId || '',
      isSetAlarm: !!data?.isSetAlarm,
      isWaiting: !!data?.isWaiting,
      messages: [],
      name: data?.name || '',      
    },
  }),
};
  
const tkModule = {
  setGlobme: (value: string) => null,
  loseme: async () => ({}),
  rte: async (name: string, interrupt: boolean) => ({}),
};

export const crapup = (
  data: MudData,
  error: ServiceError,
  isSystemError: boolean,
) => async (
  response: ServiceResponse,
): Promise<ServiceResponse> => {
  if (response.error) {
    return response;
  }
  
  let newResponse: ServiceResponse = response;
  if (!isSystemError) {
    newResponse = await tkModule.loseme();
    if (error.code === 0) {
      newResponse = await bprintfModule.pbfr(data, newResponse);
     
      /* So we dont get a prompt after the exit */
      bprintfModule.setPrDue(false);  
     }
  }
  
  const sessionId = data?.sessionId;
  const newData = {
    ...data,
    isPlaying: false,
  };  
  if (sessionId) {
    await Promise.all([
      keySetBack(sessionId),
      storage.setData(sessionId, newData),
    ]);    
  }
     
  return {
    error: makeError(error),
    result: makeResult(newData, newResponse.result || {}),
  };
};
