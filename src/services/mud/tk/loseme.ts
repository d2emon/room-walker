import storage from './storage';
import { crapup } from '../response';
import mudStorage, { MudData } from '../storage';
import { ServiceError, ServiceResponse } from '../types';

interface EventData {
  receiverId?: string;
  senderId?: string;
  code?: number;
  channelId?: number;
  payload?: any;
};

interface Event {
  code: number;
  payload: any;
};

interface World {
  firstEventId: number;
  lastEventId: number;
  events: { [k: number]: Event };
};

const bprintfModule = {
  bprintf: async (bufferId: string, message: string) => null,
  chksnp: async () => null,
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
  
const newuafModule = {
  saveme: async () => ({}),
};
 
const objsysModule = {
  dumpitems: async (world: World | null) => null,
};
      
const opensysModule = {
  openworld: async (): Promise<World | null> => ({
    firstEventId: 0,
    lastEventId: 0,
    events: [],
  }),
  closeworld: async (world: World | null) => null,
};

const parseModule = {
  getZapped: () => false,
  sendsys: async (world: World, data: EventData) => null,
};

const supportModule = {
  pname: async (world: World | null, playerId: string) => '',
  pvis: async (world: World | null, playerId: string) => 0,
  setphelping: async (world: World | null, playerId: string, value: number) => null,
  setplev: async (world: World | null, playerId: string, value: number) => null,
  setploc: async (world: World | null, playerId: string, value: number) => null,
  setpname: async (world: World | null, playerId: string, value: string) => null,
  setppos: async (world: World | null, playerId: string, value: number) => null,
  setpsex: async (world: World | null, playerId: string, value: number) => null,
  setpstr: async (world: World | null, playerId: string, value: number) => null,
  setpvis: async (world: World | null, playerId: string, value: number) => null,
  setpwpn: async (world: World | null, playerId: string, value: number) => null,
};
        
export const removePlayer = (
    data: MudData,
    error?: ServiceError,
  ) => async (
    response: ServiceResponse
  ): Promise<ServiceResponse> => {
    await mudStorage.setData(data.sessionId, {
      ...data,
      isActive: false,
      isSetAlarm: false,
      isWaiting: false, 
    });
    /**
     * No interruptions while you are busy dying
     * ABOUT 2 MINUTES OR SO
     */
  
    const talkerData = await storage.getData(data.userId);
    if (!talkerData) {
     return crapup(
        data,
        { code: 0, message: 'Invalid UserId' },
        false,
      )(response);
    }
  
    await storage.setData(data.userId, {
      ...talkerData,
      isActive: false,
    });
  
    const world = await opensysModule.openworld();
    if (!world) {
      return response;
    }
  
    await objsysModule.dumpitems(world);
    const visibility = await supportModule.pvis(world, talkerData.playerId);
    if (visibility < 10000) {
      await parseModule.sendsys(world, {
        code: -10113,
        payload: `${talkerData.name} has departed from AberMUDII\n`,
      });
    }
    await supportModule.setpname(world, talkerData.playerId, '');
  
    await opensysModule.closeworld(world);
  
    const zapped = parseModule.getZapped();
    if (!zapped) {
      await newuafModule.saveme();
    }
  
    await bprintfModule.chksnp();
  
    return crapup(
      data,
      error || { code: 0, message: '' },
      false,
    )(response);
  };
  