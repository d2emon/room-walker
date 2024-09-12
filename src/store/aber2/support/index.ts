/**
 * Some more basic functions
 *
 * Note
 *
 * state(obj)
 * setstate(obj,val)
 * destroy(obj)
 *
 * are elsewhere
 */

import { bitClear, bitFetch, bitSet, byteFetch, bytePut, getGlobme, getMaxu, getMynum, getNumobs, getObject, getObjinfo, getUblock, iscarrby, ishere, setObjinfo, setUblock } from '../external';

export const itemLocationId = (itemId: number) => getObjinfo(4 * itemId + 0);

const itemFlags = (itemId: number, flagId: number) => bitFetch(getObjinfo(4 * itemId + 2), flagId);
const setItemFlag = (itemId: number, flagId: number) => bitSet(getObjinfo(4 * itemId + 2), flagId);
 const removeItemFlag = (itemId: number, flagId: number) => bitClear(getObjinfo(4 * itemId + 2), flagId);

export const getItemIsDestroyed = (itemId: number) => itemFlags(itemId, 0);
// export const getItemIsLight = (itemId: number) => itemFlags(itemId, 9);
// export const getItemIsLight = (itemId: number) => itemFlags(itemId, 10);
export const getItemIsLight = (itemId: number) => itemFlags(itemId, 13);

export const setItemIsDestroyed = (itemId: number, value: boolean) => value ? setItemFlag(itemId, 0) : removeItemFlag(itemId, 0);
// export const setItemIsLight = (itemId: number, value: boolean) => value ? setItemFlag(itemId, 9) : removeItemFlag(itemId, 9);
// export const setItemIsLight = (itemId: number, value: boolean) => value ? setItemFlag(itemId, 10) : removeItemFlag(itemId, 10);
export const setItemIsLight = (itemId: number, value: boolean) => value ? setItemFlag(itemId, 13) : removeItemFlag(itemId, 13);

export const itemCreate = (itemId: number) => setItemIsDestroyed(itemId, false);

const itemValue = (itemId: number, byteId: number) => byteFetch(getObjinfo(4 * itemId + 2), byteId);
export const itemDamage = (itemId: number) => itemValue(itemId, 0);
export const itemSpecial = (itemId: number) => itemValue(itemId, 1);

export const itemCarryFlag = (itemId: number) => getObjinfo(4 * itemId + 3);
export const itemIsLocatedAt = (itemId: number) => itemCarryFlag(itemId) === 0;
export const itemIsCarriedBy = (itemId: number) => itemCarryFlag(itemId) === 1;
export const itemIsWearingBy = (itemId: number) => itemCarryFlag(itemId) === 2;
export const itemIsContainedIn = (itemId: number) => itemCarryFlag(itemId) === 3;

const setItemLocationId = (itemId: number, locationId: number, carryFlag: number) => {
  setObjinfo(4 * itemId + 0, locationId);
  setObjinfo(4 * itemId + 3, carryFlag);  
};
export const setItemIsLocatedAt = (itemId: number, locationId: number) => setItemLocationId(itemId, locationId, 0);
export const setItemIsCarriedBy = (itemId: number, locationId: number) => setItemLocationId(itemId, locationId, 1);
export const setItemIsContainedIn = (itemId: number, locationId: number) => setItemLocationId(itemId, locationId, 3);

const otstbit = (itemId: number, value: number) => bitFetch(getObjinfo(4 * itemId + 2), value);

const oname = (itemId: number) => getObject(itemId).name;
const olongt = (itemId: number, state: number) => getObject(itemId).desc[state];
const omaxstate = (itemId: number) => getObject(itemId).maxstate;
const oflannel = (itemId: number) => getObject(itemId).flannel;
const obaseval = (itemId: number) => getObject(itemId).value;

const obflannel = oflannel;

const isavl = (itemId: number) => {
  if (ishere(itemId)) {
    return true;
  }

  const mynum = getMynum();
  return iscarrby(itemId, mynum);
};

const ohany = (mask: boolean[]) => {
  const mynum = getMynum();
  const numobs = getNumobs();
  const found = [];
  for (let itemId = 0; itemId < numobs; itemId += 1) {
    if (!iscarrby(itemId, mynum) && !ishere(itemId, mynum)) {
      continue;
    }

    const check = mask.reduce(
      (result: boolean, value: boolean, bitId: number) => result && itemFlags(itemId, bitId) === value,
      true,
    );

    if (check) {
      found.push(itemId);
    }
  }
  return !!found.length;
};

// ----

const pname = (playerId: number) => `${getUblock(16 * playerId)}`;
const ploc = (playerId: number) => getUblock(16 * playerId + 4);
const ppos = (playerId: number) => getUblock(16 * playerId + 5);
const pstr = (playerId: number) => getUblock(16 * playerId + 7);
const pvis = (playerId: number) => getUblock(16 * playerId + 8);
const psexall = (playerId: number) => getUblock(16 * playerId + 9);
const plev = (playerId: number) => getUblock(16 * playerId + 10);
const pwpn = (playerId: number) => getUblock(16 * playerId + 11);
const phelping = (playerId: number) => getUblock(16 * playerId + 13);

const setploc = (playerId: number, value: number) => setUblock(16 * playerId + 4, value);
const setppos = (playerId: number, value: number) => setUblock(16 * playerId + 5, value);
const setpstr = (playerId: number, value: number) => setUblock(16 * playerId + 7, value);
const setpvis = (playerId: number, value: number) => setUblock(16 * playerId + 8, value);
const setpsexall = (playerId: number, value: number) => setUblock(16 * playerId + 9, value);
const setplev = (playerId: number, value: number) => setUblock(16 * playerId + 10, value);
const setpwpn = (playerId: number, value: number) => setUblock(16 * playerId + 11, value);
const setphelping = (playerId: number, value: number) => setUblock(16 * playerId + 13, value);

const ptothlp = (playerId: number) => {
  const helpers: number[] = [];
  const maxu = getMaxu();
  for(let helperId = 0; helperId < maxu; helperId += 1) {
    if (ploc(helperId) !== ploc(playerId)) {
      continue;
    }
    if (phelping(helperId) !== playerId) {
      continue;
    }
    helpers.push(helperId);
  }
  return helpers.length > 0 ? helpers[0] : null;
};

/**
 * Pflags
 *
 * 0 sex
 * 1 May not be exorcised ok
 * 2 May change pflags ok
 * 3 May use rmedit ok
 * 4 May use debugmode ok
 * 5 May use patch 
 * 6 May be snooped upon
 */
const ptstflg = (playerId: number, bitId: number) => {
  const name = getGlobme();
  if ((bitId === 2) && (name === 'Debugger')) {
    return true;
  }
  return psexall(playerId) && !!bitId;
};
const psex = (playerId: number) => ptstflg(playerId, 0) ? 1 : 0;

const setpsex = (playerId: number, value: number) => setpsexall(playerId, !!value ? 1 : 0);
const psetflg = (playerId: number, flagId: number) => setpsexall(playerId, flagId * 1);
const pclrflg = (playerId: number, flagId: number) => setpsexall(playerId, flagId * 0);

const pchan = ploc;
const ptstbit = ptstflg;
