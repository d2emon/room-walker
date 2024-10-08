import { injectKeysData, keySetUp } from './key';
import { makeResult } from './response';
import storage, { MudData } from './storage';
import { startTalker } from './tk';
import { rte } from './tk/events';
import { removePlayer } from './tk/loseme';
import { ServiceResponse, ServiceResult } from './types';

interface StartArgs {
  title: string;
  name: string;
  //
  userId: string;
};
  
interface UserExitArgs {
  sessionId: string;
};
  
const bloodModule = {
  getInFight: () => 0,
};
    
const bprintfModule = {
  setPrQcr: (value: boolean) => null,
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
  
const mobileModule = {
  onTiming: async () => null,
};
    
const opensysModule = {
  openworld: async () => ({
    firstEventId: 0,
    lastEventId: 0,
    events: [],
  }),
  closeworld: async (world: any) => null,
};
  
const supportModule = {
  syslog: async (message: string) => null,
};
  
const successResponse = (
  data: MudData | null,
  response?: ServiceResponse,
): ServiceResponse => {
  const result: ServiceResult = makeResult(data, response?.result || {});
  return {
    ...response,
    result,
  };
};
  
const errorResponse = (
  code: number,
  message: string,
): ServiceResponse => ({
  error: {
    code,
    message,
  },
});

const sigAlOn = (data: MudData) => ({
  ...data,
  isActive: true,
  isSetAlarm: true,
  isWaiting: true,
});
    
const sigAlOff = (data: MudData) => ({
  ...data,
  isActive: false,
  isSetAlarm: false,
  isWaiting: false,
});
  
const blockAlarm = (data: MudData) => ({
  ...data,
  isWaiting: false,
});
  
const unblockAlarm = (data: MudData) => ({
  ...data,
  isSetAlarm: data.isActive ? true : data.isSetAlarm,
  isWaiting: true,
});
    
const start = async (params: StartArgs): Promise<ServiceResponse> => {
  if (!params.title || !params.name) {
    return errorResponse(0, 'Args!');
  }

  const name = params.name === 'Phantom' ? `The ${params.name}` : params.name;

  // printf("Entering Game ....\n");
  // printf("Hello %s\n",name);

  const sessionId = params.userId;
  const data: MudData = {
    isActive: false,
    isPlaying: true,
    isSetAlarm: false,
    isWaiting: false,
    name,
    sessionId,
    userId: params.userId,
  };
  await Promise.all([
    keySetUp(sessionId),
    storage.setData(sessionId, data),
    supportModule.syslog(`GAME ENTRY: ${name}[${params.userId}]`),
  ]);

  return await startTalker(data);
};

const systemExit = async (params: UserExitArgs) => {
  const data = await storage.getData(params.sessionId);
  if (!data) {
    return errorResponse(-1, 'Unauthorized!');
  };

  return removePlayer(
    data,
    { code: 255, message: '' },
  )({});
};

const userExit = async (params: UserExitArgs) => {
  const data = await storage.getData(params.sessionId);
  if (!data) {
    return errorResponse(-1, 'Unauthorized!');
  };

  // printf("^C\n");

  const inFight = bloodModule.getInFight();
  if (inFight) {
    return successResponse(data);
  }

  return removePlayer(
    data,
    { code: 0, message: 'Byeeeeeeeeee  ...........' },
  )({});
};

const userTimeout = async (params: UserExitArgs) => {
  const data = await storage.getData(params.sessionId);
  if (!data) {
    return errorResponse(-1, 'Unauthorized!');
  };

  if (!data.isActive || !data.isWaiting) {
    return successResponse(data);
  }

  await storage.setData(data.sessionId, sigAlOff(data));

  const world = await opensysModule.openworld();
  await rte(
    world,
    data,
    true,
  );
  await mobileModule.onTiming();
  await opensysModule.closeworld(world);

  const newData = sigAlOn(data);
  await storage.setData(newData.sessionId, newData);

  bprintfModule.setPrQcr(true);
  const messages = await bprintfModule.pbfr(newData, {});

  const response = await injectKeysData(newData.sessionId, messages);
  return successResponse(newData, response);
};

const gamegoAPI = {
  start,
  //
  SIGHUP: systemExit,
  SIGINT: userExit,
  SIGTERM: userExit,
  SIGTSTP: () => null,
  SIGQUIT: () => null,
  SIGCONT: systemExit,
  SIGALRM: userTimeout,
};

export default gamegoAPI;

/*
char *getkbd(s,l)   *//* Getstr() with length limit and filter ctrl *//*
 char *s;
 int l;
    {
    char c,f,n;
    f=0;c=0;
    while(c<l)
       {
       regec:n=getchar();
       if ((n<' ')&&(n!='\n')) goto regec;
       if (n=='\n') {s[c]=0;f=1;c=l-1;}
       else
          s[c]=n;
       c++;
       }
    if (f==0) {s[c]=0;while(getchar()!='\n');}
    return(s);
    }
 */
