// export const openlock = async (filename: string, permissions: string) => ({});
// export const strchr = () => null;

export const getGlobme = () => '';
export const setGlobme = (value: string) => null;

// export const getTty = () => 0;
// export const setTty = (value: number) => null;

export const getNeedReprint = () => false;
export const setNeedReprint = (value: boolean) => null;

// export const getInFight = () => 0;
// export const setInFight = (value: number) => null;

export const getUblock = (itemId: number) => 0;
export const setUblock = (itemId: number, value: number) => null;

export const getObjinfo = (itemId: number) => 0;
export const setObjinfo = (itemId: number, value: number) => null;

export const getObject = (itemId: number) => ({
  name: '',
  desc: [
    '',
  ],
  maxstate: 0,
  flannel: true,
  value: 0,
});

export const getMynum = () => 0;
export const getMaxu = () => 0;
export const getNumobs = () => 0;

// ----

export const bitClear = (itemId: number, bitId: number) => null;
export const bitSet = (itemId: number, bitId: number) => null;
export const bitFetch = (itemId: number, bitId: number) => false;
export const bprintf = async (message: string) => null;
// export const bytePut = (itemId: number, bitId: number, value: number) => null;
export const byteFetch = (itemId: number, bitId: number) => 0;
export const closeworld = async () => null;
export const cuserid = () => 0;
export const iscarrby = (itemId: number, playerId: number) => false;
export const ishere = (itemId: number, location?: number) => false;
export const loseme = (e: string) => null;
export const onTiming = async () => null;
export const openworld = async () => null;
export const pbfr = async (needNewLine: boolean = false) => null;
export const rte = async (name: string, interrupt?: boolean) => null;
export const talker = async (name: string) => null;
// export const fgetsAll = async (file: any, maxLength: number, handler: (record: string) => Promise<void>) => null;
// export const fcloselock = async (file: any) => null;
// export const getchar = async () => '';
// export const getcharWait = async (char: string) => null;

// export const printf = (message: string) => null;
export const getcharWait = async (maxLength: number) => '';

/*
gepass() {
  printf("*");
  fflush(stdout);
}
*/