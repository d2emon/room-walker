import storage from './storage';
import { MudData } from '../storage';
import { ServiceResponse } from '../types';
import { removePlayer } from './loseme';

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
  makebfr: async () => '',
  /*
  setPrDue: (value: boolean) => null,
  setPrQcr: (value: boolean) => null,
  */
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
  
const opensysModule = {
  openworld: async (): Promise<World | null> => ({
    firstEventId: 0,
    lastEventId: 0,
    events: [],
  }),
  closeworld: async (world: World | null) => null,
};
      
const parseModule = {
  gamrcv: async (event: Event) => null,
  eorte: async (interrupt: boolean) => ({}),
  setRdes: (value: boolean) => null,
  setTdes: (value: boolean) => null,
  setVdes: (value: boolean) => null,
};
       
const supportModule = {
  pname: async (world: World | null, playerId: number) => '',
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
          
const findstart = async (world: World | null) => world?.firstEventId || 0;

const findend = async (world: World | null) => world?.lastEventId || 0;

const readmsg = async (world: World, eventId: number) => {
  const firstEventId = await findstart(world);
  const itemId = eventId * 2 + firstEventId;
  return world.events[itemId];
};

/* Print appropriate stuff from data block */
const mstoout = async (data: MudData, event: Event) => {
  const talkerData = await storage.getData(data.userId);
  if (!talkerData) {
    return;
  }
  
  const bufferId = talkerData.bufferId;
  const debugMode = false;
  if (debugMode) {
    await bprintfModule.bprintf(bufferId, `\n<${event.code}>`);
  }
  
  if (event.code < -3) {
    await parseModule.gamrcv(event);
    return;
  }
  
  await bprintfModule.bprintf(bufferId, `${event.payload}`);
};

export const update = async (world: World, userId: string, eventId: number) => {
  const data = await storage.getData(userId);
  if (!data) {
    return;
  }
    
  const getDistance = () => {
    const xp = eventId - data.lastUpdate;
    return xp < 0 ? -xp: xp;
  };
    
  const distance = getDistance();
  if (distance < 10) {
    await storage.setData(userId, {
      ...data,
      eventId,
    });
  } else {
    await storage.setData(userId, {
      ...data,
      eventId,
      lastUpdate: eventId,
    });
    await supportModule.setppos(world, data.playerId, eventId);  
  }
};
  
const defaultOnProcessedHandler = async (response: ServiceResponse) => (response);

export const rte = async (
  world: World | null,
  data: MudData,
  interrupt: boolean,
  onProcessed: (response: ServiceResponse) => Promise<ServiceResponse> = defaultOnProcessedHandler,
): Promise<ServiceResponse> => {
  if (!world) {
   return removePlayer(
      data,
      { code: 0, message: 'AberMUD: FILE_ACCESS : Access failed' },
    )({});
  }
  
  const talkerData = await storage.getData(data.userId);
  if (!talkerData) {
   return {};
  }
  
  const lastEventId = await findend(world);
  const eventId = (talkerData?.eventId === -1)
    ? lastEventId
    : (talkerData?.eventId || 0);
  
  const promises: Promise<number>[] = [];
  for (let id = eventId; id < lastEventId; id += 1) {
    promises.push(new Promise(async (resolve) => {
      const block = await readmsg(world, id);
      await mstoout(data, block);
      resolve(id);
    }));
  }
  const processed = await Promise.all(promises);
  
  await update(
    world,
    data.userId,
    (processed.length > 0)
      ? processed[processed.length - 1]
      : eventId,
  );
  
  const eorteResult = await parseModule.eorte(interrupt);
  
  parseModule.setRdes(false);
  parseModule.setTdes(false);
  parseModule.setVdes(false);
  
  const result = await onProcessed(eorteResult);
  
  await opensysModule.closeworld(world);
  
  return result;
};
  
  